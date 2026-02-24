"use client";

import { useCallback, useMemo } from "react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { filamentPresets } from "@/lib/filament-presets/presets";
import type { FilamentType } from "@/lib/filament-presets/types";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/lib/i18n";

const FILAMENT_TYPES: FilamentType[] = ["PLA", "PETG", "TPU", "ABS", "ASA"];

const NOZZLE_TEMP_RANGES: Record<FilamentType, { min: number; max: number }> = {
  PLA: { min: 190, max: 220 },
  PETG: { min: 230, max: 250 },
  TPU: { min: 210, max: 230 },
  ABS: { min: 240, max: 260 },
  ASA: { min: 240, max: 260 },
};

const BED_TEMP_RANGES: Record<FilamentType, { min: number; max: number }> = {
  PLA: { min: 50, max: 65 },
  PETG: { min: 70, max: 80 },
  TPU: { min: 40, max: 60 },
  ABS: { min: 90, max: 100 },
  ASA: { min: 90, max: 100 },
};

export function FilamentTab() {
  const t = useTranslation();
  const filamentType = useSettingsStore((s) => s.filamentType);
  const nozzleTemp = useSettingsStore((s) => s.nozzleTemp);
  const bedTemp = useSettingsStore((s) => s.bedTemp);
  const applyPreset = useSettingsStore((s) => s.applyPreset);
  const updateSetting = useSettingsStore((s) => s.updateSetting);

  const nozzleRange = useMemo(() => NOZZLE_TEMP_RANGES[filamentType], [filamentType]);
  const bedRange = useMemo(() => BED_TEMP_RANGES[filamentType], [filamentType]);

  const handleFilamentChange = useCallback(
    (value: string) => {
      applyPreset(value as FilamentType);
    },
    [applyPreset]
  );

  const handleNozzleTempSlider = useCallback(
    (value: number[]) => {
      updateSetting("nozzleTemp", value[0]);
    },
    [updateSetting]
  );

  const handleNozzleTempInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val)) {
        updateSetting("nozzleTemp", Math.min(300, Math.max(170, val)));
      }
    },
    [updateSetting]
  );

  const handleBedTempSlider = useCallback(
    (value: number[]) => {
      updateSetting("bedTemp", value[0]);
    },
    [updateSetting]
  );

  const handleBedTempInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val)) {
        updateSetting("bedTemp", Math.min(100, Math.max(0, val)));
      }
    },
    [updateSetting]
  );

  return (
    <div className="space-y-4">
      {/* Filament Type Selector */}
      <div className="space-y-2">
        <Label htmlFor="filament-type">{t.filament.type}</Label>
        <Select value={filamentType} onValueChange={handleFilamentChange}>
          <SelectTrigger id="filament-type" className="w-full">
            <SelectValue placeholder={t.filament.selectPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {FILAMENT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {filamentPresets[type].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-muted-foreground text-xs">
          {t.filament.presetHint}
        </p>
      </div>

      {/* Nozzle Temperature */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="nozzle-temp">{t.filament.nozzleTemp}</Label>
          <div className="flex items-center gap-2">
            <Input
              id="nozzle-temp"
              type="number"
              min={170}
              max={300}
              step={5}
              value={nozzleTemp}
              onChange={handleNozzleTempInput}
              className="h-8 w-20 text-right"
            />
            <span className="text-muted-foreground text-sm">°C</span>
          </div>
        </div>
        <Slider
          value={[nozzleTemp]}
          onValueChange={handleNozzleTempSlider}
          min={170}
          max={300}
          step={5}
          className="[&_[data-slot=slider-range]]:bg-green-500 [&_[data-slot=slider-thumb]]:border-green-500"
        />
        <p className="text-muted-foreground text-xs">
          {t.filament.recommended
            .replace("{min}", String(nozzleRange.min))
            .replace("{max}", String(nozzleRange.max))
            .replace("{type}", filamentType)}
        </p>
      </div>

      {/* Bed Temperature */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="bed-temp">{t.filament.bedTemp}</Label>
          <div className="flex items-center gap-2">
            <Input
              id="bed-temp"
              type="number"
              min={0}
              max={100}
              step={5}
              value={bedTemp}
              onChange={handleBedTempInput}
              className="h-8 w-20 text-right"
            />
            <span className="text-muted-foreground text-sm">°C</span>
          </div>
        </div>
        <Slider
          value={[bedTemp]}
          onValueChange={handleBedTempSlider}
          min={0}
          max={100}
          step={5}
          className="[&_[data-slot=slider-range]]:bg-green-500 [&_[data-slot=slider-thumb]]:border-green-500"
        />
        <p className="text-muted-foreground text-xs">
          {t.filament.recommended
            .replace("{min}", String(bedRange.min))
            .replace("{max}", String(bedRange.max))
            .replace("{type}", filamentType)}
        </p>
      </div>
    </div>
  );
}
