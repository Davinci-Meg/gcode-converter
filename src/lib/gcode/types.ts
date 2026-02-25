export type GCodeCommandType =
  | "G0"
  | "G1"
  | "G28"
  | "G90"
  | "G91"
  | "G92"
  | "M82"
  | "M83"
  | "M104"
  | "M109"
  | "M140"
  | "M190"
  | "M106"
  | "M107"
  | "M84"
  | "UNKNOWN";

export interface GCodeCommand {
  type: GCodeCommandType;
  line: number;
  raw: string;
  params: Record<string, number>;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface PathSegment {
  start: Point3D;
  end: Point3D;
  extruding: boolean;
  feedRate: number;
  layerIndex: number;
}

export interface Layer {
  index: number;
  z: number;
  segments: PathSegment[];
}

export interface PrintStats {
  /** Estimated print time in seconds */
  estimatedTime: number;
  /** Total filament length in mm */
  filamentLength: number;
  /** Filament weight in grams (assuming PLA density 1.24 g/cm^3) */
  filamentWeight: number;
  layerCount: number;
  boundingBox: { min: Point3D; max: Point3D };
}

export interface ParsedGCode {
  commands: GCodeCommand[];
  layers: Layer[];
  stats: PrintStats;
}

export interface ValidationWarning {
  type:
    | "out_of_bounds"
    | "high_temp"
    | "high_bed_temp"
    | "excessive_extrusion"
    | "extreme_speed";
  severity: "error" | "warning" | "info";
  message: string;
  line?: number;
}

export interface ConversionOptions {
  printerId: string;
  nozzleTemp: number;
  bedTemp: number;
  maxSpeed: number;
  offsetX: number;
  offsetY: number;
  nozzleDiameter: number;
  customStartGCode: string | null;
  customEndGCode: string | null;
}
