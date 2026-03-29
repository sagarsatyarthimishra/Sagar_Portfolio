'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function AnimatedScene() {
  const carRef = useRef();
  const particlesRef = useRef();
  const ringRef = useRef();
  const cloudRef = useRef();
  const cubeRef = useRef();
  const [codeText, setCodeText] = useState('const passion = "code"');
  const codePhrases = [
    'const passion = "code"',
    'const energy = "build"',
    'const vision = "future"',
    'const flow = "creative"',
  ];
  const phraseRef = useRef(0);
  const blinkRef = useRef(false);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (t % 2.0 < 0.02) {
      if (!blinkRef.current) {
        blinkRef.current = true;
        phraseRef.current = (phraseRef.current + 1) % codePhrases.length;
        setCodeText(codePhrases[phraseRef.current]);
      }
    } else {
      blinkRef.current = false;
    }

    if (carRef.current) {
      carRef.current.position.x = -14 + Math.sin(t * 0.52) * 14;
      carRef.current.rotation.y = Math.sin(t * 0.52) * 0.12;
      carRef.current.rotation.z = Math.sin(t * 0.38) * 0.02;
    }

    if (cubeRef.current) {
      cubeRef.current.rotation.x = t * 0.25;
      cubeRef.current.rotation.y = t * 0.24;
      cubeRef.current.position.y = 1 + Math.sin(t * 0.2) * 0.4;
    }

    if (ringRef.current) {
      ringRef.current.rotation.y = t * 0.15;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.14) * 0.05;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.04;
      particlesRef.current.position.y = Math.sin(t * 0.27) * 1.2;
    }

    if (cloudRef.current) {
      cloudRef.current.rotation.y = 0.09 * t;
      cloudRef.current.position.x = -9 + Math.sin(t * 0.5) * 2.4;
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 10, 8]} intensity={0.8} />

      {/* Cloud Group */}
      <group ref={cloudRef} position={[-9, 4, -8]}>
        {[...Array(28)].map((_, i) => (
          <mesh key={i} position={[Math.random() * 20 - 10, Math.random() * 6, Math.random() * 15 - 7]}>
            <sphereGeometry args={[Math.random() * 1.6 + 0.8, 16, 16]} />
            <meshStandardMaterial color={0xd9f0ff} transparent opacity={0.78} roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Animated Car (BMW-inspired style) */}
      <group ref={carRef} position={[-14, -3.2, 0]}>
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[5.7, 1.3, 2.4]} />
          <meshStandardMaterial color={0x0f1621} metalness={0.92} roughness={0.15} />
        </mesh>

        <mesh position={[0, 1.45, -0.1]}> 
          <boxGeometry args={[4.1, 0.6, 1.8]} />
          <meshStandardMaterial color={0x11477c} metalness={0.88} roughness={0.22} />
        </mesh>

        <mesh position={[0, 1.0, 1.05]}> 
          <boxGeometry args={[2.4, 0.3, 0.25]} />
          <meshStandardMaterial color={0x97d9ff} transparent opacity={0.6} />
        </mesh>

        <mesh position={[0, 1.0, -1.05]}> 
          <boxGeometry args={[2.4, 0.3, 0.25]} />
          <meshStandardMaterial color={0x97d9ff} transparent opacity={0.6} />
        </mesh>

        {[-2.2, 2.2].map((x) =>
          [-1.05, 1.05].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, -0.5, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.55, 0.55, 0.9, 18]} />
              <meshStandardMaterial color={0x0d1724} metalness={0.95} roughness={0.18} />
            </mesh>
          ))
        )}
      </group>

      {/* Particle Field */}
      <ParticlesField ref={particlesRef} />

      {/* Animated Ring */}
      <mesh ref={ringRef} position={[0, -1.2, -5]} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[7.5, 0.22, 16, 96]} />
        <meshStandardMaterial color={0x4ec4ff} opacity={0.38} transparent metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rotating cube */}
      <mesh ref={cubeRef} position={[9.8, 1.2, -2]}>
        <boxGeometry args={[2.3, 2.3, 2.3]} />
        <meshStandardMaterial color={0x4ad2ff} metalness={0.74} roughness={0.25} emissive={0x0a63a9} emissiveIntensity={0.7} />
      </mesh>

      {/* 3D Code Text */}
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.35}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.45}
          color="#63d8ff"
          anchorX="center"
          anchorY="middle"
          maxWidth={20}
          font="https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fQrQLn49io6Z9l.woff"
        >
          {codeText}
        </Text>
      </Float>
    </>
  );
}

function ParticlesField(props) {
  const ref = useRef();

  const particlesGeometry = useRef();
  const particlesMaterial = useRef();

  const positions = useRef(null);
  const colors = useRef(null);

  if (!positions.current) {
    positions.current = new Float32Array(450 * 3);
    colors.current = new Float32Array(450 * 3);

    for (let i = 0; i < 450; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 100;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 100;

      colors.current[i * 3] = 0.22 + Math.random() * 0.75;
      colors.current[i * 3 + 1] = 0.4 + Math.random() * 0.55;
      colors.current[i * 3 + 2] = 1;
    }
  }

  return (
    <points ref={(node) => {
      ref.current = node;
      if (props && props.ref) props.ref.current = node;
    }}>
      <bufferGeometry ref={particlesGeometry}>
        <bufferAttribute attach="attributes-position" count={450} array={positions.current} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={450} array={colors.current} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial ref={particlesMaterial} size={0.22} vertexColors transparent opacity={0.92} />
    </points>
  );
}

export default function Canvas3D() {
  return (
    <Canvas
      id="canvas"
      camera={{ position: [0, 3, 25], fov: 45 }}
      style={{ position: 'fixed', inset: 0, zIndex: -9999, pointerEvents: 'none' }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <AnimatedScene />
    </Canvas>
  );
}
