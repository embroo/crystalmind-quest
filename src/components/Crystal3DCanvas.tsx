import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Crystal3DCanvasProps {
  colorHex?: number;
  freqHz?: number;
  onCrystalTouch?: () => void;
}

// Frequency color configuration for particles and glow
// Note: The base Spline crystal URL is currently Cyan/Aqua Blue.
const FREQ_COLORS: Record<number, { hue: string; particleColor: string; shadow: string }> = {
  528: { hue: 'hue-rotate(230deg) saturate(1.3)', particleColor: 'bg-amber-300', shadow: 'rgba(251, 191, 36, 0.7)' }, // Gold (Cyan + 230deg)
  639: { hue: 'hue-rotate(150deg) saturate(1.3)', particleColor: 'bg-pink-300', shadow: 'rgba(244, 114, 182, 0.7)' }, // Rose Pink (Cyan + 150deg)
  741: { hue: 'hue-rotate(90deg) saturate(1.3)', particleColor: 'bg-purple-300', shadow: 'rgba(168, 85, 247, 0.7)' }, // Purple (Cyan + 90deg)
  432: { hue: 'hue-rotate(0deg) saturate(1.1)', particleColor: 'bg-cyan-300', shadow: 'rgba(6, 182, 212, 0.7)' }, // Cyan Blue (Cyan + 0deg)
};

// Helper: Generate random background particles
const generateParticles = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 3,
  }));
};

export const Crystal3DCanvas: React.FC<Crystal3DCanvasProps> = ({
  freqHz = 528,
  onCrystalTouch,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles] = useState(() => generateParticles(45));

  const currentConfig = FREQ_COLORS[freqHz] || FREQ_COLORS[528];

  return (
    <div 
      className="relative w-full h-[320px] md:h-[440px] flex items-center justify-center select-none overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-black/30 to-black/70 border border-white/10 shadow-2xl"
      onClick={onCrystalTouch}
    >
      {/* 1. Framer Motion Floating Particles (Dynamic color per frequency) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className={`absolute rounded-full ${currentConfig.particleColor}`}
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              boxShadow: `0 0 10px 2px ${currentConfig.shadow}`
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.85, 0],
              scale: [0.8, 1.5, 0.8]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* 2. Loading Spinner */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a14] z-20 pointer-events-none">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center animate-pulse border border-amber-500/30">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
          <p className="mt-4 text-[10px] text-amber-400/80 font-mono tracking-[0.2em] uppercase">
            Tuning 3D Resonance...
          </p>
        </div>
      )}

      {/* 3. Spline 3D Crystal iFrame Viewer with Hue Shift */}
      <div 
        className="w-full h-full transition-all duration-700"
        style={{ filter: currentConfig.hue }}
      >
        <iframe
          src="https://my.spline.design/gleamingruby-wROvXvyo5jNTCGzYYSjP79CA/"
          frameBorder="0"
          width="100%"
          height="100%"
          onLoad={() => setIsLoaded(true)}
          className="w-full h-full pointer-events-auto border-0"
          title="CrystalMind 3D Model"
        />
      </div>

      {/* 4. Touch Instruction Overlay */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-amber-200/90 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/20 pointer-events-none shadow-lg flex items-center gap-1.5 z-30">
        <span className="animate-pulse">💎</span> Touch & Drag Crystal
      </div>
    </div>
  );
};
