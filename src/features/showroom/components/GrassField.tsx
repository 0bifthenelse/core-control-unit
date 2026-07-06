"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three/webgpu";
import { useFrame } from "@react-three/fiber";
import {
  uniform,
  positionLocal,
  attribute,
  float,
  vec3,
  sin,
  atan,
  length,
  normalize,
  smoothstep,
  mix,
} from "three/tsl";
import type { MutableRefObject } from "react";
import type { Mesh } from "three";

export const GRASS_COUNT = 6000;
export const FLOOR_Y = -1;
const FIELD = 20;
const BLADE_H = 0.6;

type UniformNode = ReturnType<typeof uniform>;

export function createGrassMesh(timeUniform: UniformNode, cubeRotUniform: UniformNode) {
  const timeU = timeUniform as unknown as typeof positionLocal.x;
  const cubeRotU = cubeRotUniform as unknown as typeof positionLocal.x;
  const geometry = new THREE.PlaneGeometry(0.06, BLADE_H, 1, 4);
  geometry.translate(0, BLADE_H / 2, 0);

  const bases = new Float32Array(GRASS_COUNT * 3);
  let seed = 1337;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  const scratch = new THREE.Object3D();
  const mesh = new THREE.InstancedMesh(geometry, null as unknown as THREE.Material, GRASS_COUNT);
  for (let i = 0; i < GRASS_COUNT; i++) {
    const x = (rand() * 2 - 1) * FIELD;
    const z = (rand() * 2 - 1) * FIELD;
    bases[i * 3] = x;
    bases[i * 3 + 1] = 0;
    bases[i * 3 + 2] = z;
    scratch.position.set(x, 0, z);
    scratch.rotation.set(0, rand() * Math.PI, 0);
    scratch.scale.setScalar(0.7 + rand() * 0.6);
    scratch.updateMatrix();
    mesh.setMatrixAt(i, scratch.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;

  geometry.setAttribute("aBase", new THREE.InstancedBufferAttribute(bases, 3));

  const material = new THREE.MeshStandardNodeMaterial({
    roughness: 1,
    metalness: 0,
    side: THREE.DoubleSide,
  });

  const aBase = attribute("aBase", "vec3") as unknown as typeof positionLocal;
  const heightFactor = positionLocal.y.div(BLADE_H);

  const wind = sin(timeU.mul(2).add(aBase.x.mul(0.6)).add(aBase.z.mul(0.6)))
    .mul(0.12)
    .mul(heightFactor);

  const dist = length(aBase.xz);
  const dir = normalize(aBase.xz);
  const angle = atan(aBase.z, aBase.x);
  const falloff = float(1).sub(smoothstep(1.0, 4.0, dist));
  const sweep = sin(cubeRotU.add(angle.mul(2))).mul(0.3).add(0.4);
  const bendStrength = falloff.mul(heightFactor).mul(sweep).mul(0.8);
  const bend = dir.mul(bendStrength);

  material.positionNode = vec3(
    positionLocal.x.add(wind).add(bend.x),
    positionLocal.y,
    positionLocal.z.add(bend.y),
  );
  material.colorNode = mix(
    vec3(0.16, 0.29, 0.12),
    vec3(0.45, 0.68, 0.28),
    heightFactor,
  );

  mesh.material = material;
  return mesh;
}

type Props = {
  cubeRotationRef: MutableRefObject<number>;
};

export function GrassField({ cubeRotationRef }: Props) {
  const groundRef = useRef<Mesh>(null);
  const timeU = useMemo(() => uniform(0), []);
  const cubeRotU = useMemo(() => uniform(0), []);

  const blades = useMemo(() => createGrassMesh(timeU, cubeRotU), [timeU, cubeRotU]);

  useFrame((_, delta) => {
    timeU.value += delta;
    cubeRotU.value = cubeRotationRef.current;
  });

  return (
    <>
      <mesh ref={groundRef} rotation-x={-Math.PI / 2} position={[0, FLOOR_Y, 0]}>
        <planeGeometry args={[FIELD * 2, FIELD * 2]} />
        <meshStandardMaterial color="#243d16" roughness={1} metalness={0} />
      </mesh>
      <primitive object={blades} position={[0, FLOOR_Y, 0]} />
    </>
  );
}
