import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMessageTexture } from "./useMessageTexture";

const PANEL_W = 2.65;
const PANEL_H = 3.75;
const COVER_ANGLES = [0, -Math.PI * 0.58, -Math.PI * 0.96];
const CAMERA_TARGETS = [
  { pos: [1.35, 0.12, 5.4], look: [1.32, 0, 0] },
  { pos: [0.55, 0.2, 5.6], look: [0.35, 0, 0] },
  { pos: [0, 0.15, 6.2], look: [0, 0, 0] },
];

function configureTexture(texture) {
  if (!texture) return texture;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function CardPage({ position, map, z = 0 }) {
  return (
    <mesh position={[position[0], position[1], z]}>
      <planeGeometry args={[PANEL_W, PANEL_H]} />
      <meshStandardMaterial
        map={map}
        roughness={0.62}
        metalness={0.04}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

function FrontCover({ coverMap, insideLeftMap, openAngle }) {
  const hingeRef = useRef();
  const currentAngle = useRef(0);

  useFrame(() => {
    if (!hingeRef.current) return;
    currentAngle.current = THREE.MathUtils.lerp(
      currentAngle.current,
      openAngle,
      0.09
    );
    hingeRef.current.rotation.y = currentAngle.current;
  });

  return (
    <group ref={hingeRef} position={[0, 0, 0.02]}>
      <group position={[PANEL_W / 2, 0, 0]}>
        <mesh>
          <planeGeometry args={[PANEL_W, PANEL_H]} />
          <meshStandardMaterial
            map={coverMap}
            roughness={0.5}
            metalness={0.06}
            side={THREE.FrontSide}
          />
        </mesh>
        <mesh rotation={[0, Math.PI, 0]} position={[0, 0, -0.001]}>
          <planeGeometry args={[PANEL_W, PANEL_H]} />
          <meshStandardMaterial
            map={insideLeftMap}
            roughness={0.55}
            metalness={0.03}
            side={THREE.FrontSide}
          />
        </mesh>
      </group>
    </group>
  );
}

function CardBook({ step, images, content, displayName }) {
  const coverAngle = COVER_ANGLES[step] ?? 0;
  const messageTexture = useMessageTexture(content, displayName);
  const controlsRef = useRef();

  const [coverMap, insideLeftMap, insideRightMap] = useTexture([
    images.cover,
    images.insideLeft,
    images.insideRight,
  ]);

  useEffect(() => {
    configureTexture(coverMap);
    configureTexture(insideLeftMap);
    configureTexture(insideRightMap);
  }, [coverMap, insideLeftMap, insideRightMap]);

  const lookAtVec = useRef(new THREE.Vector3(...CAMERA_TARGETS[0].look));
  const desiredPos = useRef(new THREE.Vector3(...CAMERA_TARGETS[0].pos));

  useFrame((state) => {
    const cam = state.camera;
    const target = CAMERA_TARGETS[step] ?? CAMERA_TARGETS[0];
    desiredPos.current.set(...target.pos);
    lookAtVec.current.set(...target.look);
    cam.position.lerp(desiredPos.current, 0.06);
    cam.lookAt(lookAtVec.current);

    if (controlsRef.current) {
      controlsRef.current.target.lerp(lookAtVec.current, 0.06);
      controlsRef.current.update();
    }
  });

  return (
    <>
      <group position={[0, 0, 0]}>
        <CardPage
          position={[-PANEL_W / 2, 0, 0]}
          map={insideLeftMap}
          z={0}
        />
        <CardPage
          position={[PANEL_W / 2, 0, 0]}
          map={insideRightMap}
          z={0}
        />
        <mesh position={[PANEL_W / 2, 0, 0.012]}>
          <planeGeometry args={[PANEL_W * 0.86, PANEL_H * 0.8]} />
          <meshBasicMaterial
            map={messageTexture}
            transparent
            opacity={step >= 2 ? 1 : 0}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[0, 0, -0.008]}>
          <boxGeometry args={[0.05, PANEL_H * 0.98, 0.03]} />
          <meshStandardMaterial color="#ddd5cc" roughness={0.8} />
        </mesh>
        <FrontCover
          coverMap={coverMap}
          insideLeftMap={insideLeftMap}
          openAngle={coverAngle}
        />
      </group>
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={4.5}
        maxDistance={8.5}
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 1.95}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

export default function GreetingCardScene({ step, images, content, displayName }) {
  return (
    <Canvas
      className="interactive-card__canvas"
      camera={{ position: [1.35, 0.12, 5.4], fov: 40, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
      dpr={[1, 2]}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(0x000000, 0);
        scene.background = null;
      }}
    >
      <ambientLight intensity={1.05} />
      <directionalLight position={[5, 8, 6]} intensity={1.05} />
      <directionalLight position={[-4, 3, -3]} intensity={0.45} />
      <directionalLight position={[0, -2, 5]} intensity={0.2} />
      <pointLight position={[0, 2, 4]} intensity={0.3} color="#fff8f0" />
      <CardBook
        step={step}
        images={images}
        content={content}
        displayName={displayName}
      />
    </Canvas>
  );
}
