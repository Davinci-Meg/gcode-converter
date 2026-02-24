"use client";

import { useState } from "react";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
} from "lucide-react";
import { useGCodeStore } from "@/stores/useGCodeStore";
import { useTranslation } from "@/lib/i18n";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ValidationWarning } from "@/lib/gcode/types";

const COLLAPSED_LIMIT = 3;

function getWarningIcon(severity: ValidationWarning["severity"]) {
  switch (severity) {
    case "error":
      return <AlertCircle className="size-4 text-red-500" />;
    case "warning":
      return <AlertTriangle className="size-4 text-yellow-500" />;
    case "info":
      return <Info className="size-4 text-blue-400" />;
  }
}

function getWarningStyles(severity: ValidationWarning["severity"]) {
  switch (severity) {
    case "error":
      return "border-red-500/30 bg-red-500/5";
    case "warning":
      return "border-yellow-500/30 bg-yellow-500/5";
    case "info":
      return "border-blue-400/30 bg-blue-400/5";
  }
}

export function SafetyWarnings() {
  const warnings = useGCodeStore((s) => s.warnings);
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslation();

  if (warnings.length === 0) {
    return null;
  }

  const errorCount = warnings.filter((w) => w.severity === "error").length;
  const warningCount = warnings.filter((w) => w.severity === "warning").length;
  const infoCount = warnings.filter((w) => w.severity === "info").length;

  const shouldCollapse = warnings.length > COLLAPSED_LIMIT;
  const displayedWarnings = shouldCollapse && !isExpanded
    ? warnings.slice(0, COLLAPSED_LIMIT)
    : warnings;

  return (
    <div className="space-y-3">
      {/* Header with count badges */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="size-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-foreground">
            {t.warnings.title}
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          {errorCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-red-500/15 px-2 py-0.5 font-mono text-xs font-medium text-red-500">
              {t.warnings.nErrors.replace("{n}", String(errorCount))}
            </span>
          )}
          {warningCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-yellow-500/15 px-2 py-0.5 font-mono text-xs font-medium text-yellow-500">
              {t.warnings.nWarnings.replace("{n}", String(warningCount))}
            </span>
          )}
          {infoCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-blue-400/15 px-2 py-0.5 font-mono text-xs font-medium text-blue-400">
              {t.warnings.nInfo.replace("{n}", String(infoCount))}
            </span>
          )}
        </div>
      </div>

      {/* Warning list */}
      <div className="space-y-2">
        {displayedWarnings.map((warning, index) => (
          <Alert
            key={`${warning.type}-${index}`}
            variant={warning.severity === "error" ? "destructive" : "default"}
            className={cn(
              "transition-all duration-200",
              getWarningStyles(warning.severity)
            )}
          >
            {getWarningIcon(warning.severity)}
            <AlertTitle className="flex items-center gap-2">
              <span>{
                warning.severity === "error" ? t.warnings.error :
                warning.severity === "warning" ? t.warnings.warning :
                t.warnings.info
              }</span>
              {warning.line !== undefined && (
                <span className="font-mono text-xs text-muted-foreground">
                  {t.warnings.line.replace("{n}", String(warning.line))}
                </span>
              )}
            </AlertTitle>
            <AlertDescription>{warning.message}</AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Expand / Collapse toggle */}
      {shouldCollapse && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full cursor-pointer text-xs text-muted-foreground hover:text-foreground"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="size-3.5" />
              {t.warnings.showFewer}
            </>
          ) : (
            <>
              <ChevronDown className="size-3.5" />
              {t.warnings.showAll.replace("{n}", String(warnings.length))}
            </>
          )}
        </Button>
      )}
    </div>
  );
}
