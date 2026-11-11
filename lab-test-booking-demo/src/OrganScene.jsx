
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  ContactShadows,
  Sparkles,
  OrbitControls
} from "@react-three/drei";

/* =====================================
   ORGAN SHAPE CREATOR
===================================== */

function OrganicShape({ shape, color, position = [0, 0, 0], scale = 1 }) {
  const geometry = useMemo(() => {
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.42,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.12,
      bevelThickness: 0.12,
      curveSegments: 32
    });
  }, [shape]);

  return (
    <mesh
      geometry={geometry}
      position={position}
      scale={scale}
      castShadow
      receiveShadow
    >
      <meshPhysicalMaterial
        color={color}
        roughness={0.3}
        metalness={0.02}
        clearcoat={0.75}
        clearcoatRoughness={0.2}
      />
    </mesh>
  );
}

/* =====================================
   LIVER
===================================== */

function createLiverShape() {
  const s = new THREE.Shape();

  s.moveTo(-1.35, 0.45);
  s.bezierCurveTo(-1.45, 1.15, -0.65, 1.35, 0.1, 1.05);
  s.bezierCurveTo(0.8, 1.35, 1.45, 0.95, 1.45, 0.35);
  s.bezierCurveTo(1.55, -0.2, 0.9, -0.55, 0.45, -0.5);
  s.bezierCurveTo(0.1, -0.55, -0.1, -1.1, -0.65, -1.0);
  s.bezierCurveTo(-1.3, -0.85, -1.65, -0.15, -1.35, 0.45);

  return s;
}

function Liver() {
  const shape = useMemo(createLiverShape, []);

  return (
    <group rotation={[0, 0, -0.08]}>
      <OrganicShape shape={shape} color="#a92335" scale={0.85} />

      <mesh position={[-0.3, -0.7, 0.5]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.11, 0.45, 8, 16]} />
        <meshStandardMaterial color="#6a9d37" roughness={0.4} />
      </mesh>

      <mesh position={[0.1, 0.15, 0.53]} scale={[0.3, 0.08, 0.08]}>
        <sphereGeometry args={[1, 32, 24]} />
        <meshStandardMaterial color="#f28b83" />
      </mesh>
    </group>
  );
}

/* =====================================
   KIDNEY
===================================== */

function createKidneyShape() {
  const s = new THREE.Shape();

  s.moveTo(0, 1);
  s.bezierCurveTo(-0.95, 1.2, -1.2, 0.25, -0.9, -0.55);
  s.bezierCurveTo(-0.65, -1.2, 0.3, -1.15, 0.65, -0.55);
  s.bezierCurveTo(0.9, -0.1, 0.3, 0.1, 0.3, 0.4);
  s.bezierCurveTo(0.35, 0.8, 0.65, 0.95, 0, 1);

  return s;
}

function KidneyOne({ x = 0 }) {
  const shape = useMemo(createKidneyShape, []);

  return (
    <group position={[x, 0, 0]} rotation={[0, 0, x < 0 ? 0.2 : -0.2]}>
      <OrganicShape
        shape={shape}
        color="#a92d55"
        scale={0.65}
      />

      <mesh position={[x < 0 ? 0.35 : -0.35, -0.05, 0.48]}>
        <sphereGeometry args={[0.17, 32, 24]} />
        <meshStandardMaterial color="#f5d5c8" roughness={0.4} />
      </mesh>

      <mesh
        position={[x < 0 ? 0.25 : -0.25, -0.5, 0.45]}
        rotation={[0, 0, 0.1]}
      >
        <cylinderGeometry args={[0.045, 0.06, 0.75, 20]} />
        <meshStandardMaterial color="#e8c35f" />
      </mesh>
    </group>
  );
}

function Kidney() {
  return (
    <group>
      <KidneyOne x={-0.55} />
      <KidneyOne x={0.55} />
    </group>
  );
}

/* =====================================
   THYROID
===================================== */

function createThyroidLobe() {
  const s = new THREE.Shape();

  s.moveTo(0, 0.9);
  s.bezierCurveTo(-0.65, 1.1, -0.85, 0.4, -0.7, -0.2);
  s.bezierCurveTo(-0.65, -0.85, -0.15, -1, 0.15, -0.55);
  s.bezierCurveTo(0.35, -0.2, 0.3, 0.4, 0, 0.9);

  return s;
}

function Thyroid() {
  const shape = useMemo(createThyroidLobe, []);

  return (
    <group>
      <OrganicShape
        shape={shape}
        color="#ef785f"
        position={[-0.5, 0, 0]}
        scale={0.72}
      />

      <OrganicShape
        shape={shape}
        color="#f28c72"
        position={[0.5, 0, 0]}
        scale={[-0.72, 0.72, 1]}
      />

      <mesh position={[0, -0.1, 0.48]} scale={[0.55, 0.2, 0.15]}>
        <sphereGeometry args={[1, 32, 24]} />
        <meshStandardMaterial color="#f8a18a" roughness={0.3} />
      </mesh>

      <mesh position={[0, -0.85, -0.05]}>
        <cylinderGeometry args={[0.12, 0.12, 0.65, 24]} />
        <meshStandardMaterial color="#b6d3df" metalness={0.2} />
      </mesh>
    </group>
  );
}

/* =====================================
   HEART
===================================== */

function createHeartShape() {
  const s = new THREE.Shape();

  s.moveTo(0, -1);
  s.bezierCurveTo(-0.45, -0.65, -1.25, -0.1, -1.05, 0.65);
  s.bezierCurveTo(-0.85, 1.35, -0.15, 1.25, 0, 0.8);
  s.bezierCurveTo(0.35, 1.4, 1.05, 1.25, 1.12, 0.55);
  s.bezierCurveTo(1.2, -0.1, 0.45, -0.7, 0, -1);

  return s;
}

function Heart() {
  const shape = useMemo(createHeartShape, []);

  return (
    <group rotation={[0, 0, -0.08]}>
      <OrganicShape shape={shape} color="#d92f4b" scale={0.75} />

      <mesh position={[-0.35, 1.0, 0.35]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.12, 0.16, 0.75, 24]} />
        <meshStandardMaterial color="#c93650" />
      </mesh>

      <mesh position={[0.35, 1.0, 0.35]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.1, 0.15, 0.8, 24]} />
        <meshStandardMaterial color="#4388c5" />
      </mesh>

      <mesh position={[0, 0.25, 0.62]} scale={[0.38, 0.45, 0.08]}>
        <sphereGeometry args={[1, 32, 24]} />
        <meshStandardMaterial color="#ff7884" roughness={0.3} />
      </mesh>
    </group>
  );
}

/* =====================================
   LUNGS
===================================== */

function createLungShape() {
  const s = new THREE.Shape();

  s.moveTo(0, 1.1);
  s.bezierCurveTo(-0.65, 0.9, -1.0, 0.25, -0.9, -0.4);
  s.bezierCurveTo(-0.8, -1.1, -0.15, -1.25, 0.05, -0.65);
  s.bezierCurveTo(0.25, -0.2, 0.25, 0.5, 0, 1.1);

  return s;
}

function Lungs() {
  const shape = useMemo(createLungShape, []);

  return (
    <group>
      <OrganicShape
        shape={shape}
        color="#ed8995"
        position={[-0.55, 0, 0]}
        scale={0.7}
      />

      <OrganicShape
        shape={shape}
        color="#f19aa2"
        position={[0.55, 0, 0]}
        scale={[-0.7, 0.7, 1]}
      />

      <mesh position={[0, 0.95, 0.45]}>
        <cylinderGeometry args={[0.12, 0.12, 0.9, 24]} />
        <meshStandardMaterial color="#e7f1f5" />
      </mesh>

      <mesh position={[-0.23, 0.45, 0.45]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.07, 0.09, 0.8, 20]} />
        <meshStandardMaterial color="#e7f1f5" />
      </mesh>

      <mesh position={[0.23, 0.45, 0.45]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.07, 0.09, 0.8, 20]} />
        <meshStandardMaterial color="#e7f1f5" />
      </mesh>
    </group>
  );
}

/* =====================================
   BONE
===================================== */

function Bone() {
  return (
    <group rotation={[0, 0, -0.3]} scale={1.15}>
      <mesh castShadow>
        <capsuleGeometry args={[0.19, 1.5, 12, 32]} />
        <meshPhysicalMaterial
          color="#f4dfb9"
          roughness={0.25}
          clearcoat={0.8}
        />
      </mesh>

      {[-0.95, 0.95].map((y) => (
        <group key={y} position={[0, y, 0]}>
          <mesh position={[-0.16, 0, 0]} scale={[0.4, 0.34, 0.32]}>
            <sphereGeometry args={[1, 40, 32]} />
            <meshPhysicalMaterial color="#fff0d4" roughness={0.25} />
          </mesh>

          <mesh position={[0.16, 0.05, 0]} scale={[0.35, 0.35, 0.33]}>
            <sphereGeometry args={[1, 40, 32]} />
            <meshPhysicalMaterial color="#f0d5a9" roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* =====================================
   PREGNANCY
===================================== */

function Pregnancy() {
  return (
    <group>
      <mesh scale={[0.85, 1.05, 0.42]} castShadow>
        <sphereGeometry args={[1, 48, 32]} />
        <meshPhysicalMaterial
          color="#e89baa"
          transparent
          opacity={0.65}
          roughness={0.25}
          clearcoat={0.7}
        />
      </mesh>

      <mesh position={[0.05, -0.12, 0.35]} scale={[0.36, 0.45, 0.3]}>
        <sphereGeometry args={[1, 40, 32]} />
        <meshStandardMaterial color="#f3b58f" roughness={0.35} />
      </mesh>

      <mesh position={[0.32, 0.24, 0.42]} scale={[0.2, 0.2, 0.2]}>
        <sphereGeometry args={[1, 32, 24]} />
        <meshStandardMaterial color="#f3b58f" />
      </mesh>

      <mesh position={[0.45, -0.35, 0.43]} rotation={[0, 0, -0.6]}>
        <capsuleGeometry args={[0.09, 0.42, 8, 16]} />
        <meshStandardMaterial color="#e9a77f" />
      </mesh>
    </group>
  );
}

/* =====================================
   CANCER CELLS
===================================== */

function Cancer() {
  return (
    <group>
      <mesh scale={[0.55, 0.55, 0.5]}>
        <sphereGeometry args={[1, 48, 32]} />
        <meshPhysicalMaterial color="#a92a69" roughness={0.3} clearcoat={0.7} />
      </mesh>

      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        const y = Math.sin(i * 2.4) * 0.6;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(a) * 0.67,
              y,
              Math.sin(a) * 0.55
            ]}
            scale={0.14 + (i % 3) * 0.025}
          >
            <sphereGeometry args={[1, 24, 20]} />
            <meshPhysicalMaterial
              color={i % 2 ? "#ee7aa9" : "#b72e78"}
              roughness={0.3}
              clearcoat={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* =====================================
   DIABETES / GLUCOSE METER
===================================== */

function Diabetes() {
  return (
    <group>
      <mesh position={[0, 0, 0]} scale={[0.7, 0.95, 0.22]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color="#244a79"
          roughness={0.2}
          metalness={0.25}
          clearcoat={0.8}
        />
      </mesh>

      <mesh position={[0, 0.3, 0.25]} scale={[0.5, 0.28, 0.04]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#a5f0e7"
          emissive="#36c9c4"
          emissiveIntensity={0.4}
        />
      </mesh>

      <mesh position={[0, -0.35, 0.25]} scale={[0.2, 0.07, 0.04]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#c5e5f3" />
      </mesh>

      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * 0.8) * 0.9,
            Math.sin(i * 0.8) * 0.9,
            Math.sin(i) * 0.2
          ]}
        >
          <sphereGeometry args={[0.07, 20, 16]} />
          <meshStandardMaterial
            color={i % 2 ? "#ff5874" : "#ffbd50"}
            emissive={i % 2 ? "#ff3050" : "#ff9d24"}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

/* =====================================
   ORGAN MODEL SELECTION
===================================== */

const models = {
  Diabetes,
  Liver,
  Thyroid,
  Kidney,
  Heart,
  Lungs,
  Bone,
  Pregnancy,
  Cancer
};

/* =====================================
   ROTATION ANIMATION
===================================== */

function AnimatedOrgan({ organ }) {
  const group = useRef();
  const Model = models[organ] || Liver;

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.22;
      group.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.035;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.22}>
      <group ref={group}>
        <Model />
      </group>
    </Float>
  );
}

/* =====================================
   MAIN 3D SCENE
===================================== */

export default function OrganScene({ organ }) {
  return (
    <div className="organ-canvas">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        dpr={[1, 1.7]}
        shadows
      >
        <ambientLight intensity={1.4} />

        <directionalLight
          position={[4, 5, 5]}
          intensity={2.4}
          castShadow
        />

        <pointLight
          position={[-3, 1, 3]}
          color="#35d9ff"
          intensity={2}
        />

        <pointLight
          position={[2, -2, 2]}
          color="#8a8dff"
          intensity={1.4}
        />

        <AnimatedOrgan organ={organ} />

        <Sparkles
          count={45}
          scale={4}
          size={2.5}
          speed={0.35}
          color="#49cfff"
        />

        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.25}
          scale={4}
          blur={2.5}
        />

        <Environment preset="studio" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.65}
        />
      </Canvas>
    </div>
  );
}
