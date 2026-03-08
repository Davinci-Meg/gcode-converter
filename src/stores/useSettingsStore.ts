"use client";

import { create } from "zustand";
import type { FilamentType } from "@/lib/filament-presets/types";
import { getFilamentPreset } from "@/lib/filament-presets/presets";
import type { PrinterId } from "@/lib/printer-profiles";

interface SettingsStore {
  printerId: PrinterId;
  filamentType: FilamentType;
  nozzleTemp: number;
  bedTemp: number;
  maxSpeed: number;
  /** Speed multiplier (0.1–1.0). 1.0 = 100%, 0.8 = 80%, etc. */
  speedFactor: number;
  nozzleDiameter: number;
  offsetX: number;
  offsetY: number;
  customStartGCode: string | null;
  customEndGCode: string | null;

  // Actions
  setPrinterId: (id: PrinterId) => void;
  setFilamentType: (type: FilamentType) => void;
  applyPreset: (type: FilamentType) => void;
  updateSetting: <K extends keyof SettingsStore>(
    key: K,
    value: SettingsStore[K]
  ) => void;
  resetToDefaults: () => void;
}

const plaPreset = getFilamentPreset("PLA");

const defaultSettings = {
  printerId: "bambu-a1" as PrinterId,
  filamentType: "PLA" as FilamentType,
  nozzleTemp: plaPreset.nozzleTemp,
  bedTemp: plaPreset.bedTemp,
  maxSpeed: plaPreset.maxSpeed,
  speedFactor: 1.0,
  nozzleDiameter: 0.4,
  offsetX: 0,
  offsetY: 0,
  customStartGCode: null,
  customEndGCode: null,
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  ...defaultSettings,

  setPrinterId: (id) =>
    set({
      printerId: id,
      customStartGCode: null,
      customEndGCode: null,
      offsetX: 0,
      offsetY: 0,
    }),

  setFilamentType: (type) =>
    set({ filamentType: type }),

  applyPreset: (type) => {
    const preset = getFilamentPreset(type);
    set({
      filamentType: preset.type,
      nozzleTemp: preset.nozzleTemp,
      bedTemp: preset.bedTemp,
      maxSpeed: preset.maxSpeed,
    });
  },

  updateSetting: (key, value) =>
    set((state) => ({ ...state, [key]: value })),

  resetToDefaults: () =>
    set(defaultSettings),
}));
