"use client";

import { create } from "zustand";
import type {
  ParsedGCode,
  Layer,
  PrintStats,
  ValidationWarning,
} from "@/lib/gcode/types";

interface GCodeStore {
  fileName: string | null;
  rawContent: string | null;
  parsedData: ParsedGCode | null;
  layers: Layer[];
  stats: PrintStats | null;
  isParsing: boolean;
  isParsingComplete: boolean;
  parseError: string | null;
  convertedContent: string | null;
  warnings: ValidationWarning[];
  isConverted: boolean;

  // Actions
  setFile: (name: string, content: string) => void;
  setParsedData: (data: ParsedGCode) => void;
  setParseError: (error: string) => void;
  setConvertedContent: (content: string) => void;
  setWarnings: (warnings: ValidationWarning[]) => void;
  setIsParsing: (isParsing: boolean) => void;
  reset: () => void;
}

const initialState = {
  fileName: null,
  rawContent: null,
  parsedData: null,
  layers: [],
  stats: null,
  isParsing: false,
  isParsingComplete: false,
  parseError: null,
  convertedContent: null,
  warnings: [],
  isConverted: false,
};

export const useGCodeStore = create<GCodeStore>((set) => ({
  ...initialState,

  setFile: (name, content) =>
    set({
      fileName: name,
      rawContent: content,
      // Reset derived state when a new file is loaded
      parsedData: null,
      layers: [],
      stats: null,
      isParsing: false,
      isParsingComplete: false,
      parseError: null,
      convertedContent: null,
      warnings: [],
      isConverted: false,
    }),

  setParsedData: (data) =>
    set({
      parsedData: data,
      layers: data.layers,
      stats: data.stats,
      isParsing: false,
      isParsingComplete: true,
      parseError: null,
    }),

  setParseError: (error) =>
    set({
      isParsing: false,
      isParsingComplete: false,
      parseError: error,
    }),

  setConvertedContent: (content) =>
    set({
      convertedContent: content,
      isConverted: true,
    }),

  setWarnings: (warnings) =>
    set({ warnings }),

  setIsParsing: (isParsing) =>
    set({ isParsing }),

  reset: () => set(initialState),
}));
