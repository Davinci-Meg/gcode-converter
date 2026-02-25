import type { PrinterProfile } from "./types";

export const bambuX1CProfile: PrinterProfile = {
  id: "bambu-x1c",
  name: "Bambu Lab X1 Carbon",
  buildVolume: { x: 256, y: 256, z: 256 },
  maxNozzleTemp: 300,
  maxBedTemp: 110,
  defaultNozzleDiameter: 0.4,
  kinematics: "corexy",
  originOffset: { x: 128, y: 128 },
};
