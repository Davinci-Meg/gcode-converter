import type { PrinterProfile } from "./types";

export const bambuX1EProfile: PrinterProfile = {
  id: "bambu-x1e",
  name: "Bambu Lab X1E",
  buildVolume: { x: 256, y: 256, z: 256 },
  maxNozzleTemp: 320,
  maxBedTemp: 120,
  defaultNozzleDiameter: 0.4,
  kinematics: "corexy",
  originOffset: { x: 128, y: 128 },
};
