"use client";

import { useGCodeStore } from "@/stores/useGCodeStore";
import { useTranslation } from "@/lib/i18n";
import { Slider } from "@/components/ui/slider";

interface LayerSliderProps {
  value: number;
  onChange: (value: number) => void;
}

/** Horizontal slider to control which layers are visible in the 3D preview. */
export function LayerSlider({ value, onChange }: LayerSliderProps) {
  const layers = useGCodeStore((s) => s.layers);
  const t = useTranslation();

  const totalLayers = layers.length;

  if (totalLayers === 0) return null;

  const maxIndex = totalLayers - 1;
  const currentZ = layers[value]?.z ?? 0;

  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <div className="shrink-0">
        <span className="font-mono text-xs text-muted-foreground">{t.preview.layer}</span>
      </div>

      <Slider
        min={0}
        max={maxIndex}
        step={1}
        value={[value]}
        onValueChange={(vals: number[]) => onChange(vals[0])}
        className="flex-1"
      />

      <div className="flex shrink-0 items-center gap-3">
        <span className="font-mono text-xs text-foreground">
          {value + 1}
          <span className="text-muted-foreground"> / {totalLayers}</span>
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          Z {currentZ.toFixed(2)} mm
        </span>
      </div>
    </div>
  );
}
