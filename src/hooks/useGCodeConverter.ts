"use client";

import { useCallback, useState } from "react";
import { useGCodeStore } from "@/stores/useGCodeStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { convertGCode } from "@/lib/gcode/converter";
import { validateGCode } from "@/lib/gcode/validator";
import { getPrinterProfile } from "@/lib/printer-profiles";
import type { ConversionOptions } from "@/lib/gcode/types";

/**
 * Hook that runs G-code conversion and validation.
 *
 * - Reads `rawContent` from `useGCodeStore`
 * - Reads conversion settings from `useSettingsStore`
 * - Calls `convertGCode` then `validateGCode`
 * - Updates the G-code store with converted content and warnings
 */
export function useGCodeConverter() {
  const [isConverting, setIsConverting] = useState(false);

  const rawContent = useGCodeStore((s) => s.rawContent);
  const setConvertedContent = useGCodeStore((s) => s.setConvertedContent);
  const setWarnings = useGCodeStore((s) => s.setWarnings);

  const convert = useCallback(() => {
    if (!rawContent) {
      console.warn("No G-code content to convert.");
      return;
    }

    setIsConverting(true);

    try {
      // Read the current settings snapshot directly from the store
      const settings = useSettingsStore.getState();

      const options: ConversionOptions = {
        printerId: settings.printerId,
        nozzleTemp: settings.nozzleTemp,
        bedTemp: settings.bedTemp,
        maxSpeed: settings.maxSpeed,
        offsetX: settings.offsetX,
        offsetY: settings.offsetY,
        nozzleDiameter: settings.nozzleDiameter,
        customStartGCode: settings.customStartGCode,
        customEndGCode: settings.customEndGCode,
      };

      const profile = getPrinterProfile(settings.printerId);
      const converted = convertGCode(rawContent, options);
      const warnings = validateGCode(converted, profile);

      setConvertedContent(converted);
      setWarnings(warnings);
    } catch (error) {
      console.error("G-code conversion failed:", error);
    } finally {
      setIsConverting(false);
    }
  }, [rawContent, setConvertedContent, setWarnings]);

  return { convert, isConverting };
}
