import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Crystal3DCanvasProps {
  colorHex?: number;
  freqHz?: number;
  onCrystalTouch?: () => void;
}

export const Crystal3DCanvas: React.FC<Crystal3DCanvasProps> = ({
  colorHex = 0xffd700,
  onCrystalTouch,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const cursorLightRef = useRef<THREE.SpotLight | null>(null);

  // Elastic Spring Physics State
  const scaleRef = useRef(1);
  const velocityRef = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4.6);

    // 2. WebGL Renderer with ACES Filmic Exposure
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.9;

    container.appendChild(renderer.domElement);

    // 3. GENERATE PROCEDURAL HDR STUDIO ENVIRONMENT MAP (Eliminates plastic look!)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileCubemapShader();

    const envScene = new THREE.Scene();
    // Studio softbox light panels
    const lightBox1 = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    lightBox1.position.set(5, 8, 5);
    lightBox1.lookAt(0, 0, 0);
    envScene.add(lightBox1);

    const lightBox2 = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.MeshBasicMaterial({ color: colorHex })
    );
    lightBox2.position.set(-6, -4, -3);
    lightBox2.lookAt(0, 0, 0);
    envScene.add(lightBox2);

    const lightBox3 = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 6),
      new THREE.MeshBasicMaterial({ color: 0x00ffff })
    );
    lightBox3.position.set(0, 8, -6);
    lightBox3.lookAt(0, 0, 0);
    envScene.add(lightBox3);

    const envMap = pmremGenerator.fromScene(envScene).texture;
    scene.environment = envMap;

    // 4. Faceted Diamond Octahedron Geometry
    const geometry = new THREE.OctahedronGeometry(1.35, 0);

    // 5. High-End Jewelry Diamond Glass Material (Refracts HDR env map)
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(colorHex),
      emissive: new THREE.Color(colorHex).multiplyScalar(0.2),
      metalness: 0.1,
      roughness: 0.0, // Zero roughness for sharp diamond facet reflections
      transmission: 0.96, // Pure crystal transparency
      ior: 2.42, // Exact Diamond Refractive Index!
      thickness: 2.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      specularIntensity: 5.0,
      specularColor: new THREE.Color(0xffffff),
      envMapIntensity: 2.5, // Strong studio environment reflections!
      transparent: true,
      opacity: 0.95,
      flatShading: true, // Flashing individual facets
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    // 6. Sharp Facet Contour Lattice Wireframe
    const wireGeo = new THREE.OctahedronGeometry(1.358, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mesh.add(wireMesh);

    // 7. Inner Gem Core Wireframe
    const innerGeo = new THREE.OctahedronGeometry(0.55, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.65,
      wireframe: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mesh.add(innerMesh);

    // 8. CURSOR-FOLLOWING INTERACTIVE SPOTLIGHT (손가락/마우스 커서를 따르는 빛)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const cursorSpotlight = new THREE.SpotLight(0xffffff, 6, 12, Math.PI / 4, 0.4, 1);
    cursorSpotlight.position.set(0, 0, 4);
    cursorSpotlight.target = mesh;
    cursorLightRef.current = cursorSpotlight;
    scene.add(cursorSpotlight);

    // 9. ANIMATION LOOP: Floating Levitation + Spring Physics + Cursor Tracking
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetMouse3D = { x: 0, y: 0 };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (meshRef.current) {
        // 🌌 Feature 1: Floating Zero-Gravity Levitation (Sine-Wave Bobbing)
        if (!isDragging) {
          meshRef.current.position.y = Math.sin(t * 1.8) * 0.12; // Floating up & down
          meshRef.current.rotation.y += 0.008;
          meshRef.current.rotation.x = Math.sin(t * 1.2) * 0.08;
        }

        // 🥎 Feature 3: Elastic Spring Physics (Jiggle bounce animation)
        const targetScale = 1.0;
        const stiffness = 0.15;
        const damping = 0.82;

        const force = (targetScale - scaleRef.current) * stiffness;
        velocityRef.current = (velocityRef.current + force) * damping;
        scaleRef.current += velocityRef.current;

        const s = scaleRef.current;
        meshRef.current.scale.set(s, s, s);
      }

      // 🔦 Feature 2: Cursor Light Following (Smooth interpolation towards mouse)
      if (cursorLightRef.current) {
        cursorLightRef.current.position.x += (targetMouse3D.x * 4 - cursorLightRef.current.position.x) * 0.1;
        cursorLightRef.current.position.y += (targetMouse3D.y * 4 - cursorLightRef.current.position.y) * 0.1;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 10. Touch & Pointer Interaction Handlers
    const updateMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      targetMouse3D.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      targetMouse3D.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      previousMousePosition = { x: clientX, y: clientY };

      // 🥎 Trigger Elastic Jiggle Bounce Impulse on Touch!
      scaleRef.current = 1.22; // Instant pop scale
      velocityRef.current = 0.08;

      if (onCrystalTouch) onCrystalTouch();
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      updateMousePos(e);
      if (!isDragging || !meshRef.current) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      meshRef.current.rotation.y += deltaX * 0.012;
      meshRef.current.rotation.x += deltaY * 0.012;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      if (isDragging) {
        // Elastic release bounce
        velocityRef.current = -0.06;
      }
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handlePointerDown);
    domEl.addEventListener('touchstart', handlePointerDown, { passive: true });

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('mousedown', handlePointerDown);
      domEl.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
      pmremGenerator.dispose();
      envMap.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Dynamic Color Updates
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.setHex(colorHex);
      materialRef.current.emissive.setHex(colorHex).multiplyScalar(0.2);
    }
  }, [colorHex]);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[360px] md:h-[440px] cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
    >
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-semibold text-amber-200/80 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 pointer-events-none shadow-lg select-none flex items-center gap-1.5">
        <span>💎</span> Touch & Drag to Feel Elastic Crystal Physics
      </div>
    </div>
  );
};
