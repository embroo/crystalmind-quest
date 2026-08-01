import React from 'react';
import { X, Sparkles, Download, CheckCircle, ShieldCheck } from 'lucide-react';

interface TalismanModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName?: string;
}

export const TalismanModal: React.FC<TalismanModalProps> = ({
  isOpen,
  onClose,
  customerName = 'Sarah Jenkins',
}) => {
  if (!isOpen) return null;

  const talismans = [
    {
      hz: '528Hz',
      name: 'Golden Citrine Abundance Talisman',
      color: 'from-amber-400 to-yellow-600',
      borderColor: 'border-amber-500/40',
      image: '/talisman_528hz.png',
      quote: '"My brain\'s RAS antenna captures wealth and opportunity with crystal clarity."',
    },
    {
      hz: '639Hz',
      name: 'Rose Quartz Love & Harmony Talisman',
      color: 'from-rose-400 to-pink-600',
      borderColor: 'border-rose-500/40',
      image: '/talisman_639hz.png',
      quote: '"I radiate unconditional love, harmony, and magnetic attraction."',
    },
    {
      hz: '741Hz',
      name: 'Amethyst Intuition & Truth Talisman',
      color: 'from-purple-400 to-indigo-600',
      borderColor: 'border-purple-500/40',
      image: '/talisman_741hz.png',
      quote: '"My intuition guides every decision with luminous clarity and truth."',
    },
    {
      hz: '432Hz',
      name: 'Teal Quartz Deep Calm & Peace Talisman',
      color: 'from-cyan-400 to-teal-600',
      borderColor: 'border-cyan-500/40',
      image: '/talisman_432hz.png',
      quote: '"My nervous system settles into profound calm, clarity, and peace."',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d0d1a] border border-amber-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="font-extrabold text-base md:text-lg text-amber-200">
              Personalized 4K AI Crystal Talisman Suite ($4.99 Unlocked)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8">
          {/* Welcome Banner */}
          <div className="text-center space-y-2 bg-gradient-to-b from-amber-950/40 via-slate-900/80 to-slate-950 p-6 rounded-3xl border border-amber-500/30">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              <CheckCircle className="w-3.5 h-3.5" />
              PAYMENT VERIFIED • LIFETIME 4K ACCESS
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Congratulations, {customerName}!
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Your personalized 4-Frequency Solfeggio AI Crystal Talisman Suite is ready. Download these 1080x1920 4K Ultra-HD Lockscreen Wallpapers for your mobile device.
            </p>
          </div>

          {/* 4 Talismans Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {talismans.map((item, idx) => (
              <div
                key={idx}
                className={`bg-black/60 border ${item.borderColor} rounded-2xl p-4 space-y-3 flex flex-col justify-between shadow-xl backdrop-blur-md`}
              >
                <div className="space-y-2 text-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 font-mono text-[10px] font-bold">
                    🔮 {item.hz} FREQUENCY
                  </span>
                  <h3 className="font-bold text-sm text-white">{item.name}</h3>
                  <div className="relative aspect-[9/16] max-w-[200px] mx-auto rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[11px] font-serif text-slate-300 italic px-2">
                    {item.quote}
                  </p>
                </div>

                <a
                  href={item.image}
                  download={`CrystalMind_4K_Talisman_${item.hz}_${customerName.replace(/\s+/g, '_')}.png`}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all mt-2"
                >
                  <Download className="w-3.5 h-3.5 text-black" />
                  Download 4K Lockscreen ({item.hz})
                </a>
              </div>
            ))}
          </div>

          {/* Guarantee & Instructions */}
          <div className="bg-black/50 border border-white/10 p-4 rounded-2xl text-center space-y-1.5 text-xs text-slate-400">
            <p className="flex items-center justify-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Verified Lifetime Personal License
            </p>
            <p>
              Set these wallpapers as your daily iOS/Android lockscreen to tune your brain's RAS filter every time you unlock your phone.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-black/60 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Receipt: #TALISMAN_{Date.now().toString().slice(-6)} • $4.99 USD Paid
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold text-xs transition-all"
          >
            Close Suite
          </button>
        </div>
      </div>
    </div>
  );
};
