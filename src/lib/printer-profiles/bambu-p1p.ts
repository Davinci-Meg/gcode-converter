import type { PrinterProfile } from "./types";

export const bambuP1PProfile: PrinterProfile = {
  id: "bambu-p1p",
  name: "Bambu Lab P1P",
  buildVolume: { x: 256, y: 256, z: 256 },
  maxNozzleTemp: 300,
  maxBedTemp: 100,
  defaultNozzleDiameter: 0.4,
  kinematics: "corexy",
  originOffset: { x: 128, y: 128 },
};
