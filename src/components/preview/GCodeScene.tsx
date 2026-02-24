import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BuildVolume } from "./BuildVolume";
import { NozzlePath } from "./NozzlePath";
import type { Layer } from "@/lib/gcode/types";

interface GCodeSceneProps {
  layers: Layer[];
  visibleLayerMax: number;
  /** G-code X offset (applied as Three.js X translation) */
  offsetX: number;
  /** G-code Y offset (applied as Three.js Z translation) */
  offsetY: number;
}

/**
 * React Three Fiber Canvas containing the 3D preview scene.
 *
 * Coordinate mapping: G-code (X, Y, Z-up) → Three.js (X, Y-up, Z)
 * Camera starts from a front-right elevated angle looking at the bed center.
 */
export function GCodeScene({ layers, visibleLayerMax, offsetX, offsetY }: GCodeSceneProps) {
  return (
    <Canvas
      camera={{
        position: [350, 280, 350],
        fov: 45,
        near: 0.1,
        far: 2000,
      }}
      gl={{ antialias: true }}
      style={{ background: "#0a0a0a" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[300, 400, 200]} intensity={0.8} />

      {/* Camera controls — orbit around bed center, prevent going below the bed */}
      <OrbitControls
        target={[128, 40, 128]}
        enableDamping
        dampingFactor={0.1}
        minDistance={50}
        maxDistance={1000}
        maxPolarAngle={Math.PI * 0.48}
      />

      {/* Build volume wireframe + grid */}
      <BuildVolume />

      {/* Nozzle path — offset group maps G-code offset to Three.js position:
          offsetX → Three.js X,  offsetY → Three.js Z (G-code Y → Three.js Z) */}
      {layers.length > 0 && (
        <group position={[offsetX, 0, offsetY]}>
          <NozzlePath layers={layers} visibleLayerMax={visibleLayerMax} />
        </group>
      )}
    </Canvas>
  );
}
