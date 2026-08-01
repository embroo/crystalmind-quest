import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles } from 'lucide-react';

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
  const materialRef = useRef<THREE.MeshPhysicalMaterial | THREE.MeshStandardMaterial | null>(null);
  const cursorLightRef = useRef<THREE.SpotLight | null>(null);

  const [webglError, setWebglError] = useState(false);

  // Elastic Spring Physics State
  const scaleRef = useRef(1);
  const velocityRef = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;
    let pmremGenerator: THREE.PMREMGenerator | null = null;
    let envMap: THREE.Texture | null = null;

    try {
      const width = container.clientWidth || 320;
      const height = container.clientHeight || 320;

      // 1. Scene & Camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 0, 4.6);

      // 2. WebGL Renderer with Android / Samsung Internet WebGL safety
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'default' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.9;

      const domEl = renderer.domElement;

      // WebGL Context Lost Handler for Samsung Galaxy & Android Mali/Adreno GPUs
      const handleContextLost = (event: Event) => {
        event.preventDefault();
        console.warn('[Crystal3D] WebGL Context Lost on Android/Samsung GPU. Switching to 2D Fallback.');
        setWebglError(true);
      };
      domEl.addEventListener('webglcontextlost', handleContextLost, false);

      container.appendChild(domEl);

      // 3. GENERATE ENVIRONMENT MAP (Safe try/catch for mobile GPUs)
      let material: THREE.MeshPhysicalMaterial | THREE.MeshStandardMaterial;

      try {
        pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileCubemapShader();

        const envScene = new THREE.Scene();
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

        envMap = pmremGenerator.fromScene(envScene).texture;
        scene.environment = envMap;

        // High-End Physical Diamond Material
        material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(colorHex),
          emissive: new THREE.Color(colorHex).multiplyScalar(0.2),
          metalness: 0.1,
          roughness: 0.05,
          transmission: 0.9,
          ior: 2.0,
          thickness: 1.8,
          clearcoat: 1.0,
          clearcoatRoughness: 0.0,
          specularIntensity: 4.0,
          transparent: true,
          opacity: 0.95,
          flatShading: true,
        });
      } catch (e) {
        console.warn('[Crystal3D] PMREM/PhysicalMaterial fallback to StandardMaterial:', e);
        material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(colorHex),
          emissive: new THREE.Color(colorHex).multiplyScalar(0.3),
          roughness: 0.1,
          metalness: 0.6,
          flatShading: true,
        });
      }

      materialRef.current = material;

      // 4. Faceted Diamond Octahedron Geometry
      const geometry = new THREE.OctahedronGeometry(1.35, 0);
      const mesh = new THREE.Mesh(geometry, material);
      meshRef.current = mesh;
      scene.add(mesh);

      // 5. Wireframe Contour
      const wireGeo = new THREE.OctahedronGeometry(1.358, 0);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      mesh.add(wireMesh);

      // 6. Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const cursorSpotlight = new THREE.SpotLight(0xffffff, 6, 12, Math.PI / 4, 0.4, 1);
      cursorSpotlight.position.set(0, 0, 4);
      cursorSpotlight.target = mesh;
      cursorLightRef.current = cursorSpotlight;
      scene.add(cursorSpotlight);

      // 7. Animation Loop
      let clock = new THREE.Clock();
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };
      let targetMouse3D = { x: 0, y: 0 };

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        if (meshRef.current) {
          if (!isDragging) {
            meshRef.current.position.y = Math.sin(t * 1.8) * 0.12;
            meshRef.current.rotation.y += 0.008;
            meshRef.current.rotation.x = Math.sin(t * 1.2) * 0.08;
          }

          const targetScale = 1.0;
          const stiffness = 0.15;
          const damping = 0.82;

          const force = (targetScale - scaleRef.current) * stiffness;
          velocityRef.current = (velocityRef.current + force) * damping;
          scaleRef.current += velocityRef.current;

          const s = scaleRef.current;
          meshRef.current.scale.set(s, s, s);
        }

        if (cursorLightRef.current) {
          cursorLightRef.current.position.x += (targetMouse3D.x * 4 - cursorLightRef.current.position.x) * 0.1;
          cursorLightRef.current.position.y += (targetMouse3D.y * 4 - cursorLightRef.current.position.y) * 0.1;
        }

        if (renderer) {
          renderer.render(scene, camera);
        }
      };
      animate();

      // 8. Event Listeners
      const updateMousePos = (e: MouseEvent | TouchEvent) => {
        const rect = container.getBoundingClientRect();
        const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;

        targetMouse3D.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        targetMouse3D.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      };

      const handlePointerDown = (e: MouseEvent | TouchEvent) => {
        isDragging = true;
        const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;
        previousMousePosition = { x: clientX, y: clientY };

        scaleRef.current = 1.2;
        velocityRef.current = 0.08;

        if (onCrystalTouch) onCrystalTouch();
      };

      const handlePointerMove = (e: MouseEvent | TouchEvent) => {
        updateMousePos(e);
        if (!isDragging || !meshRef.current) return;

        const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;
        const deltaX = clientX - previousMousePosition.x;
        const deltaY = clientY - previousMousePosition.y;

        meshRef.current.rotation.y += deltaX * 0.012;
        meshRef.current.rotation.x += deltaY * 0.012;
        previousMousePosition = { x: clientX, y: clientY };
      };

      const handlePointerUp = () => {
        if (isDragging) {
          velocityRef.current = -0.06;
        }
        isDragging = false;
      };

      domEl.addEventListener('mousedown', handlePointerDown);
      domEl.addEventListener('touchstart', handlePointerDown, { passive: true });

      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('touchmove', handlePointerMove, { passive: true });
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchend', handlePointerUp);

      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || 320;
        const h = container.clientHeight || 320;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animationFrameId);
        domEl.removeEventListener('webglcontextlost', handleContextLost);
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
        if (pmremGenerator) pmremGenerator.dispose();
        if (envMap) envMap.dispose();
        geometry.dispose();
        material.dispose();
        if (renderer) renderer.dispose();
      };
    } catch (err) {
      console.error('[Crystal3D] WebGL Failed:', err);
      setWebglError(true);
    }
  }, []);

  // Dynamic Color Updates
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.setHex(colorHex);
      if ('emissive' in materialRef.current) {
        materialRef.current.emissive.setHex(colorHex).multiplyScalar(0.2);
      }
    }
  }, [colorHex]);

  if (webglError) {
    return (
      <div
        onClick={onCrystalTouch}
        className="relative w-full h-[320px] flex flex-col items-center justify-center cursor-pointer select-none"
      >
        <div className="w-36 h-36 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-600 flex items-center justify-center shadow-2xl shadow-amber-500/40 animate-pulse border-4 border-amber-300/40">
          <img src="/crystalmind-icon-only.svg" alt="CrystalMind Emblem" className="w-20 h-20 drop-shadow-lg" />
        </div>
        <div className="mt-4 text-xs font-semibold text-amber-200/90 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-lg flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Tap Crystal Emblem to Activate 528Hz Sound Wave</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[320px] md:h-[440px] cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
    >
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-semibold text-amber-200/80 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 pointer-events-none shadow-lg select-none flex items-center gap-1.5">
        <span>💎</span> Touch & Drag to Feel Elastic Crystal Physics
      </div>
    </div>
  );
};
