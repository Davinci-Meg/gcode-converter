export type FilamentType = "PLA" | "PETG" | "TPU" | "ABS" | "ASA";

export interface FilamentPreset {
  type: FilamentType;
  name: string;
  nozzleTemp: number;
  bedTemp: number;
  maxSpeed: number;
  /** Fan speed as a percentage, 0-100 */
  fanSpeed: number;
}
