"use client";

import { useCallback } from "react";
import { Crosshair } from "lucide-react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useGCodeStore } from "@/stores/useGCodeStore";
import { getPrinterProfile, printerList } from "@/lib/printer-profiles";
import type { PrinterId } from "@/lib/printer-profiles";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/lib/i18n";

const NOZZLE_DIAMETERS = ["0.2", "0.4", "0.6", "0.8"] as const;

/**
 * Calculate offsets to center the model on the build plate.
 * Returns rounded offsets (3 decimal places).
 */
function calcCenterOffsets(
  bb: { min: { x: number; y: number }; max: { x: number; y: number } },
  buildVolume: { x: number; y: number }
) {
  const modelCenterX = (bb.min.x + bb.max.x) / 2;
  const modelCenterY = (bb.min.y + bb.max.y) / 2;
  const plateCenterX = buildVolume.x / 2;
  const plateCenterY = buildVolume.y / 2;

  return {
    offsetX: Math.round((plateCenterX - modelCenterX) * 1000) / 1000,
    offsetY: Math.round((plateCenterY - modelCenterY) * 1000) / 1000,
  };
}

/** Group printer list by series */
const printerGroups = printerList.reduce(
  (acc, p) => {
    if (!acc[p.series]) acc[p.series] = [];
    acc[p.series].push(p);
    return acc;
  },
  {} as Record<string, typeof printerList>
);

const seriesLabels: Record<string, string> = {
  A: "A Series",
  P: "P Series",
  X: "X Series",
};

export function PrintTab() {
  const t = useTranslation();
  const printerId = useSettingsStore((s) => s.printerId);
  const maxSpeed = useSettingsStore((s) => s.maxSpeed);
  const speedFactor = useSettingsStore((s) => s.speedFactor);
  const nozzleDiameter = useSettingsStore((s) => s.nozzleDiameter);
  const offsetX = useSettingsStore((s) => s.offsetX);
  const offsetY = useSettingsStore((s) => s.offsetY);
  const updateSetting = useSettingsStore((s) => s.updateSetting);
  const setPrinterId = useSettingsStore((s) => s.setPrinterId);

  const stats = useGCodeStore((s) => s.stats);
  const isParsingComplete = useGCodeStore((s) => s.isParsingComplete);

  const profile = getPrinterProfile(printerId);

  const handlePrinterChange = useCallback(
    (value: string) => {
      setPrinterId(value as PrinterId);
    },
    [setPrinterId]
  );

  const handleMaxSpeedSlider = useCallback(
    (value: number[]) => {
      updateSetting("maxSpeed", value[0]);
    },
    [updateSetting]
  );

  const handleMaxSpeedInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val)) {
        updateSetting("maxSpeed", Math.min(500, Math.max(50, val)));
      }
    },
    [updateSetting]
  );

  const handleSpeedFactorSlider = useCallback(
    (value: number[]) => {
      updateSetting("speedFactor", (value[0] ?? 100) / 100);
    },
    [updateSetting]
  );

  const handleSpeedFactorInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val)) {
        updateSetting("speedFactor", Math.min(100, Math.max(1, val)) / 100);
      }
    },
    [updateSetting]
  );

  const handleNozzleDiameter = useCallback(
    (value: string) => {
      updateSetting("nozzleDiameter", parseFloat(value));
    },
    [updateSetting]
  );

  const handleOffsetX = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val)) {
        updateSetting("offsetX", val);
      }
    },
    [updateSetting]
  );

  const handleOffsetY = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val)) {
        updateSetting("offsetY", val);
      }
    },
    [updateSetting]
  );

  const handleAutoCenter = useCallback(() => {
    if (!stats) return;
    const { offsetX, offsetY } = calcCenterOffsets(
      stats.boundingBox,
      profile.buildVolume
    );
    updateSetting("offsetX", offsetX);
    updateSetting("offsetY", offsetY);
  }, [stats, updateSetting, profile.buildVolume]);

  // Preview: show where the model will end up after offset
  const modelInfo = stats
    ? (() => {
        const bb = stats.boundingBox;
        const w = bb.max.x - bb.min.x;
        const d = bb.max.y - bb.min.y;
        const afterMinX = bb.min.x + offsetX;
        const afterMaxX = bb.max.x + offsetX;
        const afterMinY = bb.min.y + offsetY;
        const afterMaxY = bb.max.y + offsetY;
        const bv = profile.buildVolume;
        const fits =
          afterMinX >= 0 &&
          afterMaxX <= bv.x &&
          afterMinY >= 0 &&
          afterMaxY <= bv.y;
        return { w, d, afterMinX, afterMaxX, afterMinY, afterMaxY, fits };
      })()
    : null;

  const bv = profile.buildVolume;

  return (
    <div className="space-y-4">
      {/* Printer Model Selector */}
      <div className="space-y-2">
        <Label htmlFor="printer-model">{t.print.printerModel}</Label>
        <Select value={printerId} onValueChange={handlePrinterChange}>
          <SelectTrigger id="printer-model" className="w-full">
            <SelectValue placeholder={t.print.selectPrinter} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(printerGroups).map(([series, printers]) => (
              <SelectGroup key={series}>
                <SelectLabel>{seriesLabels[series] ?? series}</SelectLabel>
                {printers.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Max Print Speed */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="max-speed">{t.print.maxSpeed}</Label>
          <div className="flex items-center gap-2">
            <Input
              id="max-speed"
              type="number"
              min={50}
              max={500}
              step={10}
              value={maxSpeed}
              onChange={handleMaxSpeedInput}
              className="h-8 w-20 text-right"
            />
            <span className="text-muted-foreground text-sm">{t.print.speedUnit}</span>
          </div>
        </div>
        <Slider
          value={[maxSpeed]}
          onValueChange={handleMaxSpeedSlider}
          min={50}
          max={500}
          step={10}
          className="[&_[data-slot=slider-range]]:bg-green-500 [&_[data-slot=slider-thumb]]:border-green-500"
        />
        <p className="text-muted-foreground text-xs">
          {t.print.speedHint}
        </p>
      </div>

      {/* Speed Factor */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="speed-factor">{t.print.speedFactor}</Label>
          <div className="flex items-center gap-2">
            <Input
              id="speed-factor"
              type="number"
              min={1}
              max={100}
              step={1}
              value={Math.round(speedFactor * 100)}
              onChange={handleSpeedFactorInput}
              className="h-8 w-20 text-right"
            />
            <span className="text-muted-foreground text-sm">%</span>
          </div>
        </div>
        <Slider
          id="speed-factor"
          value={[Math.round(speedFactor * 100)]}
          onValueChange={handleSpeedFactorSlider}
          min={1}
          max={100}
          step={1}
          className="[&_[data-slot=slider-range]]:bg-blue-500 [&_[data-slot=slider-thumb]]:border-blue-500"
        />
        <p className="text-muted-foreground text-xs">
          {t.print.speedFactorHint}
        </p>
      </div>

      {/* Nozzle Diameter */}
      <div className="space-y-2">
        <Label htmlFor="nozzle-diameter">{t.print.nozzleDiameter}</Label>
        <Select
          value={nozzleDiameter.toString()}
          onValueChange={handleNozzleDiameter}
        >
          <SelectTrigger id="nozzle-diameter" className="w-full">
            <SelectValue placeholder={t.print.selectNozzle} />
          </SelectTrigger>
          <SelectContent>
            {NOZZLE_DIAMETERS.map((d) => (
              <SelectItem key={d} value={d}>
                {d} mm
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bed Offsets */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>{t.print.bedOffset}</Label>
          <Button
            variant="outline"
            size="sm"
            className="h-7 cursor-pointer gap-1.5 px-2.5 text-xs"
            onClick={handleAutoCenter}
            disabled={!isParsingComplete}
          >
            <Crosshair className="size-3.5" />
            {t.print.autoCenter}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="offset-x" className="text-muted-foreground text-xs">
              X
            </Label>
            <Input
              id="offset-x"
              type="number"
              value={offsetX}
              onChange={handleOffsetX}
              className="w-full"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="offset-y" className="text-muted-foreground text-xs">
              Y
            </Label>
            <Input
              id="offset-y"
              type="number"
              value={offsetY}
              onChange={handleOffsetY}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Model position preview */}
      {modelInfo && (
        <div
          className={`rounded-lg border p-3 ${modelInfo.fits ? "border-green-500/30 bg-green-500/5" : "border-yellow-500/30 bg-yellow-500/5"}`}
        >
          <p className="text-muted-foreground text-xs font-medium">
            {t.print.previewTitle}
          </p>
          <div className="mt-1 space-y-0.5 font-mono text-xs">
            <p>
              <span className="text-muted-foreground">X:</span>{" "}
              <span className="text-foreground">
                {modelInfo.afterMinX.toFixed(1)} → {modelInfo.afterMaxX.toFixed(1)} mm
              </span>
              <span className="text-muted-foreground ml-1">
                ({t.print.width} {modelInfo.w.toFixed(1)})
              </span>
            </p>
            <p>
              <span className="text-muted-foreground">Y:</span>{" "}
              <span className="text-foreground">
                {modelInfo.afterMinY.toFixed(1)} → {modelInfo.afterMaxY.toFixed(1)} mm
              </span>
              <span className="text-muted-foreground ml-1">
                ({t.print.width} {modelInfo.d.toFixed(1)})
              </span>
            </p>
          </div>
          <p className={`mt-1.5 text-xs font-medium ${modelInfo.fits ? "text-green-500" : "text-yellow-500"}`}>
            {modelInfo.fits
              ? t.print.fitsInVolume
              : t.print.exceedsVolume}
          </p>
        </div>
      )}

      {/* Build Volume Info */}
      <div className="bg-muted/50 rounded-lg border p-3">
        <p className="text-muted-foreground text-xs font-medium">
          {t.print.buildVolume}
        </p>
        <p className="text-foreground text-sm font-semibold">
          {profile.name}: {bv.x} x {bv.y} x {bv.z} mm
        </p>
      </div>
    </div>
  );
}
