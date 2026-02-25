import { useMemo } from "react";
import * as THREE from "three";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { getPrinterProfile } from "@/lib/printer-profiles";

/**
 * Wireframe box representing the selected Bambu Lab printer's build volume.
 *
 * Coordinate mapping: G-code (X, Y, Z-up) → Three.js (X, Y-up, Z)
 *   G-code X → Three.js X
 *   G-code Y → Three.js Z
 *   G-code Z → Three.js Y (up)
 */
export function BuildVolume() {
  const printerId = useSettingsStore((s) => s.printerId);
  const profile = getPrinterProfile(printerId);

  const bedSizeX = profile.buildVolume.x;
  const bedSizeY = profile.buildVolume.y;
  const bedHeight = profile.buildVolume.z;

  const edges = useMemo(() => {
    // BoxGeometry(width=X, height=Y-up=GcodeZ, depth=Z=GcodeY)
    const geometry = new THREE.BoxGeometry(bedSizeX, bedHeight, bedSizeY);
    return new THREE.EdgesGeometry(geometry);
  }, [bedSizeX, bedSizeY, bedHeight]);

  return (
    <group>
      {/* Build volume wireframe — centered on XZ, bottom at Y=0 */}
      <lineSegments
        geometry={edges}
        position={[bedSizeX / 2, bedHeight / 2, bedSizeY / 2]}
      >
        <lineBasicMaterial color="#475569" opacity={0.4} transparent />
      </lineSegments>

      {/* Grid on the bed plane (Y=0, XZ plane — gridHelper default) */}
      <gridHelper
        args={[Math.max(bedSizeX, bedSizeY), 16, "#334155", "#1e293b"]}
        position={[bedSizeX / 2, 0, bedSizeY / 2]}
      />

      {/* Origin marker — small axes indicator at (0, 0, 0) */}
      {/* G-code X axis — red → Three.js +X */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 0, 0, 15, 0, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ef4444" opacity={0.8} transparent />
      </line>

      {/* G-code Y axis — green → Three.js +Z */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 0, 0, 0, 0, 15]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#22c55e" opacity={0.8} transparent />
      </line>

      {/* G-code Z axis — blue → Three.js +Y (up) */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 0, 0, 0, 15, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#3b82f6" opacity={0.8} transparent />
      </line>
    </group>
  );
}
