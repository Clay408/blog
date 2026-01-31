'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ particleCount }: { particleCount: number }) {
  const ref = useRef<THREE.Points>(null);

  // Generate particle positions
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, [particleCount]);

  // Animate particles
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.02;
      ref.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        color="#3b82f6"
        opacity={0.6}
      />
    </Points>
  );
}

export function ParticleBackground() {
  const [particleCount, setParticleCount] = useState(5000);

  useEffect(() => {
    // Detect if mobile and reduce particle count for performance
    const isMobile = window.innerWidth < 768;
    setParticleCount(isMobile ? 2000 : 5000);

    // Update particle count on window resize
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setParticleCount(isMobile ? 2000 : 5000);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['#000000']} />
        <ParticleField particleCount={particleCount} />
      </Canvas>
    </div>
  );
}
