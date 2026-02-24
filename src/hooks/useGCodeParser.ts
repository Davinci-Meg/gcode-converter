"use client";

import { useCallback, useEffect, useRef } from "react";
import { useGCodeStore } from "@/stores/useGCodeStore";
import { parseGCode } from "@/lib/gcode/parser";

/**
 * Hook that parses G-code.
 *
 * For reliability, parsing runs directly on the main thread using
 * requestIdleCallback / setTimeout to avoid blocking the UI.
 * This avoids structured clone overhead and Web Worker compatibility
 * issues with large G-code files (30K+ lines).
 */
export function useGCodeParser() {
  const rafRef = useRef<number | null>(null);

  const setIsParsing = useGCodeStore((s) => s.setIsParsing);
  const setParsedData = useGCodeStore((s) => s.setParsedData);
  const setParseError = useGCodeStore((s) => s.setParseError);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const parse = useCallback(
    (content: string) => {
      setIsParsing(true);

      // Defer parsing to next frame to allow UI to update with "Parsing..." state
      rafRef.current = requestAnimationFrame(() => {
        setTimeout(() => {
          try {
            const parsed = parseGCode(content);
            setParsedData(parsed);
          } catch (err) {
            console.error("G-code parsing failed:", err);
            const message =
              err instanceof Error ? err.message : "Unknown parsing error";
            setParseError(message);
          }
        }, 0);
      });
    },
    [setIsParsing, setParsedData, setParseError]
  );

  return { parse };
}
