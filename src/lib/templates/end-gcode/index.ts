import type { PrinterProfile } from "../../printer-profiles/types";

/**
 * Generates the end G-code for any Bambu Lab printer.
 *
 * This sequence:
 * 1. Retracts filament slightly to reduce oozing
 * 2. Moves the print head up and to the front for easy part removal
 * 3. Turns off heaters and fans
 * 4. Disables stepper motors
 */
export function generateEndGCode(profile: PrinterProfile): string {
  const bedMaxY = profile.buildVolume.y;

  return `; === ${profile.name} End G-Code ===
G91 ; Relative positioning
G1 E-2 F2700 ; Retract filament slightly
G1 Z5 F3000 ; Raise Z by 5mm
G90 ; Absolute positioning
G1 X0 Y${bedMaxY} F5000 ; Present print (move bed forward)
M104 S0 ; Turn off nozzle heater
M140 S0 ; Turn off bed heater
M106 S0 ; Turn off part cooling fan
M107 ; Turn off fan (explicit)
M84 ; Disable stepper motors

; === End End G-Code ===
`;
}
