"use client";

import { create } from "zustand";
import type { FilamentType } from "@/lib/filament-presets/types";
import { getFilamentPreset } from "@/lib/filament-presets/presets";

interface SettingsStore {
  printerId: string;
  filamentType: FilamentType;
  nozzleTemp: number;
  bedTemp: number;
  maxSpeed: number;
  nozzleDiameter: number;
  offsetX: number;
  offsetY: number;
  customStartGCode: string | null;
  customEndGCode: string | null;

  // Actions
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
  printerId: "bambu-a1",
  filamentType: "PLA" as FilamentType,
  nozzleTemp: plaPreset.nozzleTemp,
  bedTemp: plaPreset.bedTemp,
  maxSpeed: plaPreset.maxSpeed,
  nozzleDiameter: 0.4,
  offsetX: 0,
  offsetY: 0,
  customStartGCode: null,
  customEndGCode: null,
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  ...defaultSettings,

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
