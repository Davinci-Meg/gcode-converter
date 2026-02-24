"use client";

import { useCallback } from "react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function AdvancedTab() {
  const t = useTranslation();
  const customStartGCode = useSettingsStore((s) => s.customStartGCode);
  const customEndGCode = useSettingsStore((s) => s.customEndGCode);
  const updateSetting = useSettingsStore((s) => s.updateSetting);

  const handleStartGCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      updateSetting("customStartGCode", value === "" ? null : value);
    },
    [updateSetting]
  );

  const handleEndGCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      updateSetting("customEndGCode", value === "" ? null : value);
    },
    [updateSetting]
  );

  const resetStartGCode = useCallback(() => {
    updateSetting("customStartGCode", null);
  }, [updateSetting]);

  const resetEndGCode = useCallback(() => {
    updateSetting("customEndGCode", null);
  }, [updateSetting]);

  return (
    <div className="space-y-4">
      {/* Custom Start G-code */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="start-gcode">{t.advanced.customStartGCode}</Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={resetStartGCode}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            <span>{t.advanced.reset}</span>
          </Button>
        </div>
        <textarea
          id="start-gcode"
          value={customStartGCode ?? ""}
          onChange={handleStartGCodeChange}
          placeholder={t.advanced.startPlaceholder}
          rows={6}
          className="border-input bg-muted dark:bg-input/30 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border px-3 py-2 font-mono text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
          spellCheck={false}
        />
      </div>

      {/* Custom End G-code */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="end-gcode">{t.advanced.customEndGCode}</Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={resetEndGCode}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            <span>{t.advanced.reset}</span>
          </Button>
        </div>
        <textarea
          id="end-gcode"
          value={customEndGCode ?? ""}
          onChange={handleEndGCodeChange}
          placeholder={t.advanced.endPlaceholder}
          rows={6}
          className="border-input bg-muted dark:bg-input/30 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border px-3 py-2 font-mono text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
          spellCheck={false}
        />
      </div>

      {/* Note */}
      <div className="bg-muted/50 rounded-lg border p-3">
        <p className="text-muted-foreground text-xs">
          {t.advanced.hint}
        </p>
      </div>
    </div>
  );
}
