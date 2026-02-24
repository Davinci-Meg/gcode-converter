"use client";

import { useGCodeStore } from "@/stores/useGCodeStore";
import { useTranslation } from "@/lib/i18n";
import {
  Circle,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export function StatusBar() {
  const isParsing = useGCodeStore((s) => s.isParsing);
  const isParsingComplete = useGCodeStore((s) => s.isParsingComplete);
  const isConverted = useGCodeStore((s) => s.isConverted);
  const warnings = useGCodeStore((s) => s.warnings);
  const layers = useGCodeStore((s) => s.layers);
  const t = useTranslation();

  const errorCount = warnings.filter((w) => w.severity === "error").length;
  const warningCount = warnings.filter((w) => w.severity === "warning").length;

  // Determine status
  let statusIcon: React.ReactNode;
  let statusText: string;
  let statusColor: string;

  if (isParsing) {
    statusIcon = <Loader2 className="size-3.5 animate-spin text-blue-400" />;
    statusText = t.status.parsing;
    statusColor = "text-blue-400";
  } else if (isConverted) {
    statusIcon = <CheckCircle2 className="size-3.5 text-green-500" />;
    statusText = t.status.converted;
    statusColor = "text-green-500";
  } else if (isParsingComplete) {
    statusIcon = <CheckCircle2 className="size-3.5 text-green-500" />;
    statusText = t.status.parsed.replace("{n}", String(layers.length));
    statusColor = "text-green-500";
  } else {
    statusIcon = <Circle className="size-3.5 text-muted-foreground/50" />;
    statusText = t.status.ready;
    statusColor = "text-muted-foreground";
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Status indicator */}
        <div className="flex items-center gap-2">
          {statusIcon}
          <span className={`font-mono text-xs ${statusColor}`}>
            {statusText}
          </span>
        </div>

        {/* Right: Warning counts */}
        <div className="flex items-center gap-3">
          {errorCount > 0 && (
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="size-3 text-red-500" />
              <span className="font-mono text-xs text-red-500">
                {t.status.nErrors.replace("{n}", String(errorCount))}
              </span>
            </div>
          )}
          {warningCount > 0 && (
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="size-3 text-yellow-500" />
              <span className="font-mono text-xs text-yellow-500">
                {t.status.nWarnings.replace("{n}", String(warningCount))}
              </span>
            </div>
          )}
          {warnings.length === 0 && isConverted && (
            <span className="font-mono text-xs text-muted-foreground/60">
              {t.status.noWarnings}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
