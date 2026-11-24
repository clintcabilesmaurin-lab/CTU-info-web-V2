import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power"
      });
    } catch {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 0, 7.4);

    const sculpture = new THREE.Group();
    scene.add(sculpture);

    const ambient = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambient);

    const keyLight = new THREE.PointLight(0xf4bd55, 42, 18);
    keyLight.position.set(3, 3, 4);
    scene.add(keyLight);

    const greenLight = new THREE.PointLight(0x3b9a72, 22, 16);
    greenLight.position.set(-4, -2, 2);
    scene.add(greenLight);

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(1.18, 48, 48),
      new THREE.MeshPhysicalMaterial({
        color: 0x1d5a45,
        metalness: 0.58,
        roughness: 0.28,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
        transparent: true,
        opacity: 0.82
      })
    );
    sculpture.add(core);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xe7b957,
      transparent: true,
      opacity: 0.72
    });

    const ringOne = new THREE.Mesh(new THREE.TorusGeometry(1.82, 0.012, 8, 180), ringMaterial);
    ringOne.rotation.set(0.8, 0.2, 0.45);
    sculpture.add(ringOne);

    const ringTwo = new THREE.Mesh(
      new THREE.TorusGeometry(2.18, 0.006, 8, 180),
      new THREE.MeshBasicMaterial({ color: 0xdce9d9, transparent: true, opacity: 0.34 })
    );
    ringTwo.rotation.set(1.12, -0.62, -0.35);
    sculpture.add(ringTwo);

    const ringThree = new THREE.Mesh(
      new THREE.TorusGeometry(1.48, 0.008, 8, 160),
      new THREE.MeshBasicMaterial({ color: 0xc94c32, transparent: true, opacity: 0.62 })
    );
    ringThree.rotation.set(-0.35, 0.8, 1.2);
    sculpture.add(ringThree);

    const particleCount = 720;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.25 + Math.random() * 1.05;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xf2d18b,
        size: 0.018,
        transparent: true,
        opacity: 0.72,
        sizeAttenuation: true
      })
    );
    sculpture.add(particles);

    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const clock = new THREE.Clock();

    const render = () => {
      frame = 0;
      sculpture.rotation.y = reducedMotion ? 0.18 : clock.elapsedTime * 0.085;
      sculpture.rotation.x = reducedMotion ? -0.08 : Math.sin(clock.elapsedTime * 0.18) * 0.09;
      ringOne.rotation.z = 0.45 + (reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.12) * 0.08);
      renderer.render(scene, camera);
      if (!reducedMotion && isVisible && isPageVisible) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const start = () => {
      if (!frame && isVisible && isPageVisible && !reducedMotion) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    observer.observe(host);

    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) start();
      else if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const resizeObserver = new ResizeObserver(() => {
      const nextWidth = Math.max(host.clientWidth, 1);
      const nextHeight = Math.max(host.clientHeight, 1);
      renderer.setSize(nextWidth, nextHeight, false);
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    });
    resizeObserver.observe(host);

    renderer.render(scene, camera);
    start();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      sculpture.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="three-scene" aria-hidden="true" />;
}
