"use client";

import { useMemo } from "react";
import * as THREE from "three/webgpu";
import { useFrame } from "@react-three/fiber";
import {
  uniform,
  positionLocal,
  attribute,
  float,
  vec3,
  sin,
  length,
  normalize,
  smoothstep,
  mix,
} from "three/tsl";
import type { MutableRefObject } from "react";

export const GRASS_COUNT = 6000;
export const FLOOR_Y = -1;
const FIELD = 20;
const BLADE_H = 0.6;
const WELL_RADIUS = 6;
const WELL_DEPTH = 2;
const LEAN = 1.4;

type UniformNode = ReturnType<typeof uniform>;

export function createGrassMesh(timeUniform: UniformNode, intensityUniform: UniformNode) {
  const timeU = timeUniform as unknown as typeof positionLocal.x;
  const bhU = intensityUniform as unknown as typeof positionLocal.x;
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
  const inward = normalize(aBase.xz).negate();
  const leanFalloff = float(1).sub(smoothstep(0.5, WELL_RADIUS, dist));
  const bendStrength = leanFalloff.mul(heightFactor).mul(bhU).mul(LEAN);
  const bend = inward.mul(bendStrength);

  const sinkFalloff = float(1).sub(smoothstep(0.0, WELL_RADIUS, dist));
  const sink = sinkFalloff.mul(bhU).mul(WELL_DEPTH);

  material.positionNode = vec3(
    positionLocal.x.add(wind).add(bend.x),
    positionLocal.y.sub(sink),
    positionLocal.z.add(bend.y),
  );
  material.colorNode = mix(vec3(0.16, 0.29, 0.12), vec3(0.45, 0.68, 0.28), heightFactor);

  mesh.material = material;
  return mesh;
}

export function createGround(intensityUniform: UniformNode) {
  const bhU = intensityUniform as unknown as typeof positionLocal.x;
  const geometry = new THREE.PlaneGeometry(FIELD * 2, FIELD * 2, 96, 96);
  geometry.rotateX(-Math.PI / 2);

  const material = new THREE.MeshStandardNodeMaterial({
    roughness: 1,
    metalness: 0,
  });

  const radius = length(positionLocal.xz);
  const dipFalloff = float(1).sub(smoothstep(0.0, WELL_RADIUS, radius));
  const dip = dipFalloff.mul(bhU).mul(WELL_DEPTH);

  material.positionNode = vec3(positionLocal.x, positionLocal.y.sub(dip), positionLocal.z);
  material.colorNode = mix(vec3(0.09, 0.16, 0.06), vec3(0.14, 0.24, 0.09), dipFalloff);

  return new THREE.Mesh(geometry, material);
}

type Props = {
  blackHoleRef: MutableRefObject<number>;
};

export function GrassField({ blackHoleRef }: Props) {
  const timeU = useMemo(() => uniform(0), []);
  const bhU = useMemo(() => uniform(0), []);

  const blades = useMemo(() => createGrassMesh(timeU, bhU), [timeU, bhU]);
  const ground = useMemo(() => createGround(bhU), [bhU]);

  // Three.js uniforms are intentionally mutated from the render loop
  // eslint-disable-next-line react-hooks/immutability
  useFrame((_, delta) => {
    // eslint-disable-next-line react-hooks/immutability
    timeU.value += delta;
    // eslint-disable-next-line react-hooks/immutability
    bhU.value = blackHoleRef.current;
  });

  return (
    <>
      <primitive object={ground} position={[0, FLOOR_Y, 0]} />
      <primitive object={blades} position={[0, FLOOR_Y, 0]} />
    </>
  );
}
