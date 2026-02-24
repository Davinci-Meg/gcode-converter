"use client";

import { useCallback } from "react";
import { useGCodeStore } from "@/stores/useGCodeStore";

function buildOutputName(fileName: string | null): string {
  const baseName = fileName ? fileName.replace(/\.gcode$/i, "") : "output";
  return `${baseName}_bambu_a1.gcode`;
}

/**
 * Try saving via the File System Access API (showSaveFilePicker).
 * Returns true if successful, false if the API is unavailable.
 * Throws if the user cancels — caller should catch AbortError.
 */
async function saveWithPicker(
  content: string,
  suggestedName: string,
): Promise<boolean> {
  if (typeof window === "undefined" || !window.showSaveFilePicker) {
    return false;
  }

  const handle = await window.showSaveFilePicker({
    suggestedName,
    types: [
      {
        description: "G-code file",
        accept: { "text/plain": [".gcode"] },
      },
    ],
  });

  const writable = await handle.createWritable();
  await writable.write(content);
  await writable.close();
  return true;
}

/** Fallback: trigger a download via a hidden anchor element. */
function saveWithAnchor(content: string, outputName: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = outputName;
  anchor.style.display = "none";

  document.body.appendChild(anchor);
  anchor.click();

  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Hook for downloading converted G-code as a file.
 *
 * Uses the File System Access API (showSaveFilePicker) when available
 * so the user can choose where to save. Falls back to a normal browser
 * download on unsupported browsers.
 */
export function useFileDownload() {
  const convertedContent = useGCodeStore((s) => s.convertedContent);
  const fileName = useGCodeStore((s) => s.fileName);

  const download = useCallback(async () => {
    if (!convertedContent) {
      console.warn("No converted content available for download.");
      return;
    }

    const outputName = buildOutputName(fileName);

    try {
      const saved = await saveWithPicker(convertedContent, outputName);
      if (!saved) {
        // API not available — use anchor fallback
        saveWithAnchor(convertedContent, outputName);
      }
    } catch (err: unknown) {
      // User cancelled the save dialog — ignore
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      // Unexpected error — fall back to anchor download
      console.warn("showSaveFilePicker failed, falling back:", err);
      saveWithAnchor(convertedContent, outputName);
    }
  }, [convertedContent, fileName]);

  return { download };
}
