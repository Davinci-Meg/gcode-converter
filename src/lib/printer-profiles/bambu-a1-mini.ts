import type { PrinterProfile } from "./types";

export const bambuA1MiniProfile: PrinterProfile = {
  id: "bambu-a1-mini",
  name: "Bambu Lab A1 Mini",
  buildVolume: { x: 180, y: 180, z: 180 },
  maxNozzleTemp: 300,
  maxBedTemp: 80,
  defaultNozzleDiameter: 0.4,
  kinematics: "cartesian",
  originOffset: { x: 90, y: 90 },
};
