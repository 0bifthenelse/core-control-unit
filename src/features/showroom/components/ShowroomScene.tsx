"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three/webgpu";
import { uniform } from "three/tsl";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import type { Mesh, Material } from "three";
import type { MutableRefObject } from "react";
import { GrassField, createGrassMesh, FLOOR_Y } from "./GrassField";

function Cube({ rotationRef }: { rotationRef: MutableRefObject<number> }) {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
      rotationRef.current = ref.current.rotation.y;
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
  const cubeRotationRef = useRef(0);

  useEffect(() => {
    const probe = createGrassMesh(uniform(0), uniform(0));
    (window as unknown as { __showroom?: unknown }).__showroom = {
      grassCount: probe.count,
      floorY: FLOOR_Y,
      grassMaterialType: (probe.material as Material).constructor.name,
    };
    probe.geometry.dispose();
    (probe.material as Material).dispose();
  }, []);

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
      <Cube rotationRef={cubeRotationRef} />
      <GrassField cubeRotationRef={cubeRotationRef} />
    </Canvas>
  );
}
