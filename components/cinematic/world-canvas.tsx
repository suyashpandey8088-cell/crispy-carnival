"use client";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { world, subscribeWorld } from "./world-state";

function ScrollSculpture() {
  const group = useRef<THREE.Group>(null);
  const parts = useRef<(THREE.Mesh | null)[]>([]);
  const light = useRef<THREE.PointLight>(null);
  const points = useRef<THREE.Points>(null);
  const { invalidate, viewport } = useThree();
  const positions = useMemo(() => {
    const values = new Float32Array(180 * 3);
    for (let i = 0; i < values.length; i++)
      values[i] = Math.sin(i * 127.1 + 0.5) * (i % 3 === 2 ? 3 : 5);
    return values;
  }, []);
  useEffect(() => subscribeWorld(invalidate), [invalidate]);
  useFrame(({ camera, gl }) => {
    if (!group.current) return;
    group.current.rotation.set(
      world.tilt,
      world.rotation,
      -0.25 + world.assembly * 0.15,
    );
    group.current.position.set(
      world.x * viewport.width,
      viewport.width < 5 ? world.mobileY : world.y,
      0,
    );
    const size = viewport.width < 5 ? 0.62 : 1;
    group.current.scale.setScalar(size);
    camera.position.z = 8.8 - world.zoom * 1.7;
    camera.position.x = Math.sin(world.rotation) * 0.28;
    camera.lookAt(0, 0, 0);
    gl.domElement.dataset.cameraZ = camera.position.z.toFixed(3);
    gl.domElement.dataset.spread = world.spread.toFixed(3);
    parts.current.forEach((part, i) => {
      if (!part) return;
      const a = (i / 6) * Math.PI * 2;
      part.position.set(
        Math.cos(a) * world.spread * 1.6,
        Math.sin(a) * world.spread * 1.6,
        Math.sin(a * 2) * world.spread,
      );
      part.rotation.set(
        (i * Math.PI) / 3 + world.assembly * 0.35,
        i * 0.65,
        a + world.assembly * 0.4,
      );
    });
    if (light.current) {
      light.current.position.x = Math.sin(world.rotation) * 5;
      light.current.intensity = 12 + world.light * 18;
    }
    if (points.current) {
      points.current.rotation.y = world.rotation * 0.15;
      points.current.scale.setScalar(1 + world.spread * 0.2);
    }
  });
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight
        ref={light}
        position={[4, 3, 4]}
        intensity={25}
        color="#dcc9a3"
      />
      <pointLight position={[-4, -2, 3]} intensity={9} color="#dce2e7" />
      <Environment resolution={64} frames={1}>
        <Lightformer
          intensity={3}
          position={[-4, 2, 3]}
          scale={[2, 7, 1]}
          color="#f4ede1"
        />
        <Lightformer
          intensity={4}
          position={[4, 2, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[2, 6, 1]}
          color="#cfbea1"
        />
        <Lightformer
          intensity={2}
          position={[0, 4, -2]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[7, 2, 1]}
        />
      </Environment>
      <group ref={group}>
        {Array.from({ length: 6 }, (_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              parts.current[i] = el;
            }}
            rotation={[(i * Math.PI) / 3, i * 0.65, (i / 6) * Math.PI * 2]}
          >
            <torusGeometry args={[1.5, 0.16, 12, 72, Math.PI * 2]} />
            <meshStandardMaterial
              color={i % 2 ? "#928a79" : "#b5b4ac"}
              metalness={1}
              roughness={0.27}
            />
          </mesh>
        ))}
      </group>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.012}
          color="#cbbb9e"
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </points>
    </>
  );
}
export default function WorldCanvas({ onReady }: { onReady: () => void }) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[0.75, 1]}
      camera={{ position: [0, 0, 8.8], fov: 40 }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      onCreated={onReady}
      aria-hidden="true"
    >
      <ScrollSculpture />
    </Canvas>
  );
}
