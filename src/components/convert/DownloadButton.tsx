"use client";

import { Download } from "lucide-react";
import { useGCodeStore } from "@/stores/useGCodeStore";
import { useFileDownload } from "@/hooks/useFileDownload";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

export function DownloadButton() {
  const t = useTranslation();
  const isConverted = useGCodeStore((s) => s.isConverted);
  const fileName = useGCodeStore((s) => s.fileName);
  const { download } = useFileDownload();

  const outputName = fileName
    ? `${fileName.replace(/\.gcode$/i, "")}_bambu_a1.gcode`
    : "output_bambu_a1.gcode";

  return (
    <Button
      size="lg"
      variant="outline"
      className="w-full cursor-pointer border-green-500/30 transition-all duration-200 hover:border-green-500/60 hover:bg-green-500/10 disabled:cursor-not-allowed disabled:opacity-40"
      onClick={download}
      disabled={!isConverted}
    >
      <Download className="size-4" />
      <span className="truncate">
        {isConverted ? (
          <>
            {t.convert.download}{" "}
            <span className="font-mono text-xs text-muted-foreground">
              {outputName}
            </span>
          </>
        ) : (
          t.convert.download
        )}
      </span>
    </Button>
  );
}
