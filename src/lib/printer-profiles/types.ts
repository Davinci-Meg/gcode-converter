export interface PrinterProfile {
  id: string;
  name: string;
  buildVolume: { x: number; y: number; z: number };
  maxNozzleTemp: number;
  maxBedTemp: number;
  defaultNozzleDiameter: number;
  kinematics: "cartesian" | "corexy";
  originOffset: { x: number; y: number };
}
