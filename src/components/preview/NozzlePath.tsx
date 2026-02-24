import { useMemo, useEffect, useRef } from "react";
import * as THREE from "three";
import type { Layer } from "@/lib/gcode/types";

interface NozzlePathProps {
  layers: Layer[];
  visibleLayerMax: number;
}

/**
 * Convert a layer index / total count into an HSL color.
 * Bottom layers are blue (hue ~240), top layers are red (hue ~0).
 */
function layerColor(layerIndex: number, totalLayers: number): THREE.Color {
  const t = totalLayers <= 1 ? 0 : layerIndex / (totalLayers - 1);
  const hue = 0.66 * (1 - t);
  return new THREE.Color().setHSL(hue, 0.85, 0.55);
}

/**
 * Map G-code coordinates (X, Y, Z-up) → Three.js (X, Y-up, Z).
 * Writes 3 floats at the given offset in the output array.
 */
function writeVertex(
  out: Float32Array,
  offset: number,
  gx: number,
  gy: number,
  gz: number,
): void {
  out[offset]     = gx; // G-code X → Three.js X
  out[offset + 1] = gz; // G-code Z → Three.js Y (up)
  out[offset + 2] = gy; // G-code Y → Three.js Z
}

/** Renders line segments for G-code tool paths with color-coded extrusion and travel moves. */
export function NozzlePath({ layers, visibleLayerMax }: NozzlePathProps) {
  const totalLayers = layers.length;

  // Track previous geometries for disposal
  const prevExtGeomRef = useRef<THREE.BufferGeometry | null>(null);
  const prevTravelGeomRef = useRef<THREE.BufferGeometry | null>(null);

  // Build extrusion geometry with pre-allocated arrays for performance
  const extrusionGeometry = useMemo(() => {
    // First pass: count segments
    let extCount = 0;
    for (let i = 0; i <= visibleLayerMax && i < layers.length; i++) {
      const layer = layers[i];
      if (!layer) continue;
      for (const seg of layer.segments) {
        if (seg.extruding) extCount++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    if (extCount === 0) return geometry;

    // Pre-allocate typed arrays
    const positions = new Float32Array(extCount * 6);
    const colors = new Float32Array(extCount * 6);
    let offset = 0;

    for (let i = 0; i <= visibleLayerMax && i < layers.length; i++) {
      const layer = layers[i];
      if (!layer) continue;
      const color = layerColor(i, totalLayers);
      const r = color.r, g = color.g, b = color.b;

      for (const seg of layer.segments) {
        if (!seg.extruding) continue;

        writeVertex(positions, offset, seg.start.x, seg.start.y, seg.start.z);
        writeVertex(positions, offset + 3, seg.end.x, seg.end.y, seg.end.z);

        colors[offset]     = r;
        colors[offset + 1] = g;
        colors[offset + 2] = b;
        colors[offset + 3] = r;
        colors[offset + 4] = g;
        colors[offset + 5] = b;

        offset += 6;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, [layers, visibleLayerMax, totalLayers]);

  // Build travel geometry
  const travelGeometry = useMemo(() => {
    let travelCount = 0;
    for (let i = 0; i <= visibleLayerMax && i < layers.length; i++) {
      const layer = layers[i];
      if (!layer) continue;
      for (const seg of layer.segments) {
        if (!seg.extruding) travelCount++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    if (travelCount === 0) return geometry;

    const positions = new Float32Array(travelCount * 6);
    let offset = 0;

    for (let i = 0; i <= visibleLayerMax && i < layers.length; i++) {
      const layer = layers[i];
      if (!layer) continue;
      for (const seg of layer.segments) {
        if (seg.extruding) continue;

        writeVertex(positions, offset, seg.start.x, seg.start.y, seg.start.z);
        writeVertex(positions, offset + 3, seg.end.x, seg.end.y, seg.end.z);

        offset += 6;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [layers, visibleLayerMax]);

  // Dispose previous geometries when new ones are created
  useEffect(() => {
    const prevExt = prevExtGeomRef.current;
    const prevTravel = prevTravelGeomRef.current;

    prevExtGeomRef.current = extrusionGeometry;
    prevTravelGeomRef.current = travelGeometry;

    return () => {
      if (prevExt && prevExt !== extrusionGeometry) {
        prevExt.dispose();
      }
      if (prevTravel && prevTravel !== travelGeometry) {
        prevTravel.dispose();
      }
    };
  }, [extrusionGeometry, travelGeometry]);

  // Dispose on unmount
  useEffect(() => {
    return () => {
      prevExtGeomRef.current?.dispose();
      prevTravelGeomRef.current?.dispose();
    };
  }, []);

  return (
    <group>
      {/* Extrusion paths - colored by layer height */}
      <lineSegments geometry={extrusionGeometry}>
        <lineBasicMaterial vertexColors linewidth={1} />
      </lineSegments>

      {/* Travel moves - thin semi-transparent gray */}
      <lineSegments geometry={travelGeometry}>
        <lineBasicMaterial color="#64748b" opacity={0.15} transparent linewidth={1} />
      </lineSegments>
    </group>
  );
}
