"use client";

import { useRef } from "react";
import * as THREE from "three/webgpu";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import type { Mesh } from "three";

function Cube() {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#ff7d27" />
    </mesh>
  );
}

export function ShowroomScene() {
  return (
    <Canvas
      className="h-full w-full"
      gl={async (props) => {
        const renderer = new THREE.WebGPURenderer(props as ConstructorParameters<typeof THREE.WebGPURenderer>[0]);
        await renderer.init();
        return renderer;
      }}
    >
      <OrthographicCamera makeDefault position={[10, 10, 10]} zoom={80} onUpdate={(c) => c.lookAt(0, 0, 0)} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      <Cube />
    </Canvas>
  );
}
