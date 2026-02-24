import type { ValidationWarning } from "./types";
import type { PrinterProfile } from "../printer-profiles/types";

/**
 * Known G-code command prefixes that may contain coordinate or temperature parameters.
 */
const MOVE_RE = /^G[01]\b/i;
const NOZZLE_TEMP_RE = /^M10[49]\b/i;
const BED_TEMP_RE = /^M1[49]0\b/i;

const X_PARAM_RE = /X(-?\d+\.?\d*)/i;
const Y_PARAM_RE = /Y(-?\d+\.?\d*)/i;
const Z_PARAM_RE = /Z(-?\d+\.?\d*)/i;
const E_PARAM_RE = /E(-?\d+\.?\d*)/i;
const F_PARAM_RE = /F(-?\d+\.?\d*)/i;
const S_PARAM_RE = /S(-?\d+\.?\d*)/i;

/** Tracks aggregated out-of-bounds statistics for a single axis. */
interface AxisBoundsTracker {
  belowMin: number; // count of values below 0
  aboveMax: number; // count of values above buildVolume
  minVal: number;   // lowest value seen
  maxVal: number;   // highest value seen
  firstLine: number | undefined;
}

function createAxisTracker(): AxisBoundsTracker {
  return {
    belowMin: 0,
    aboveMax: 0,
    minVal: Infinity,
    maxVal: -Infinity,
    firstLine: undefined,
  };
}

/**
 * Validate converted G-code against a printer profile.
 *
 * Warnings are aggregated by type to avoid overwhelming the user
 * with thousands of per-line warnings on large files.
 *
 * Checks performed:
 * - All X, Y, Z coordinates are within the build volume (0 to max for each axis)
 * - Nozzle temperature does not exceed the printer's maximum (default 300 degC)
 * - Bed temperature does not exceed the printer's maximum (default 100 degC)
 * - Feed rates are within a reasonable range (10 to 30000 mm/min)
 * - No single extrusion move exceeds 50mm of filament
 *
 * @param gcode   - The G-code string to validate
 * @param profile - The target printer profile with build volume and temperature limits
 * @returns An array of validation warnings, errors, and info messages
 */
export function validateGCode(
  gcode: string,
  profile: PrinterProfile
): ValidationWarning[] {
  const lines = gcode.split(/\r?\n/);

  // Aggregation trackers
  const xTracker = createAxisTracker();
  const yTracker = createAxisTracker();
  const zTracker = createAxisTracker();

  let slowFeedCount = 0;
  let fastFeedCount = 0;
  let slowFeedMin = Infinity;
  let fastFeedMax = -Infinity;

  let excessiveExtrusionCount = 0;
  let maxDeltaE = 0;

  let lastE = 0;
  let eAbsoluteMode = true;
  let absoluteMode = true;

  const tempWarnings: ValidationWarning[] = [];

  for (let i = 0; i < lines.length; i++) {
    const lineNumber = i + 1;
    const line = lines[i];
    if (line === undefined) continue;

    // Strip comments for analysis
    const commentIndex = line.indexOf(";");
    const code = (commentIndex >= 0 ? line.substring(0, commentIndex) : line).trim();
    if (code.length === 0) continue;

    const tokens = code.split(/\s+/);
    const cmd = tokens[0]?.toUpperCase() ?? "";

    // Track positioning mode
    if (cmd === "G90") { absoluteMode = true; continue; }
    if (cmd === "G91") { absoluteMode = false; continue; }

    // Track E extrusion mode (M82=absolute, M83=relative)
    if (cmd === "M82") { eAbsoluteMode = true; continue; }
    if (cmd === "M83") { eAbsoluteMode = false; continue; }

    // Track E position for G92
    if (cmd === "G92") {
      const eMatch = E_PARAM_RE.exec(code);
      if (eMatch) lastE = parseFloat(eMatch[1]);
      continue;
    }

    // Check move commands
    if (MOVE_RE.test(cmd)) {
      // Only check coordinate bounds in absolute mode.
      // In relative mode (G91), values are deltas, not positions.
      if (absoluteMode) {
        // Track X bounds
        const xMatch = X_PARAM_RE.exec(code);
        if (xMatch) {
          const x = parseFloat(xMatch[1]);
          if (x < xTracker.minVal) xTracker.minVal = x;
          if (x > xTracker.maxVal) xTracker.maxVal = x;
          if (x < 0) {
            xTracker.belowMin++;
            xTracker.firstLine ??= lineNumber;
          }
          if (x > profile.buildVolume.x) {
            xTracker.aboveMax++;
            xTracker.firstLine ??= lineNumber;
          }
        }

        // Track Y bounds
        const yMatch = Y_PARAM_RE.exec(code);
        if (yMatch) {
          const y = parseFloat(yMatch[1]);
          if (y < yTracker.minVal) yTracker.minVal = y;
          if (y > yTracker.maxVal) yTracker.maxVal = y;
          if (y < 0) {
            yTracker.belowMin++;
            yTracker.firstLine ??= lineNumber;
          }
          if (y > profile.buildVolume.y) {
            yTracker.aboveMax++;
            yTracker.firstLine ??= lineNumber;
          }
        }

        // Track Z bounds
        const zMatch = Z_PARAM_RE.exec(code);
        if (zMatch) {
          const z = parseFloat(zMatch[1]);
          if (z < zTracker.minVal) zTracker.minVal = z;
          if (z > zTracker.maxVal) zTracker.maxVal = z;
          if (z < 0) {
            zTracker.belowMin++;
            zTracker.firstLine ??= lineNumber;
          }
          if (z > profile.buildVolume.z) {
            zTracker.aboveMax++;
            zTracker.firstLine ??= lineNumber;
          }
        }
      }

      // Track feed rate
      const fMatch = F_PARAM_RE.exec(code);
      if (fMatch) {
        const f = parseFloat(fMatch[1]);
        if (f < 10) {
          slowFeedCount++;
          if (f < slowFeedMin) slowFeedMin = f;
        }
        if (f > 30000) {
          fastFeedCount++;
          if (f > fastFeedMax) fastFeedMax = f;
        }
      }

      // Track extrusion
      const eMatch = E_PARAM_RE.exec(code);
      if (eMatch) {
        const eVal = parseFloat(eMatch[1]);
        let deltaE: number;
        if (eAbsoluteMode) {
          deltaE = eVal - lastE;
          lastE = eVal;
        } else {
          deltaE = eVal;
          lastE += eVal;
        }
        if (deltaE > 50) {
          excessiveExtrusionCount++;
          if (deltaE > maxDeltaE) maxDeltaE = deltaE;
        }
      }
    }

    // Check nozzle temperature commands (M104, M109)
    if (NOZZLE_TEMP_RE.test(cmd)) {
      const sMatch = S_PARAM_RE.exec(code);
      if (sMatch) {
        const temp = parseFloat(sMatch[1]);
        if (temp > profile.maxNozzleTemp) {
          tempWarnings.push({
            type: "high_temp",
            severity: "error",
            message: `Nozzle temperature ${temp}°C exceeds maximum of ${profile.maxNozzleTemp}°C`,
            line: lineNumber,
          });
        }
      }
    }

    // Check bed temperature commands (M140, M190)
    if (BED_TEMP_RE.test(cmd)) {
      const sMatch = S_PARAM_RE.exec(code);
      if (sMatch) {
        const temp = parseFloat(sMatch[1]);
        if (temp > profile.maxBedTemp) {
          tempWarnings.push({
            type: "high_bed_temp",
            severity: "error",
            message: `Bed temperature ${temp}°C exceeds maximum of ${profile.maxBedTemp}°C`,
            line: lineNumber,
          });
        }
      }
    }
  }

  // Build aggregated warnings
  const warnings: ValidationWarning[] = [];

  // Coordinate bounds (aggregated per axis)
  for (const [axis, tracker, limit] of [
    ["X", xTracker, profile.buildVolume.x],
    ["Y", yTracker, profile.buildVolume.y],
    ["Z", zTracker, profile.buildVolume.z],
  ] as const) {
    const totalOOB = tracker.belowMin + tracker.aboveMax;
    if (totalOOB === 0) continue;

    const parts: string[] = [];
    if (tracker.belowMin > 0) {
      parts.push(`min ${tracker.minVal.toFixed(2)}mm < 0`);
    }
    if (tracker.aboveMax > 0) {
      parts.push(`max ${tracker.maxVal.toFixed(2)}mm > ${limit}mm`);
    }

    warnings.push({
      type: "out_of_bounds",
      severity: "warning",
      message: `${axis} coordinate out of build volume (${parts.join(", ")}) — ${totalOOB.toLocaleString()} moves affected`,
      line: tracker.firstLine,
    });
  }

  // Feed rate warnings (aggregated)
  if (slowFeedCount > 0) {
    warnings.push({
      type: "extreme_speed",
      severity: "warning",
      message: `${slowFeedCount.toLocaleString()} moves with extremely slow feed rate (min ${slowFeedMin.toFixed(1)} mm/min < 10 mm/min)`,
    });
  }
  if (fastFeedCount > 0) {
    warnings.push({
      type: "extreme_speed",
      severity: "warning",
      message: `${fastFeedCount.toLocaleString()} moves with extremely fast feed rate (max ${fastFeedMax.toFixed(1)} mm/min > 30,000 mm/min)`,
    });
  }

  // Excessive extrusion (aggregated)
  if (excessiveExtrusionCount > 0) {
    warnings.push({
      type: "excessive_extrusion",
      severity: "warning",
      message: `${excessiveExtrusionCount.toLocaleString()} moves with large extrusion (max ${maxDeltaE.toFixed(2)}mm > 50mm per move)`,
    });
  }

  // Temperature warnings (these are rare, keep per-line)
  warnings.push(...tempWarnings);

  return warnings;
}
