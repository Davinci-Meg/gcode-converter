import type { ConversionOptions } from "./types";
import { generateStartGCode } from "../templates/start-gcode/bambu-a1";
import { generateEndGCode } from "../templates/end-gcode/bambu-a1";

/**
 * Regex that matches G0 or G1 commands (case-insensitive).
 */
const MOVE_COMMAND_RE = /^(G[01])\b/i;

const X_PARAM_RE = /X(-?\d+\.?\d*)/i;
const Y_PARAM_RE = /Y(-?\d+\.?\d*)/i;
const F_PARAM_RE = /F(-?\d+\.?\d*)/i;

const G90_RE = /^G90\b/i;
const G91_RE = /^G91\b/i;

/**
 * Replace a parameter value in a G-code line.
 */
function replaceParam(line: string, param: string, value: number): string {
  const regex = new RegExp(`${param}(-?\\d+\\.?\\d*)`, "i");
  const formatted = `${param}${value.toFixed(3)}`;
  if (regex.test(line)) {
    return line.replace(regex, formatted);
  }
  return line;
}

/**
 * Regex to detect initial temperature/setup commands that are already
 * handled by the start G-code template.
 */
const INIT_COMMAND_RE = /^(M140|M190|M104|M109|M106)\b/i;

/**
 * Process a single line of G-code, applying offsets and speed clamping.
 * Offsets are only applied in absolute mode (G90).
 * In relative mode (G91), coordinates are deltas and must not be offset.
 */
function processLine(
  line: string,
  options: ConversionOptions,
  stripInitCommands: boolean,
  absoluteMode: boolean
): string {
  const trimmed = line.trim();
  if (trimmed.length === 0 || trimmed.startsWith(";")) {
    return line;
  }

  if (stripInitCommands && INIT_COMMAND_RE.test(trimmed)) {
    return `; [stripped] ${line}`;
  }

  if (!MOVE_COMMAND_RE.test(trimmed)) {
    return line;
  }

  const commentIndex = line.indexOf(";");
  let codePart = commentIndex >= 0 ? line.substring(0, commentIndex) : line;
  const commentPart = commentIndex >= 0 ? line.substring(commentIndex) : "";

  // Only apply X/Y offsets in absolute positioning mode.
  // In relative mode (G91), values are deltas — offsetting them is incorrect.
  if (absoluteMode) {
    const xMatch = X_PARAM_RE.exec(codePart);
    if (xMatch) {
      const newX = parseFloat(xMatch[1]) + options.offsetX;
      codePart = replaceParam(codePart, "X", newX);
    }

    const yMatch = Y_PARAM_RE.exec(codePart);
    if (yMatch) {
      const newY = parseFloat(yMatch[1]) + options.offsetY;
      codePart = replaceParam(codePart, "Y", newY);
    }
  }

  // Clamp feed rate (applies regardless of positioning mode)
  const fMatch = F_PARAM_RE.exec(codePart);
  if (fMatch) {
    const originalF = parseFloat(fMatch[1]);
    const maxFeedRate = options.maxSpeed * 60;
    if (originalF > maxFeedRate) {
      codePart = replaceParam(codePart, "F", maxFeedRate);
    }
  }

  return commentPart ? `${codePart}${commentPart}` : codePart;
}

/**
 * Convert raw G-code for the Bambu Lab A1 printer.
 *
 * Tracks G90/G91 mode so that offsets are only applied to absolute coordinates.
 * Relative (G91) moves are passed through unchanged since their values are deltas.
 */
export function convertGCode(
  rawGCode: string,
  options: ConversionOptions
): string {
  const startGCode =
    options.customStartGCode ??
    generateStartGCode(options.nozzleTemp, options.bedTemp);

  const endGCode = options.customEndGCode ?? generateEndGCode();

  const lines = rawGCode.split(/\r?\n/);

  let foundFirstMove = false;
  let absoluteMode = true;

  const processedLines = lines.map((line) => {
    const trimmed = line.trim();

    // Track positioning mode
    if (G90_RE.test(trimmed)) {
      absoluteMode = true;
    } else if (G91_RE.test(trimmed)) {
      absoluteMode = false;
    }

    if (!foundFirstMove && MOVE_COMMAND_RE.test(trimmed)) {
      foundFirstMove = true;
    }

    return processLine(line, options, !foundFirstMove, absoluteMode);
  });

  const sections: string[] = [
    startGCode.trimEnd(),
    "",
    "; === Converted G-Code ===",
    ...processedLines,
    "",
    endGCode.trimEnd(),
    "",
  ];

  return sections.join("\n");
}
