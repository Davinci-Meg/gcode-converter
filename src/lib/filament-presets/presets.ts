import type { FilamentPreset, FilamentType } from "./types";

export const filamentPresets: Record<FilamentType, FilamentPreset> = {
  PLA: {
    type: "PLA",
    name: "PLA",
    nozzleTemp: 200,
    bedTemp: 60,
    maxSpeed: 300,
    fanSpeed: 100,
  },
  PETG: {
    type: "PETG",
    name: "PETG",
    nozzleTemp: 240,
    bedTemp: 75,
    maxSpeed: 200,
    fanSpeed: 70,
  },
  TPU: {
    type: "TPU",
    name: "TPU",
    nozzleTemp: 220,
    bedTemp: 50,
    maxSpeed: 50,
    fanSpeed: 50,
  },
  ABS: {
    type: "ABS",
    name: "ABS",
    nozzleTemp: 250,
    bedTemp: 95,
    maxSpeed: 200,
    fanSpeed: 0,
  },
  ASA: {
    type: "ASA",
    name: "ASA",
    nozzleTemp: 250,
    bedTemp: 95,
    maxSpeed: 200,
    fanSpeed: 0,
  },
};

export function getFilamentPreset(type: FilamentType): FilamentPreset {
  return filamentPresets[type];
}

export function getAllFilamentPresets(): FilamentPreset[] {
  return Object.values(filamentPresets);
}
