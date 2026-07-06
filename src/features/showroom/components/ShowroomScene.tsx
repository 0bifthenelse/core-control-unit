"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three/webgpu";
import { uniform } from "three/tsl";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import type { Material, Mesh } from "three";
import { GrassField, createGrassMesh, FLOOR_Y } from "./GrassField";
import {
  BlackHole,
  createBlackHole,
  blackHoleGrowth,
  computeDiscsPivotQuaternion,
  BLACK_HOLE_APPEAR_DURATION,
} from "./BlackHole";

export function ShowroomScene() {
  const blackHoleRef = useRef(0);

  useEffect(() => {
    const grassProbe = createGrassMesh(uniform(0), uniform(0));
    const holeProbe = createBlackHole(uniform(0));
    const horizon = holeProbe.children[0] as Mesh;

    const sampleCameraPositions = [new THREE.Vector3(10, 10, 10), new THREE.Vector3(0, 3, 15)];
    const facingDotSamples = sampleCameraPositions.map((camPos) => {
      const quat = computeDiscsPivotQuaternion(camPos);
      const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(quat);
      const toCamera = camPos.clone().normalize();
      return forward.dot(toCamera);
    });

    (window as unknown as { __showroom?: unknown }).__showroom = {
      grassCount: grassProbe.count,
      floorY: FLOOR_Y,
      grassMaterialType: (grassProbe.material as Material).constructor.name,
      blackHole: {
        present: true,
        materialType: (horizon.material as Material).constructor.name,
        hasAccretionRing: holeProbe.userData.hasAccretionRing === true,
        hasHaloRing: holeProbe.userData.hasHaloRing === true,
        facingDotSamples,
        appearDuration: BLACK_HOLE_APPEAR_DURATION,
        growthSamples: [0, 0.1, 0.3, 0.6, 1.0].map(blackHoleGrowth),
      },
    };

    grassProbe.geometry.dispose();
    (grassProbe.material as Material).dispose();
    holeProbe.traverse((obj) => {
      const m = obj as Mesh;
      if (m.geometry) m.geometry.dispose();
      if (m.material) (m.material as Material).dispose();
    });
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
      <BlackHole blackHoleRef={blackHoleRef} />
      <GrassField blackHoleRef={blackHoleRef} />
    </Canvas>
  );
}
