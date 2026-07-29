import React from 'react';
import { AffirmationResult } from '../lib/geminiAffirmation';

interface WallpaperExporterProps {
  affirmation: AffirmationResult;
  crystalName: string;
  hzText: string;
  lang: 'en' | 'kr';
}

export const WallpaperExporter: React.FC<WallpaperExporterProps> = ({
  affirmation,
  crystalName,
  hzText,
  lang,
}) => {
  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Dark Cosmic Gradient Background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, 1920);
    bgGradient.addColorStop(0, '#0a0a14');
    bgGradient.addColorStop(0.5, '#161224');
    bgGradient.addColorStop(1, '#050508');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // 2. Glowing Crystal Aura Circle
    const radial = ctx.createRadialGradient(540, 700, 50, 540, 700, 450);
    radial.addColorStop(0, 'rgba(255, 215, 0, 0.25)');
    radial.addColorStop(0.6, 'rgba(138, 43, 226, 0.1)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.beginPath();
    ctx.arc(540, 700, 450, 0, Math.PI * 2);
    ctx.fill();

    // 3. Draw Crystal Diamond Icon Emblem
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(540, 500); // Top
    ctx.lineTo(650, 680); // Right
    ctx.lineTo(540, 880); // Bottom
    ctx.lineTo(430, 680); // Left
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(430, 680);
    ctx.lineTo(650, 680);
    ctx.moveTo(540, 500);
    ctx.lineTo(540, 880);
    ctx.stroke();

    // 4. Header Badge Text
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`🔮 CrystalMind AI • ${hzText}`, 540, 320);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '26px sans-serif';
    ctx.fillText(crystalName, 540, 370);

    // 5. Affirmation Card Container Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.roundRect(100, 1050, 880, 520, 30);
    ctx.fill();
    ctx.stroke();

    // 6. Affirmation Quotes
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px serif';

    // Wrap Affirmation Text
    const words = affirmation.affirmationText.split(' ');
    let line = '';
    let y = 1160;
    const maxWidth = 800;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, 540, y);
        line = words[i] + ' ';
        y += 54;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 540, y);

    // 7. RAS Tip Footer
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '26px sans-serif';
    ctx.fillText(affirmation.rasTip, 540, 1480);

    // 8. Footer Brand Watermark
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '24px sans-serif';
    ctx.fillText('Lockscreen Visualization • CrystalMind AI', 540, 1780);

    // Trigger Image Download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `CrystalMind_Lockscreen_Wallpaper_${hzText.replace(/\s+/g, '')}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
    >
      🖼️ {lang === 'kr' ? 'HD 잠금화면 왈페이퍼 다운로드' : 'Download HD Lockscreen Wallpaper'}
    </button>
  );
};
