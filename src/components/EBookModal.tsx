import React, { useState } from 'react';
import { X, BookOpen, Download, Sparkles, Lock, ShieldCheck, CheckCircle, Music } from 'lucide-react';
import PayPalCheckoutButton from './payment/PayPalCheckoutButton';
import { PRODUCTS } from '../lib/paypal';

interface EBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  isUnlocked?: boolean;
}

export const EBookModal: React.FC<EBookModalProps> = ({ isOpen, onClose, isUnlocked: initialUnlocked = false }) => {
  const [isUnlocked, setIsUnlocked] = useState(initialUnlocked);

  if (!isOpen) return null;

  const handleDownloadFile = () => {
    if (!isUnlocked) {
      alert('🔒 Please unlock the full E-Book guide ($19.99) to download the manuscript.');
      return;
    }
    const link = document.createElement('a');
    link.href = '/secret_20_neuroscience_manifestation_guide.md';
    link.download = 'secret_20_neuroscience_manifestation_guide.md';
    link.click();
  };

  const handlePaymentSuccess = () => {
    setIsUnlocked(true);
    alert('🎉 Thank you! The VIP All-Access Secret 2.0 Master Suite (E-Book + 4K Wallpapers + 15-Min MP3 Audio) is now fully unlocked!');
  };

  const audioSuite = [
    { hz: '528Hz', name: 'Golden Citrine (17.0 min)', file: '/audio/CrystalMind_528Hz_Golden_Citrine_15Min_Master.mp3' },
    { hz: '639Hz', name: 'Rose Quartz (14.1 min)', file: '/audio/CrystalMind_639Hz_Rose_Quartz_15Min_Master.mp3' },
    { hz: '741Hz', name: 'Amethyst (11.0 min)', file: '/audio/CrystalMind_741Hz_Amethyst_15Min_Master.mp3' },
    { hz: '432Hz', name: 'Teal Quartz (14.3 min)', file: '/audio/CrystalMind_432Hz_Teal_Quartz_15Min_Master.mp3' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d0d1a] border border-amber-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="font-extrabold text-base md:text-lg text-amber-200">
              Secret 2.0: The Neuroscience of Manifestation
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {isUnlocked ? (
              <button
                onClick={handleDownloadFile}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-semibold flex items-center gap-1 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Download Guide (.md)
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                <Lock className="w-3 h-3" />
                Preview Mode
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-sm md:text-base leading-relaxed text-slate-300 select-text">
          {/* Title Banner with 3D Book Cover */}
          <div className="flex flex-col md:flex-row items-center gap-6 border-b border-amber-500/20 pb-6">
            <div className="w-44 md:w-52 shrink-0 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-amber-500/40">
              <img
                src="/ebook_3d_cover.png"
                alt="Secret 2.0 3D Book Cover"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3 text-center md:text-left flex-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                OFFICIAL $19.99 VIP ALL-ACCESS MASTER SUITE
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Secret 2.0: The Neuroscience of Manifestation
              </h1>
              <p className="text-xs text-amber-300/80 font-mono">
                A CrystalMind Wellness Guide to Rewiring Attention, Emotion, and Action
              </p>
              <p className="text-xs text-slate-400">
                Publisher: CrystalMind AI Wellness Lab | Executive Producer: CEO Noh
              </p>
              {isUnlocked && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 mt-2">
                  <CheckCircle className="w-3.5 h-3.5" />
                  VIP Full Access Unlocked (E-Book + 4K Wallpapers + 15-Min MP3 Audio)
                </div>
              )}
            </div>
          </div>

          {/* Note Before You Begin */}
          <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-2xl text-xs text-amber-100/90 leading-relaxed">
            <strong>📌 A Note Before You Begin:</strong> This guide is an educational and self-development resource. It draws on general, publicly understood concepts from neuroscience and psychology — attention filtering, stress physiology, and habit formation — and applies them to goal-setting and personal growth practices.
          </div>

          {/* Table of Contents */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-amber-300 text-sm flex items-center justify-between">
              <span>📖 Table of Contents</span>
              {!isUnlocked && (
                <span className="text-xs text-amber-400 font-normal">Prologue Free • Chapters 1-5 & VIP Bonus Audio Locked</span>
              )}
            </h3>
            <ul className="text-xs md:text-sm space-y-1.5 text-slate-300 list-disc list-inside">
              <li className="text-amber-200 font-semibold">
                <strong>Prologue</strong>: Why Willpower Alone Wasn't Enough <span className="text-emerald-400 text-xs font-mono">(Free Preview)</span>
              </li>
              <li className={isUnlocked ? '' : 'opacity-60'}>
                <strong>Chapter 1</strong>: Training Your Attention Filter {!isUnlocked && '🔒'}
              </li>
              <li className={isUnlocked ? '' : 'opacity-60'}>
                <strong>Chapter 2</strong>: Feeling It in the Body, Not Just the Mind {!isUnlocked && '🔒'}
              </li>
              <li className={isUnlocked ? '' : 'opacity-60'}>
                <strong>Chapter 3</strong>: Calming the Nervous System First {!isUnlocked && '🔒'}
              </li>
              <li className={isUnlocked ? '' : 'opacity-60'}>
                <strong>Chapter 4</strong>: The One-Inch Action Principle {!isUnlocked && '🔒'}
              </li>
              <li className={isUnlocked ? '' : 'opacity-60'}>
                <strong>Chapter 5</strong>: A Simple Daily Ritual {!isUnlocked && '🔒'}
              </li>
              <li className={isUnlocked ? 'text-amber-300 font-bold' : 'opacity-60'}>
                <strong>Special Section</strong>: Character as Spiritual Intelligence & The 6 Virtues {!isUnlocked && '🔒'}
              </li>
              <li className={isUnlocked ? 'text-emerald-300 font-bold' : 'opacity-60'}>
                <strong>VIP Bonus Suite</strong>: 4K Wallpapers + 4-Track 15-Min MP3 Audio Suite {!isUnlocked && '🔒'}
              </li>
            </ul>
          </div>

          {/* Section Prologue (ALWAYS FREE TO READ) */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
              🔮 Prologue: Why Willpower Alone Wasn't Enough
            </h2>
            <p>
              For decades, popular self-help culture has offered a simple formula: picture what you want, say it out loud, and wait for it to arrive. Millions of people tried it. Many were left more tired than transformed.
            </p>
            <div className="bg-amber-950/40 border border-amber-500/30 p-4 rounded-xl text-amber-100 italic font-serif">
              "Repeating a wish you don't yet believe doesn't calm your mind — it can actually remind your brain of the gap between where you are and where you want to be."
            </div>
            <p>
              When that gap feels urgent or desperate, your nervous system tends to focus on protecting you from disappointment rather than noticing new opportunities.
            </p>
            <p className="font-bold text-white">
              This guide takes a different starting point: changing your attention filter, your somatic feeling, and your next 1-inch action.
            </p>
          </div>

          {/* LOCKED / UNLOCKED CHAPTERS */}
          {isUnlocked ? (
            /* ──────────────── UNLOCKED FULL CHAPTERS & VIP BONUS AUDIO ──────────────── */
            <>
              {/* Chapter 1 */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
                  🧠 Chapter 1: Training Your Attention Filter
                </h2>
                <p>
                  Your brain receives far more information every second than you could ever consciously process, so it filters — bringing certain things into awareness while letting the rest fade into the background.
                </p>
              </div>

              {/* Chapter 2 */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
                  🧬 Chapter 2: Feeling It in the Body, Not Just the Mind
                </h2>
                <p>
                  Visualization works better when paired with an actual felt sense in the body: a settled breath, a genuine feeling of gratitude, and a relaxed posture. This pairing is called <strong>embodiment</strong>.
                </p>
              </div>

              {/* Chapter 3 */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
                  🌊 Chapter 3: Calming the Nervous System First
                </h2>
                <div className="bg-black/40 border border-white/10 p-4 rounded-xl space-y-2">
                  <p className="font-semibold text-amber-300">Paced Breathing Protocol:</p>
                  <p className="text-xs">Inhale for 4s, hold for 2s, exhale for 6s. Repeat for 30–60 seconds.</p>
                </div>
              </div>

              {/* Chapter 4 & 5 */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
                  🎯 Chapter 4 & 5: The One-Inch Action Principle & Daily Ritual
                </h2>
                <div className="bg-amber-950/30 border border-amber-500/20 p-5 rounded-xl text-amber-200 space-y-2">
                  <p>• <strong>Ground (30–60 sec)</strong>: Paced breathing.</p>
                  <p>• <strong>Picture (60–90 sec)</strong>: Vivid image of a near-term goal.</p>
                  <p>• <strong>Name (30 sec)</strong>: Category of opportunity for today.</p>
                  <p>• <strong>Act (rest of day)</strong>: Complete your one-inch action.</p>
                </div>
              </div>

              {/* SPECIAL SECTION: THE 6 VIRTUES OF AWARENESS */}
              <div className="space-y-4 pt-4 border-t border-amber-500/30 bg-gradient-to-b from-amber-950/30 to-black/40 p-6 rounded-2xl border border-amber-500/20">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold uppercase border border-amber-500/40">
                  💎 SPECIAL SECTION
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold text-amber-200">
                  Character as Spiritual Intelligence & The 6 Virtues of Awareness
                </h2>
                <div className="bg-black/60 border border-amber-500/30 p-4 rounded-xl text-amber-100 italic font-serif text-xs md:text-sm">
                  "Character is ultimately a matter of intelligence — not IQ, but Spiritual Intelligence (SQ): the operation of Pure Aware Presence that perceives reality exactly as it is without ego bias."
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-black/50 p-3 rounded-xl border border-white/10 space-y-1">
                    <p className="font-bold text-amber-300">1. Serenity (Detachment / 초연)</p>
                    <p className="text-slate-300">Master stress and mental noise from a still mind.</p>
                  </div>
                  <div className="bg-black/50 p-3 rounded-xl border border-white/10 space-y-1">
                    <p className="font-bold text-amber-300">2. Warmth (Loving-Kindness / 따뜻)</p>
                    <p className="text-slate-300">Perspective-taking (역지사지); embrace others with genuine love.</p>
                  </div>
                  <div className="bg-black/50 p-3 rounded-xl border border-white/10 space-y-1">
                    <p className="font-bold text-amber-300">3. Equanimity (Accepting Mind / 긍정)</p>
                    <p className="text-slate-300">Embrace challenging feedback with an upbeat spirit.</p>
                  </div>
                  <div className="bg-black/50 p-3 rounded-xl border border-white/10 space-y-1">
                    <p className="font-bold text-amber-300">4. Fulfillment (Plentiful Mind / 충만)</p>
                    <p className="text-slate-300">Steadfast perseverance, knowing nothing is lacking within.</p>
                  </div>
                  <div className="bg-black/50 p-3 rounded-xl border border-white/10 space-y-1">
                    <p className="font-bold text-amber-300">5. Flexibility (Open Virtue / 유연)</p>
                    <p className="text-slate-300">Choose what is right and hold yourself accountable.</p>
                  </div>
                  <div className="bg-black/50 p-3 rounded-xl border border-white/10 space-y-1">
                    <p className="font-bold text-amber-300">6. Clarity (Luminous Wisdom / 자명)</p>
                    <p className="text-slate-300">Perceive reality and cause-and-effect with luminous clarity.</p>
                  </div>
                </div>
              </div>

              {/* VIP BONUS SUITE: 15-MIN MP3 AUDIO FILES & 4K WALLPAPERS */}
              <div className="space-y-4 pt-4 border-t border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 to-black/50 p-6 rounded-2xl border border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold uppercase border border-emerald-500/40">
                    <Music className="w-3.5 h-3.5" />
                    VIP INCLUDED BONUS: 15-MIN MP3 AUDIO SUITE
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">100% Free with $19.99 VIP Pass</span>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-emerald-200">
                  🎧 Download Your 4-Track 15-Minute Master Audio Files
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {audioSuite.map((track, i) => (
                    <a
                      key={i}
                      href={track.file}
                      download
                      className="bg-black/60 hover:bg-black/80 border border-emerald-500/30 p-3.5 rounded-xl text-left flex items-center justify-between group transition-all"
                    >
                      <div className="space-y-0.5">
                        <p className="text-xs font-mono font-bold text-emerald-300">{track.hz}</p>
                        <p className="text-xs text-white font-medium">{track.name}</p>
                      </div>
                      <Download className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Epilogue */}
              <div className="text-center pt-6 border-t border-white/10 space-y-3">
                <h3 className="text-lg font-bold text-amber-300">👑 Epilogue: What You Practice, You Become</h3>
                <p className="text-xs md:text-sm max-w-xl mx-auto text-slate-400">
                  Start today. Ground yourself, picture the goal, name your focus, and take the one-inch action in front of you.
                </p>
              </div>
            </>
          ) : (
            /* ──────────────── LOCKED MONETIZATION BANNER ──────────────── */
            <div className="relative mt-8 p-6 md:p-8 rounded-3xl bg-gradient-to-b from-amber-950/40 via-slate-900/90 to-[#0a0a16] border border-amber-500/40 shadow-2xl text-center space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
                <Lock className="w-7 h-7 text-black" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider border border-amber-500/30">
                  UNLOCK ALL CHAPTERS + 6 VIRTUES + 15-MIN MP3 AUDIO SUITE
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-white">
                  Get VIP All-Access to the Neuroscience of Manifestation
                </h3>
                <p className="text-xs md:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Unlock the full 5-chapter master guide, The 6 Virtues Special Section, 4K Wallpapers, and the 15-Minute MP3 Master Audio Suite.
                </p>
              </div>

              <div className="bg-black/50 border border-white/10 p-4 rounded-2xl max-w-sm mx-auto space-y-2 text-left text-xs text-slate-300">
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Full Chapters 1-5 + The 6 Virtues Special Section</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>VIP INCLUDED</strong>: 15-Min MP3 Master Audio Suite 4종</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>VIP INCLUDED</strong>: 4K Lockscreen Wallpapers 4종</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Markdown & PDF Guide File Downloads</span>
                </p>
              </div>

              <div className="pt-2 max-w-sm mx-auto space-y-3">
                <p className="text-2xl font-extrabold text-amber-300">$19.99 USD</p>
                <PayPalCheckoutButton
                  product={PRODUCTS[1]}
                  onSuccess={handlePaymentSuccess}
                />
                <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Instant Automatic Unlock via PayPal Secure Checkout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-black/60 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {isUnlocked ? '✅ VIP All-Access Unlocked (E-Book + 4K Wallpapers + 15-Min Audio)' : '🔒 Preview Mode (Prologue Only)'}
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold text-xs transition-all"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
