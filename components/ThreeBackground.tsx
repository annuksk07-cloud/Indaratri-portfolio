'use client';

import { useEffect, useRef } from 'react';
import type * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let cleanup: () => void;

    import('three').then((THREE) => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current?.appendChild(renderer.domElement);

      const objects: any[] = [];
      const geometry = new THREE.IcosahedronGeometry(1, 0);
      
      const colors = [0x7C3AED, 0xEC4899, 0xF59E0B]; // purple, pink, amber
      
      for (let i = 0; i < 80; i++) {
        const material = new THREE.MeshBasicMaterial({
          color: colors[Math.floor(Math.random() * colors.length)],
          wireframe: true,
          transparent: true,
          opacity: Math.random() * 0.3 + 0.1,
        });

        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 40;
        mesh.position.y = (Math.random() - 0.5) * 40;
        mesh.position.z = (Math.random() - 0.5) * 20 - 10;
        
        const scale = Math.random() * 0.35 + 0.15; // 0.15 to 0.5
        mesh.scale.set(scale, scale, scale);
        
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        
        // Store random rotation speeds
        mesh.userData = {
          rx: (Math.random() - 0.5) * 0.01,
          ry: (Math.random() - 0.5) * 0.01,
        };
        
        scene.add(mesh);
        objects.push(mesh);
      }

      camera.position.z = 15;

      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;

      const onDocumentMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - windowHalfX) * 0.001;
        mouseY = (event.clientY - windowHalfY) * 0.001;
      };

      document.addEventListener('mousemove', onDocumentMouseMove);

      let animationFrameId: number;

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        targetX = mouseX * 2;
        targetY = mouseY * 2;

        scene.rotation.x += 0.05 * (targetY - scene.rotation.x);
        scene.rotation.y += 0.05 * (targetX - scene.rotation.y);

        objects.forEach((obj) => {
          obj.rotation.x += obj.userData.rx;
          obj.rotation.y += obj.userData.ry;
        });

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      cleanup = () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousemove', onDocumentMouseMove);
        cancelAnimationFrame(animationFrameId);
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
        geometry.dispose();
      };
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[-1] pointer-events-none opacity-60"
    />
  );
}
