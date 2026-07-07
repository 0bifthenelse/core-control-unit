"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three/webgpu";
import { useFrame, useThree } from "@react-three/fiber";
import {
  uniform,
  positionLocal,
  normalView,
  positionViewDirection,
  float,
  vec3,
  cos,
  atan,
  abs,
  length,
  mix,
  clamp,
  smoothstep,
  fract,
  mx_fractal_noise_float,
} from "three/tsl";
import type { MutableRefObject } from "react";
import type { Group } from "three";

export const BLACK_HOLE_APPEAR_DURATION = 0.6;
export const HORIZON_RADIUS = 0.9;

type UniformNode = ReturnType<typeof uniform>;
type ScalarNode = typeof positionLocal.x;

export function blackHoleGrowth(elapsed: number): number {
  const t = Math.min(Math.max(elapsed / BLACK_HOLE_APPEAR_DURATION, 0), 1);
  if (t >= 1) return 1;
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const p = t - 1;
  return 1 + c3 * p * p * p + c1 * p * p;
}

function discShading(radius: ScalarNode, angle: ScalarNode, timeS: ScalarNode, innerRadius: number, outerRadius: number) {
  const radialT = clamp(radius.sub(innerRadius).div(outerRadius - innerRadius), 0, 1);
  const radiusRatio = radius.div(innerRadius);

  const orbitalSpeed = float(2.4).div(radiusRatio.add(0.2));
  const swirlAngle = angle.sub(timeS.mul(orbitalSpeed));

  const spiralArms = mx_fractal_noise_float(
    vec3(swirlAngle.mul(2.6).sub(radialT.mul(9)), radialT.mul(2), timeS.mul(0.03)),
    4,
    2.0,
    0.55,
  )
    .mul(0.5)
    .add(0.6);

  const inflow = fract(radialT.mul(7).sub(timeS.mul(0.5)));
  const inflowStreaks = smoothstep(0.88, 1.0, inflow).add(smoothstep(0.12, 0.0, inflow));

  const filament = spiralArms.mul(float(1).add(inflowStreaks.mul(0.7)));

  const baseColor = mix(vec3(1.0, 0.96, 0.88), vec3(1.0, 0.4, 0.14), radialT);

  const side = cos(angle);
  const brightnessMul = mix(0.15, 2.6, smoothstep(-1, 1, side));

  const warmedUp = mix(baseColor, vec3(1.0, 0.98, 0.95), smoothstep(0.3, 1, side).mul(0.45));
  const cooledDown = mix(warmedUp, vec3(1.0, 0.28, 0.1), smoothstep(0.3, 1, side.negate()).mul(0.45));

  const innerGlow = float(1).sub(smoothstep(0, 0.2, radialT)).mul(2.4);

  const outerFade = float(1).sub(smoothstep(0.72, 1.0, radialT));

  return cooledDown.mul(brightnessMul).mul(filament).mul(float(1).add(innerGlow)).mul(outerFade).mul(3.2);
}

function dopplerBeaming(angle: ScalarNode) {
  const side = cos(angle);
  return mix(0.12, 2.8, smoothstep(-1, 1, side));
}

function makeEmissiveMaterial(): THREE.MeshStandardNodeMaterial {
  const m = new THREE.MeshStandardNodeMaterial({
    roughness: 1,
    metalness: 0,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
  });
  m.blending = THREE.AdditiveBlending;
  m.colorNode = vec3(0.0, 0.0, 0.0);
  return m;
}

const scratchAimer = new THREE.Object3D();

export function computeDiscsPivotQuaternion(cameraPosition: THREE.Vector3): THREE.Quaternion {
  scratchAimer.position.set(0, 0, 0);
  scratchAimer.up.set(0, 1, 0);
  scratchAimer.lookAt(cameraPosition);
  return scratchAimer.quaternion.clone();
}

export function createBlackHole(timeUniform: UniformNode) {
  const timeS = timeUniform as unknown as ScalarNode;
  const group = new THREE.Group();

  const horizonGeometry = new THREE.SphereGeometry(HORIZON_RADIUS, 48, 48);
  const horizonMaterial = new THREE.MeshStandardNodeMaterial({
    roughness: 1,
    metalness: 0,
  });
  const fresnel = clamp(float(1).sub(normalView.dot(positionViewDirection)), 0, 1);
  horizonMaterial.colorNode = vec3(0.0, 0.0, 0.0);
  horizonMaterial.emissiveNode = vec3(0.03, 0.03, 0.035).mul(fresnel.pow(6));
  const horizon = new THREE.Mesh(horizonGeometry, horizonMaterial);
  group.add(horizon);

  const discsPivot = new THREE.Group();
  discsPivot.name = "discsPivot";
  group.add(discsPivot);

  const mainInner = HORIZON_RADIUS * 0.98;
  const mainOuter = HORIZON_RADIUS * 3.2;
  const mainGeometry = new THREE.RingGeometry(mainInner, mainOuter, 160, 10);
  const mainMaterial = makeEmissiveMaterial();
  const mainRadius = length(positionLocal.xy);
  const mainAngle = atan(positionLocal.y, positionLocal.x);
  mainMaterial.emissiveNode = discShading(mainRadius, mainAngle, timeS, mainInner, mainOuter);
  const mainDisc = new THREE.Mesh(mainGeometry, mainMaterial);
  mainDisc.rotation.x = -Math.PI / 2 + 0.2;
  discsPivot.add(mainDisc);

  const photonInner = HORIZON_RADIUS * 1.0;
  const photonOuter = HORIZON_RADIUS * 1.09;
  const photonGeometry = new THREE.RingGeometry(photonInner, photonOuter, 192, 1);
  const photonMaterial = makeEmissiveMaterial();
  const photonRadius = length(positionLocal.xy);
  const photonT = clamp(photonRadius.sub(photonInner).div(photonOuter - photonInner), 0, 1);
  const photonProfile = float(1).sub(abs(photonT.sub(0.5)).mul(2));
  photonMaterial.emissiveNode = vec3(1.0, 0.95, 0.86).mul(photonProfile.pow(2.2)).mul(4.6);
  const photonRing = new THREE.Mesh(photonGeometry, photonMaterial);
  discsPivot.add(photonRing);

  const lensInner = HORIZON_RADIUS * 1.04;
  const lensOuter = HORIZON_RADIUS * 1.5;
  const lensGeometry = new THREE.RingGeometry(lensInner, lensOuter, 192, 4);
  const lensMaterial = makeEmissiveMaterial();
  const lensRadius = length(positionLocal.xy);
  const lensAngle = atan(positionLocal.y, positionLocal.x);
  const lensT = clamp(lensRadius.sub(lensInner).div(lensOuter - lensInner), 0, 1);
  const lensProfile = float(1).sub(abs(lensT.sub(0.28)).mul(2.4));
  const verticalEmphasis = mix(0.35, 1.0, abs(positionLocal.y.div(lensRadius)));
  const lensBase = mix(vec3(1.0, 0.86, 0.62), vec3(1.0, 0.49, 0.15), lensT);
  lensMaterial.emissiveNode = lensBase
    .mul(clamp(lensProfile, 0, 1).pow(1.4))
    .mul(verticalEmphasis)
    .mul(dopplerBeaming(lensAngle))
    .mul(2.6);
  const lensRing = new THREE.Mesh(lensGeometry, lensMaterial);
  discsPivot.add(lensRing);

  group.userData.hasAccretionRing = true;
  group.userData.hasHaloRing = true;
  group.userData.hasPhotonRing = true;
  group.userData.horizonMaterialType = horizonMaterial.constructor.name;

  return group;
}

type Props = {
  blackHoleRef: MutableRefObject<number>;
};

export function BlackHole({ blackHoleRef }: Props) {
  const groupRef = useRef<Group>(null);
  const timeU = useMemo(() => uniform(0), []);
  const elapsedRef = useRef(0);
  const blackHole = useMemo(() => createBlackHole(timeU), [timeU]);
  const discsPivot = useMemo(() => blackHole.getObjectByName("discsPivot") as Group, [blackHole]);
  const { camera } = useThree();

  useFrame((_, delta) => {
    timeU.value += delta;
    elapsedRef.current += delta;
    const growth = blackHoleGrowth(elapsedRef.current);
    if (groupRef.current) {
      groupRef.current.scale.setScalar(Math.max(growth, 0.0001));
    }
    blackHoleRef.current = Math.min(Math.max(growth, 0), 1);
    discsPivot.quaternion.copy(computeDiscsPivotQuaternion(camera.position));
  });

  return <primitive ref={groupRef} object={blackHole} scale={0.0001} />;
}
