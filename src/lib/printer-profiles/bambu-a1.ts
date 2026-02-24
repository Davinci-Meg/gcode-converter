import type { PrinterProfile } from "./types";

export const bambuA1Profile: PrinterProfile = {
  id: "bambu-a1",
  name: "Bambu Lab A1",
  buildVolume: { x: 256, y: 256, z: 256 },
  maxNozzleTemp: 300,
  maxBedTemp: 100,
  defaultNozzleDiameter: 0.4,
  kinematics: "cartesian",
  originOffset: { x: 128, y: 128 },
};
