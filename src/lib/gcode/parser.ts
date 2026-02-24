import type {
  GCodeCommand,
  GCodeCommandType,
  Layer,
  ParsedGCode,
  PathSegment,
  Point3D,
  PrintStats,
} from "./types";

const KNOWN_COMMANDS: ReadonlySet<string> = new Set<GCodeCommandType>([
  "G0",
  "G1",
  "G28",
  "G90",
  "G91",
  "G92",
  "M82",
  "M83",
  "M104",
  "M109",
  "M140",
  "M190",
  "M106",
  "M107",
  "M84",
]);

/** PLA density in g/cm^3 */
const PLA_DENSITY = 1.24;

/** Default filament diameter in mm */
const FILAMENT_DIAMETER = 1.75;

/**
 * Parse a single line of G-code into a GCodeCommand.
 * Strips comments (everything after ';') and whitespace.
 */
function parseLine(raw: string, lineNumber: number): GCodeCommand | null {
  // Strip inline comments
  const commentIndex = raw.indexOf(";");
  const code = (commentIndex >= 0 ? raw.substring(0, commentIndex) : raw).trim();

  if (code.length === 0) {
    return null;
  }

  const tokens = code.split(/\s+/);
  const commandToken = tokens[0];
  if (!commandToken) {
    return null;
  }

  const upperCommand = commandToken.toUpperCase();
  const type: GCodeCommandType = KNOWN_COMMANDS.has(upperCommand)
    ? (upperCommand as GCodeCommandType)
    : "UNKNOWN";

  const params: Record<string, number> = {};
  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];
    if (!token || token.length < 2) continue;
    const key = token[0].toUpperCase();
    const value = parseFloat(token.substring(1));
    if (!isNaN(value)) {
      params[key] = value;
    }
  }

  return {
    type,
    line: lineNumber,
    raw,
    params,
  };
}

/**
 * Calculate the Euclidean distance between two 3D points.
 */
function distance3D(a: Point3D, b: Point3D): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dz = b.z - a.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

interface ParserState {
  // Current position
  x: number;
  y: number;
  z: number;
  e: number;

  // Absolute vs relative mode for XYZ axes
  absoluteMode: boolean;
  // Separate absolute/relative mode for E axis (M82/M83)
  eAbsoluteMode: boolean;

  // Current feed rate in mm/min
  feedRate: number;

  // Current layer tracking
  currentLayerIndex: number;
  lastLayerZ: number;

  // Accumulated stats
  totalTime: number;
  totalFilamentLength: number;

  // Bounding box
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  hasMoves: boolean;
}

function createInitialState(): ParserState {
  return {
    x: 0,
    y: 0,
    z: 0,
    e: 0,
    absoluteMode: true,
    eAbsoluteMode: true,
    feedRate: 1000,
    currentLayerIndex: 0,
    lastLayerZ: 0,
    totalTime: 0,
    totalFilamentLength: 0,
    minX: Infinity,
    minY: Infinity,
    minZ: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
    maxZ: -Infinity,
    hasMoves: false,
  };
}

function updateBoundingBox(state: ParserState, x: number, y: number, z: number): void {
  state.hasMoves = true;
  if (x < state.minX) state.minX = x;
  if (y < state.minY) state.minY = y;
  if (z < state.minZ) state.minZ = z;
  if (x > state.maxX) state.maxX = x;
  if (y > state.maxY) state.maxY = y;
  if (z > state.maxZ) state.maxZ = z;
}

/**
 * Process a G0 or G1 move command.
 * Returns a PathSegment if the command causes movement.
 */
function processMove(
  command: GCodeCommand,
  state: ParserState,
  layers: Layer[]
): PathSegment | null {
  // Update feed rate if specified
  if ("F" in command.params) {
    state.feedRate = command.params["F"];
  }

  const start: Point3D = { x: state.x, y: state.y, z: state.z };
  const prevE = state.e;

  let newX: number;
  let newY: number;
  let newZ: number;
  let newE: number;

  // Handle XYZ based on G90/G91 mode
  if (state.absoluteMode) {
    newX = "X" in command.params ? command.params["X"] : state.x;
    newY = "Y" in command.params ? command.params["Y"] : state.y;
    newZ = "Z" in command.params ? command.params["Z"] : state.z;
  } else {
    newX = state.x + ("X" in command.params ? command.params["X"] : 0);
    newY = state.y + ("Y" in command.params ? command.params["Y"] : 0);
    newZ = state.z + ("Z" in command.params ? command.params["Z"] : 0);
  }

  // Handle E based on M82/M83 mode (separate from XYZ mode)
  if (state.eAbsoluteMode) {
    newE = "E" in command.params ? command.params["E"] : state.e;
  } else {
    // M83 relative extrusion: E values are deltas
    newE = state.e + ("E" in command.params ? command.params["E"] : 0);
  }

  // Detect layer change by Z-height increase
  if (newZ > state.lastLayerZ + 0.001) {
    state.currentLayerIndex = layers.length;
    state.lastLayerZ = newZ;
    layers.push({
      index: state.currentLayerIndex,
      z: newZ,
      segments: [],
    });
  }

  // Ensure at least one layer exists
  if (layers.length === 0) {
    layers.push({
      index: 0,
      z: newZ,
      segments: [],
    });
  }

  state.x = newX;
  state.y = newY;
  state.z = newZ;
  state.e = newE;

  updateBoundingBox(state, newX, newY, newZ);

  const end: Point3D = { x: newX, y: newY, z: newZ };
  const dist = distance3D(start, end);

  // Calculate time contribution
  if (dist > 0 && state.feedRate > 0) {
    // feedRate is mm/min, time in seconds
    state.totalTime += (dist / state.feedRate) * 60;
  }

  // Track filament usage
  const deltaE = newE - prevE;
  if (deltaE > 0) {
    state.totalFilamentLength += deltaE;
  }

  // Only create a segment if there's actual XYZ movement
  if (dist < 0.0001) {
    return null;
  }

  const extruding = deltaE > 0;
  const segment: PathSegment = {
    start,
    end,
    extruding,
    feedRate: state.feedRate,
    layerIndex: state.currentLayerIndex,
  };

  // Add segment to the current layer
  const currentLayer = layers[layers.length - 1];
  if (currentLayer) {
    currentLayer.segments.push(segment);
  }

  return segment;
}

/**
 * Process a G28 (Home) command.
 * Resets the specified axes (or all if none specified) to 0.
 */
function processHome(command: GCodeCommand, state: ParserState): void {
  const hasAxisParam =
    "X" in command.params || "Y" in command.params || "Z" in command.params;

  if (!hasAxisParam) {
    // Home all axes
    state.x = 0;
    state.y = 0;
    state.z = 0;
  } else {
    if ("X" in command.params) state.x = 0;
    if ("Y" in command.params) state.y = 0;
    if ("Z" in command.params) state.z = 0;
  }
}

/**
 * Process a G92 (Set Position) command.
 * Overrides the current logical position without physical movement.
 */
function processSetPosition(command: GCodeCommand, state: ParserState): void {
  if ("X" in command.params) state.x = command.params["X"];
  if ("Y" in command.params) state.y = command.params["Y"];
  if ("Z" in command.params) state.z = command.params["Z"];
  if ("E" in command.params) state.e = command.params["E"];
}

/**
 * Calculate filament weight from length.
 * Uses PLA density (1.24 g/cm^3) and standard 1.75mm filament.
 */
function calculateFilamentWeight(lengthMm: number): number {
  const radiusMm = FILAMENT_DIAMETER / 2;
  const radiusCm = radiusMm / 10;
  const lengthCm = lengthMm / 10;
  const volumeCm3 = Math.PI * radiusCm * radiusCm * lengthCm;
  return volumeCm3 * PLA_DENSITY;
}

/**
 * Parse a complete G-code string into a structured ParsedGCode object.
 *
 * Handles:
 * - G0/G1: Linear moves (travel and extrusion)
 * - G28: Homing
 * - G90: Absolute positioning mode
 * - G91: Relative positioning mode
 * - G92: Set position
 * - M104/M109: Nozzle temperature commands
 * - M140/M190: Bed temperature commands
 * - M106/M107: Fan control
 * - M84: Disable steppers
 * - Comments (lines starting with ; or inline after ;)
 */
export function parseGCode(rawGCode: string): ParsedGCode {
  const lines = rawGCode.split(/\r?\n/);
  const commands: GCodeCommand[] = [];
  const layers: Layer[] = [];
  const state = createInitialState();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === undefined) continue;

    const command = parseLine(line, i + 1);
    if (!command) continue;

    // Only store non-move commands to save memory on large files.
    // Move commands (G0/G1) are processed into layers/segments instead.
    if (command.type !== "G0" && command.type !== "G1") {
      commands.push(command);
    }

    switch (command.type) {
      case "G0":
      case "G1":
        processMove(command, state, layers);
        break;

      case "G28":
        processHome(command, state);
        break;

      case "G90":
        state.absoluteMode = true;
        break;

      case "G91":
        state.absoluteMode = false;
        break;

      case "G92":
        processSetPosition(command, state);
        break;

      case "M82":
        // Absolute extrusion mode
        state.eAbsoluteMode = true;
        break;

      case "M83":
        // Relative extrusion mode (used by gcoordinator)
        state.eAbsoluteMode = false;
        break;

      // Temperature and fan commands are parsed but don't affect position state.
      // They are kept in the commands array for downstream processing.
      case "M104":
      case "M109":
      case "M140":
      case "M190":
      case "M106":
      case "M107":
      case "M84":
      case "UNKNOWN":
        break;
    }
  }

  const boundingBox = state.hasMoves
    ? {
        min: { x: state.minX, y: state.minY, z: state.minZ },
        max: { x: state.maxX, y: state.maxY, z: state.maxZ },
      }
    : {
        min: { x: 0, y: 0, z: 0 },
        max: { x: 0, y: 0, z: 0 },
      };

  const stats: PrintStats = {
    estimatedTime: state.totalTime,
    filamentLength: state.totalFilamentLength,
    filamentWeight: calculateFilamentWeight(state.totalFilamentLength),
    layerCount: layers.length,
    boundingBox,
  };

  return {
    commands,
    layers,
    stats,
  };
}
