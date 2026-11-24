import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;

    let renderer;
    let frame = 0;
    let animationId = 0;
    let disposed = false;

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      host.dataset.fallback = "true";
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setSize(host.clientWidth || 520, host.clientHeight || 520);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    const group = new THREE.Group();
    scene.add(group);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.08, 2),
      new THREE.MeshStandardMaterial({
        color: 0xc5a15c,
        metalness: 0.52,
        roughness: 0.32,
        wireframe: true,
        transparent: true,
        opacity: 0.72
      })
    );
    group.add(core);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xe3c98c,
      transparent: true,
      opacity: 0.62,
      side: THREE.DoubleSide
    });

    [2.05, 2.42, 2.78].forEach((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, index === 1 ? 0.012 : 0.008, 8, 160),
        ringMaterial.clone()
      );
      ring.rotation.x = Math.PI * (0.28 + index * 0.13);
      ring.rotation.y = Math.PI * (0.12 + index * 0.16);
      group.add(ring);
    });

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.1 + Math.random() * 1.45;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.42;
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({ color: 0xf0dba8, size: 0.025, transparent: true, opacity: 0.8 })
    );
    group.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const keyLight = new THREE.PointLight(0xe9c879, 18, 20);
    keyLight.position.set(3, 3, 5);
    scene.add(keyLight);

    const resize = () => {
      if (!host.clientWidth || !host.clientHeight) return;
      renderer.setSize(host.clientWidth, host.clientHeight);
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const visibleObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !motionQuery.matches && !animationId) animate();
      if (!entry.isIntersecting && animationId) {
        cancelAnimationFrame(animationId);
        animationId = 0;
      }
    });
    visibleObserver.observe(host);

    function animate() {
      if (disposed || motionQuery.matches) return;
      animationId = requestAnimationFrame(animate);
      frame += 0.003;
      group.rotation.y = frame * 0.38;
      group.rotation.x = Math.sin(frame * 0.6) * 0.12;
      particles.rotation.y = -frame * 0.24;
      renderer.render(scene, camera);
    }

    if (!motionQuery.matches) animate();
    else renderer.render(scene, camera);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      observer.disconnect();
      visibleObserver.disconnect();
      group.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="three-scene" ref={mountRef} data-testid="three-scene" aria-hidden="true" />;
}
