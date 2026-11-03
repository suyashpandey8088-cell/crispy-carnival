"use client";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

function Form({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y += delta * 0.08;
    group.current.position.y =
      -Math.min(window.scrollY / window.innerHeight, 1) * 0.8;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.12 + 0.2,
      0.025,
    );
  });
  return (
    <group ref={group} rotation={[0.2, 0, -0.35]} scale={0.82}>
      <Float
        speed={reducedMotion ? 0 : 1.1}
        rotationIntensity={0.12}
        floatIntensity={0.2}
      >
        <mesh castShadow>
          <torusKnotGeometry args={[1.55, 0.37, 220, 32, 2, 3]} />
          <meshStandardMaterial
            color="#9d9586"
            metalness={1}
            roughness={0.24}
          />
        </mesh>
        <mesh scale={1.012}>
          <torusKnotGeometry args={[1.55, 0.371, 128, 8, 2, 3]} />
          <meshStandardMaterial
            color="#b29971"
            metalness={1}
            roughness={0.35}
            wireframe
            transparent
            opacity={0.13}
          />
        </mesh>
      </Float>
    </group>
  );
}
export default function Sculpture({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      aria-label="Interactive metallic intelligence sculpture. Drag to rotate, or use the close button to return to the artwork."
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <spotLight
          position={[3, 5, 3]}
          intensity={45}
          color="#ead6b0"
          angle={0.6}
          penumbra={1}
        />
        <pointLight position={[-3, -2, 2]} intensity={12} color="#c1c9d0" />
        <Environment resolution={128}>
          <Lightformer
            intensity={4}
            position={[-3, 2, 3]}
            scale={[1, 7, 1]}
            color="#f3eade"
          />
          <Lightformer
            intensity={3}
            position={[3, 1, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[2, 5, 1]}
            color="#c6b79e"
          />
          <Lightformer
            intensity={2}
            position={[0, 4, -2]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[6, 2, 1]}
            color="#ffffff"
          />
        </Environment>
        <Form reducedMotion={reducedMotion} />
        {!reducedMotion && (
          <Sparkles
            count={35}
            scale={8}
            size={1.1}
            speed={0.15}
            color="#c4ad88"
            opacity={0.4}
          />
        )}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!reducedMotion}
          autoRotateSpeed={0.25}
        />
      </Suspense>
    </Canvas>
  );
}
