"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useGCodeStore } from "@/stores/useGCodeStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useTranslation } from "@/lib/i18n";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { LayerSlider } from "./LayerSlider";
import { Layers, Clock, Ruler, AlertCircle, Loader2 } from "lucide-react";

// Dynamically import the 3D scene to avoid SSR issues with Three.js
const GCodeScene = dynamic(
  () => import("./GCodeScene").then((mod) => ({ default: mod.GCodeScene })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    ),
  }
);

function formatTime(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) {
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return `${m}m ${s}s`;
  }
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

function formatFilament(mm: number): string {
  if (mm < 1000) return `${Math.round(mm)} mm`;
  return `${(mm / 1000).toFixed(2)} m`;
}

/** Main 3D preview container for G-code visualization. */
export function GCodeViewer() {
  const parsedData = useGCodeStore((s) => s.parsedData);
  const layers = useGCodeStore((s) => s.layers);
  const stats = useGCodeStore((s) => s.stats);
  const isParsing = useGCodeStore((s) => s.isParsing);
  const parseError = useGCodeStore((s) => s.parseError);

  const offsetX = useSettingsStore((s) => s.offsetX);
  const offsetY = useSettingsStore((s) => s.offsetY);

  const t = useTranslation();

  const [visibleLayerMax, setVisibleLayerMax] = useState(0);

  // Reset slider to show all layers when new data is loaded
  useEffect(() => {
    if (layers.length > 0) {
      setVisibleLayerMax(layers.length - 1);
    } else {
      setVisibleLayerMax(0);
    }
  }, [layers]);

  // Show parsing state
  if (isParsing) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border border-border/60 bg-muted/20">
        <div className="flex flex-col items-center gap-3 text-center">
          <Loader2 className="size-8 animate-spin text-green-500" />
          <p className="text-sm font-medium text-muted-foreground">
            {t.preview.parsingGCode}
          </p>
        </div>
      </div>
    );
  }

  // Show parse error
  if (parseError) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border border-red-500/30 bg-red-500/5">
        <div className="flex flex-col items-center gap-3 text-center px-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <AlertCircle className="size-6 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-500">
              {t.preview.failedToParse}
            </p>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              {parseError}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Placeholder when no data is loaded
  if (!parsedData) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border border-border/60 bg-muted/20">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Layers className="size-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {t.preview.noGCodeLoaded}
            </p>
            <p className="mt-1 text-xs text-muted-foreground/60">
              {t.preview.uploadToPreview}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-border/60 overflow-hidden">
      {/* 3D Canvas */}
      <div className="relative flex-1 min-h-0">
        <CanvasErrorBoundary>
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
              </div>
            }
          >
            <GCodeScene
              layers={layers}
              visibleLayerMax={visibleLayerMax}
              offsetX={offsetX}
              offsetY={offsetY}
            />
          </Suspense>
        </CanvasErrorBoundary>
      </div>

      {/* Layer slider */}
      <div className="border-t border-border/60 bg-background/80 backdrop-blur-sm">
        <LayerSlider value={visibleLayerMax} onChange={setVisibleLayerMax} />
      </div>

      {/* Print stats bar */}
      {stats && (
        <div className="flex items-center gap-4 border-t border-border/60 bg-background/80 px-4 py-2 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <Layers className="size-3.5 text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground">
              {t.preview.layers.replace("{n}", String(stats.layerCount))}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground">
              {formatTime(stats.estimatedTime)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Ruler className="size-3.5 text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground">
              {formatFilament(stats.filamentLength)}
              {" "}
              ({stats.filamentWeight.toFixed(1)} g)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
