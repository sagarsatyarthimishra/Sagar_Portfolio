'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ThreeScene() {
  const canvasRef = useRef(null);
  const sceneRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.set(0, 3, 25);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 8);
    scene.add(ambient, dirLight);

    const cloudGroup = new THREE.Group();
    for (let i = 0; i < 28; i++) {
      const geo = new THREE.SphereGeometry(THREE.MathUtils.randFloat(0.8, 2.4), 16, 16);
      const mat = new THREE.MeshStandardMaterial({ color: 0xd9f0ff, transparent: true, opacity: 0.78, roughness: 0.4 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(THREE.MathUtils.randFloatSpread(18), THREE.MathUtils.randFloat(1.8, 7.2), THREE.MathUtils.randFloatSpread(13));
      mesh.scale.setScalar(THREE.MathUtils.randFloat(0.8, 1.8));
      cloudGroup.add(mesh);
    }
    scene.add(cloudGroup);

    const car = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(5.5, 2, 2.2), new THREE.MeshStandardMaterial({ color: 0x4fb8ff, metalness: 0.75, roughness: 0.2 }));
    body.position.y = 0.5;
    car.add(body);
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x1f2c3a, metalness: 0.85, roughness: 0.15 });
    for (let x of [-2, 2]) {
      for (let z of [-1, 1]) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.9, 16), wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(x, -0.4, z);
        car.add(wheel);
      }
    }
    car.position.set(-14, -3.2, 0);
    scene.add(car);

    const pointsCount = 450;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(pointsCount * 3);
    const colArray = new Float32Array(pointsCount * 3);
    for (let i = 0; i < pointsCount; i++) {
      posArray[i * 3 + 0] = THREE.MathUtils.randFloatSpread(70);
      posArray[i * 3 + 1] = THREE.MathUtils.randFloatSpread(40);
      posArray[i * 3 + 2] = THREE.MathUtils.randFloatSpread(80);

      colArray[i * 3 + 0] = 0.22 + Math.random() * 0.75;
      colArray[i * 3 + 1] = 0.4 + Math.random() * 0.55;
      colArray[i * 3 + 2] = 1;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colArray, 3));

    const pointsMaterial = new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.92 });
    const particles = new THREE.Points(particlesGeometry, pointsMaterial);
    scene.add(particles);

    const codeRing = new THREE.Mesh(
      new THREE.TorusGeometry(7.5, 0.22, 16, 96),
      new THREE.MeshStandardMaterial({ color: 0x4ec4ff, opacity: 0.38, transparent: true, metalness: 0.8, roughness: 0.2 })
    );
    codeRing.rotation.x = Math.PI / 2.4;
    codeRing.position.set(0, -1.2, -5);
    scene.add(codeRing);

    const wire = new THREE.LineLoop(
      new THREE.TorusGeometry(9.4, 0.04, 8, 160),
      new THREE.LineBasicMaterial({ color: 0x7acaff, transparent: true, opacity: 0.45 })
    );
    wire.rotation.x = Math.PI / 2;
    wire.position.y = -1.2;
    scene.add(wire);

    sceneRef.current = { renderer, scene, camera, cloudGroup, car, particles, codeRing, wire };

    const handleResize = () => {
      const { renderer, camera } = sceneRef.current;
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const handleMouse = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      car.position.y = THREE.MathUtils.lerp(car.position.y, -2 + y * 1.4, 0.07);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, x * 4.5, 0.07);
      camera.lookAt(0, 0, 0);
    };

    document.body.addEventListener('mousemove', handleMouse);

    let frame = 0;
    const tick = () => {
      frame += 0.01;
      const { renderer, scene, camera, cloudGroup, particles, car } = sceneRef.current;
      cloudGroup.rotation.y = 0.15 * frame;
      cloudGroup.position.x = -9 + Math.sin(frame * 0.9) * 3.3;
      particles.rotation.y = frame * 0.07;
      particles.position.y = Math.sin(frame * 0.57) * 1.8;
      car.position.x = -14 + (Math.sin(frame * 0.95) + 1) * 16;
      car.rotation.y = Math.sin(frame * 0.95) * 0.15;
      codeRing.rotation.y = frame * 0.3;
      codeRing.rotation.x = Math.PI / 2 + Math.sin(frame * 0.26) * 0.08;
      wire.rotation.z = frame * 0.23;

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const panels = document.querySelectorAll('.panel, .hero-content');
    panels.forEach((panel) => {
      gsap.from(panel, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: panel,
          start: 'top 75%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.removeEventListener('mousemove', handleMouse);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      renderer.dispose();
      particlesGeometry.dispose();
      body.geometry.dispose();
      body.material.dispose();
      codeRing.geometry.dispose();
      codeRing.material.dispose();
      wire.geometry.dispose();
      wire.material.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="canvas" />;
}
