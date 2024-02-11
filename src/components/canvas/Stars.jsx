import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

const Stars = () => {
  const pointsRef = useRef();
  const { viewport } = useThree();
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [windowHalfX, setWindowHalfX] = useState(window.innerWidth / 2);
  const [windowHalfY, setWindowHalfY] = useState(window.innerHeight / 2);

  useEffect(() => {
    const onDocumentMouseMove = (event) => {
      setMouseX((event.clientX - windowHalfX));
      setMouseY((event.clientY - windowHalfY));
    };

    const onWindowResize = () => {
      setWindowHalfX(window.innerWidth / 2);
      setWindowHalfY(window.innerHeight / 2);
    };

    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', onWindowResize);

    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [windowHalfX, windowHalfY]);

  useFrame(() => {
    if (pointsRef.current) {
      // Base rotation speed
      pointsRef.current.rotation.x += 0.001;
      pointsRef.current.rotation.y += 0.002;
  
      // Additional rotation based on mouse movement
      // Ensure there's a maximum effect that mouse movement can have on rotation speed
      const maxRotationSpeed = 0.0015; // Max speed cap for mouse influence
      const rotationInfluenceX = mouseY * 0.00005;
      const rotationInfluenceY = mouseX * 0.00005;
  
      // Apply capped rotation influenced by mouse movement
      pointsRef.current.rotation.x += Math.min(Math.max(rotationInfluenceX, -maxRotationSpeed), maxRotationSpeed);
      pointsRef.current.rotation.y += Math.min(Math.max(rotationInfluenceY, -maxRotationSpeed), maxRotationSpeed);
    }
  });

  const [positions, colors] = useMemo(() => {
    const positions = [];
    const colors = [];
    const color = new THREE.Color();

    for (let i = 0; i < 1300; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      // const z = THREE.MathUtils.randFloatSpread(2000);
      positions.push(x, y);

      const randomValue = Math.floor(Math.random() * 9);
      let colorValue;
      
      switch (randomValue) {
        case 0:
          colorValue = '#ff0066'; // Bright Pink
          break;
        case 1:
          colorValue = '#ff6600'; // Vibrant Orange
          break;
        case 2:
          colorValue = '#ffcc00'; // Intense Yellow
          break;
        case 3:
          colorValue = '#00cc00'; // Electric Green
          break;
        case 4:
          colorValue = '#0099ff'; // Brilliant Blue
          break;
        case 5:
          colorValue = '#cc00cc'; // Radiant Purple
          break;
        case 6:
          colorValue = '#ff33cc'; // Hot Pink
          break;
        case 7:
          colorValue = '#00cccc'; // Cyan Blue
          break;
        case 8:
          colorValue = '#66ff33'; // Neon Green
          break;
        default:
          colorValue = '#b00b69'; // Default color
          break;
      }
      
      color.set(colorValue);
      colors.push(color.r, color.g, color.b);
    }

    return [new Float32Array(positions), new Float32Array(colors)];
  }, []);

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial size={2.3} sizeAttenuation transparent opacity={0.5} depthWrite={false} vertexColors />
    </Points>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto fixed inset-0 z-[-20]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
        {/* <EffectComposer resolutionScale={0.01}> // Reduces the resolution to half
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.1} intensity={0.5} />
        </EffectComposer> */}

      </Canvas>
    </div>
  );
};

export default StarsCanvas;
