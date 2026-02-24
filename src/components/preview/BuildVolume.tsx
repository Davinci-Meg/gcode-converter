import { useMemo } from "react";
import * as THREE from "three";

const BED_SIZE = 256;
const BED_HEIGHT = 256;

/**
 * Wireframe box representing the Bambu A1 build volume (256 x 256 x 256 mm).
 *
 * Coordinate mapping: G-code (X, Y, Z-up) → Three.js (X, Y-up, Z)
 *   G-code X → Three.js X
 *   G-code Y → Three.js Z
 *   G-code Z → Three.js Y (up)
 */
export function BuildVolume() {
  const edges = useMemo(() => {
    // BoxGeometry(width=X, height=Y-up=GcodeZ, depth=Z=GcodeY)
    const geometry = new THREE.BoxGeometry(BED_SIZE, BED_HEIGHT, BED_SIZE);
    return new THREE.EdgesGeometry(geometry);
  }, []);

  return (
    <group>
      {/* Build volume wireframe — centered on XZ, bottom at Y=0 */}
      <lineSegments
        geometry={edges}
        position={[BED_SIZE / 2, BED_HEIGHT / 2, BED_SIZE / 2]}
      >
        <lineBasicMaterial color="#475569" opacity={0.4} transparent />
      </lineSegments>

      {/* Grid on the bed plane (Y=0, XZ plane — gridHelper default) */}
      <gridHelper
        args={[BED_SIZE, 16, "#334155", "#1e293b"]}
        position={[BED_SIZE / 2, 0, BED_SIZE / 2]}
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
