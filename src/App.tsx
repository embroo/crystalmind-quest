import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from './config/content';
import { Crystal3DCanvas } from './components/Crystal3DCanvas';
import { ErrorBoundary } from './components/ErrorBoundary';
import { solfeggioAudio } from './lib/solfeggioAudio';
import { generateSecretAffirmation, AffirmationResult } from './lib/geminiAffirmation';
import PayPalCheckoutButton from './components/payment/PayPalCheckoutButton';
import { AuthModal } from './components/AuthModal';
import { EBookModal } from './components/EBookModal';
import { useAuth } from './contexts/AuthContext';
import { createOrder } from './lib/firestore';
import { PRODUCTS } from './lib/paypal';
import { Sparkles, Volume2, VolumeX, Smartphone, CheckCircle, Zap, User, BookOpen, Download } from 'lucide-react';

export default function App() {
  const content = CONTENT['en'];

  // Auth State
  const { user, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEBookModalOpen, setIsEBookModalOpen] = useState(false);
  const [isEBookUnlocked, setIsEBookUnlocked] = useState(false);

  // Audio State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Frequency Selection State
  const [selectedFreqId, setSelectedFreqId] = useState('wealth');
  const [userWish, setUserWish] = useState('');
  const [isTuning, setIsTuning] = useState(false);
  const [affirmationResult, setAffirmationResult] = useState<AffirmationResult | null>(null);

  // 1cm Action Log State
  const [microActionInput, setMicroActionInput] = useState('');
  const [isActionLogged, setIsActionLogged] = useState(false);

  // PWA Deferred Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const tunerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted PWA installation');
        }
        setDeferredPrompt(null);
      });
    } else {
      alert(
        '📱 On iOS, tap the Share button in Safari and select "Add to Home Screen".\nOn Android, tap the Chrome menu and select "Install app" or "Add to Home Screen".'
      );
    }
  };

  const selectedFreq =
    content.tuner.frequencies.find((f) => f.id === selectedFreqId) || content.tuner.frequencies[0];

  const getFreqColorHex = (id: string) => {
    switch (id) {
      case 'wealth':
        return 0xffd700;
      case 'love':
        return 0xff69b4;
      case 'clarity':
        return 0x9370db;
      case 'peace':
        return 0x00bfff;
      default:
        return 0xffd700;
    }
  };

  // Top Nav Audio Toggle Button
  const handleAudioToggle = () => {
    const freqHz = parseInt(selectedFreq.hz);
    const newState = solfeggioAudio.toggleFrequency(freqHz);
    setIsAudioPlaying(newState);
  };

  // 3D Crystal Touch Callback
  const handleCrystalTouch = () => {
    solfeggioAudio.triggerHaptic([30, 40, 30]);
    const freqHz = parseInt(selectedFreq.hz);
    solfeggioAudio.startFrequency(freqHz, 0.15);
    setIsAudioPlaying(true);
  };

  // Frequency Card Click Callback
  const handleSelectFrequency = (freqId: string, freqHzStr: string) => {
    if (selectedFreqId === freqId && isAudioPlaying) {
      solfeggioAudio.stopFrequency();
      setIsAudioPlaying(false);
      solfeggioAudio.triggerHaptic(30);
      return;
    }

    setSelectedFreqId(freqId);
    solfeggioAudio.triggerHaptic(40);

    const freqHz = parseInt(freqHzStr);
    solfeggioAudio.startFrequency(freqHz, 0.15);
    setIsAudioPlaying(true);
  };

  const handleTuneFrequency = async () => {
    setIsTuning(true);
    solfeggioAudio.triggerHaptic([50, 100, 50, 100]);

    const freqHz = parseInt(selectedFreq.hz);
    solfeggioAudio.startFrequency(freqHz, 0.18);
    setIsAudioPlaying(true);

    const result = await generateSecretAffirmation(selectedFreqId, userWish, 'en');
    setAffirmationResult(result);
    setIsTuning(false);

    setTimeout(() => {
      tunerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const handleLogAction = async () => {
    if (!microActionInput.trim()) return;
    const orderId = `act_${Date.now()}`;
    try {
      if (user) {
        await createOrder({
          id: orderId,
          userId: user.uid,
          productId: '1cm_action_log',
          productName: `Action: ${microActionInput}`,
          amount: 0,
          currency: 'USD',
          status: 'completed',
          paypalOrderId: orderId,
        });
      }
      setIsActionLogged(true);
      solfeggioAudio.triggerHaptic([80, 120]);
    } catch (err) {
      console.warn('[ActionLog] Local fallback log active:', err);
      setIsActionLogged(true);
    }
  };

  const handlePayPalSuccess = useCallback(
    async (details: any, productId: string, productName: string, amount: string) => {
      const orderId = details.id || `pp_${Date.now()}`;
      try {
        await createOrder({
          id: orderId,
          userId: user?.uid || 'anonymous',
          productId,
          productName,
          amount: parseFloat(amount),
          currency: 'USD',
          status: 'completed',
          paypalOrderId: orderId,
        });
        alert(`✅ Payment completed successfully! Order: ${orderId}\nYour E-Book Reader is opening.`);
        setIsEBookUnlocked(true);
        setIsEBookModalOpen(true);
      } catch (err) {
        alert(`Payment completed. Order: ${orderId}`);
        setIsEBookUnlocked(true);
        setIsEBookModalOpen(true);
      }
    },
    [user]
  );

  return (
    <div className="min-h-screen bg-[#0a0a14] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* ── Top Floating Navigation ── */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/crystalmind-logo-horizontal.svg"
              alt="CrystalMind AI"
              className="h-8 md:h-9 w-auto object-contain"
            />
          </div>

          <div className="flex items-center gap-2.5">
            {/* Dynamic Audio Toggle displaying selected frequency */}
            <button
              onClick={handleAudioToggle}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isAudioPlaying
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/30'
                  : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
              }`}
            >
              {isAudioPlaying ? (
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">
                {isAudioPlaying ? `🔊 ${selectedFreq.hz} Active` : content.hero.audioToggleOff}
              </span>
            </button>

            {/* Auth Button */}
            {user ? (
              <button
                onClick={signOut}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 border border-white/20 text-slate-200 hover:bg-white/20"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-yellow-600 text-black hover:from-amber-400 hover:to-yellow-500 flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Content Container ── */}
      <main className="pt-24 pb-20 px-4 max-w-4xl mx-auto space-y-16">
        {/* ── SCREEN 1: Hero Visualizer ── */}
        <section className="text-center space-y-6 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold tracking-wider uppercase"
          >
            <Zap className="w-3.5 h-3.5" />
            {content.hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
          >
            {content.hero.titleFirst}{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
              {content.hero.titleHighlight}
            </span>{' '}
            {content.hero.titleSecond}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            {content.hero.subtitle}
          </motion.p>

          {/* 3D Crystal Canvas wrapped in ErrorBoundary */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <ErrorBoundary>
              <Crystal3DCanvas
                colorHex={getFreqColorHex(selectedFreqId)}
                freqHz={parseInt(selectedFreq.hz)}
                onCrystalTouch={handleCrystalTouch}
              />
            </ErrorBoundary>
          </motion.div>

          {/* CTA Tune Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => tunerRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-base md:text-lg shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
            >
              {content.hero.ctaButton}
            </button>
          </motion.div>
        </section>

        {/* ── SCREEN 2: Interactive Secret Tuner ── */}
        <section ref={tunerRef} className="space-y-8 pt-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {content.tuner.sectionTitle}
            </h2>
            <p className="text-sm text-slate-400">{content.tuner.sectionSubtitle}</p>
          </div>

          {/* Frequency Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.tuner.frequencies.map((freq) => {
              const isSelected = selectedFreqId === freq.id;
              const isThisPlaying = isSelected && isAudioPlaying;
              return (
                <button
                  key={freq.id}
                  onClick={() => handleSelectFrequency(freq.id, freq.hz)}
                  className={`p-5 rounded-2xl text-left border transition-all relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-br from-white/10 to-white/5 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2.5 py-1 rounded-md font-mono text-xs font-bold transition-all ${
                        isThisPlaying
                          ? 'bg-amber-400 text-black shadow-md shadow-amber-400/40 animate-pulse'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {isThisPlaying ? `🔊 ${freq.hz} Playing` : freq.hz}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{freq.crystalName}</span>
                  </div>
                  <h3 className="font-bold text-base text-white mb-1">{freq.name}</h3>
                  <p className="text-xs text-slate-300 leading-normal">{freq.desc}</p>
                  <p className="text-[10px] text-amber-300/70 mt-2 italic">
                    {isThisPlaying ? '💡 Tap again to turn sound off' : '▶ Tap to play frequency sound'}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Intention Input */}
          <div className="space-y-2 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              {content.tuner.wishPlaceholder}
            </label>
            <input
              type="text"
              value={userWish}
              onChange={(e) => setUserWish(e.target.value)}
              placeholder={content.tuner.wishPlaceholder}
              className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/80 transition-all"
            />
            <button
              onClick={handleTuneFrequency}
              disabled={isTuning}
              className="w-full py-4 rounded-xl font-extrabold text-sm md:text-base bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-500 text-black shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isTuning ? (
                <span className="animate-pulse">{content.tuner.tuningProgress}</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  {content.tuner.tuneButton}
                </>
              )}
            </button>
          </div>

          {/* ── Generated Affirmation Card & Live Lockscreen Exporter ── */}
          <AnimatePresence>
            {affirmationResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-gradient-to-b from-amber-950/30 via-slate-900/80 to-slate-950 border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl backdrop-blur-xl"
              >
                <div className="text-center space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold tracking-widest uppercase border border-amber-500/30">
                    {affirmationResult.headline}
                  </span>
                  <p className="text-lg md:text-2xl font-serif font-medium text-amber-100 leading-relaxed italic px-2">
                    {affirmationResult.affirmationText}
                  </p>
                  <p className="text-xs md:text-sm text-slate-300 font-medium max-w-xl mx-auto bg-black/40 p-3 rounded-xl border border-white/10">
                    {affirmationResult.rasTip}
                  </p>
                </div>

                {/* 1cm Action Log Field */}
                <div className="bg-black/50 border border-white/10 rounded-2xl p-4 space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                    🎯 {content.affirmationCard.actionLabel}
                  </label>
                  <input
                    type="text"
                    value={microActionInput}
                    onChange={(e) => setMicroActionInput(e.target.value)}
                    placeholder={content.affirmationCard.actionPlaceholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={handleLogAction}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 flex items-center justify-center gap-2"
                  >
                    {isActionLogged ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300">{content.vault.actionLoggedMsg}</span>
                      </>
                    ) : (
                      content.affirmationCard.saveActionBtn
                    )}
                  </button>
                </div>

                {/* Action Buttons (Wallpaper + PWA) */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      const canvas = document.createElement('canvas');
                      canvas.width = 1080;
                      canvas.height = 1920;
                      const ctx = canvas.getContext('2d');
                      if (ctx) {
                        ctx.fillStyle = '#0a0a14';
                        ctx.fillRect(0, 0, 1080, 1920);

                        ctx.strokeStyle = '#ffd700';
                        ctx.lineWidth = 4;
                        ctx.strokeRect(540 - 120, 500 - 120, 240, 240);

                        ctx.fillStyle = '#ffd700';
                        ctx.font = 'bold 36px monospace';
                        ctx.textAlign = 'center';
                        ctx.fillText(`🔮 ${selectedFreq.hz} • ${selectedFreq.crystalName}`, 540, 320);

                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'italic 44px Georgia';
                        ctx.fillText(`"${affirmationResult.affirmationText}"`, 540, 1100);

                        ctx.fillStyle = '#94a3b8';
                        ctx.font = '28px sans-serif';
                        ctx.fillText(affirmationResult.rasTip, 540, 1220);

                        ctx.fillStyle = '#64748b';
                        ctx.font = 'bold 24px monospace';
                        ctx.fillText('CrystalMind AI • 1080x1920 HD Lockscreen', 540, 1800);

                        const link = document.createElement('a');
                        link.download = `CrystalMind_HD_Wallpaper_${selectedFreq.hz}.png`;
                        link.href = canvas.toDataURL('image/png');
                        link.click();
                      }
                    }}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-black shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-black" />
                    Download 1080x1920 HD Lockscreen Wallpaper
                  </button>

                  <button
                    onClick={handleInstallPWA}
                    className="w-full py-3 px-6 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/15 border border-white/20 text-slate-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4 text-amber-400" />
                    {content.affirmationCard.pwaInstallBtn}
                  </button>
                </div>

                {/* Live Wallpaper Preview Frame */}
                <div className="bg-black/60 border border-white/10 rounded-2xl p-4 text-center space-y-3 mt-4">
                  <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                    📱 Live Generated HD Lockscreen Preview
                  </p>
                  <div className="max-w-[240px] mx-auto bg-gradient-to-b from-[#0a0a14] via-[#161224] to-[#050508] border-2 border-slate-700 rounded-[28px] p-3 text-center shadow-xl space-y-3 relative aspect-[9/18] flex flex-col justify-between">
                    <div className="space-y-0.5 pt-1">
                      <div className="w-12 h-3 bg-black/80 rounded-full mx-auto" />
                      <p className="text-[10px] text-slate-400 font-mono">08:00</p>
                      <p className="text-[9px] text-amber-400 font-bold uppercase">
                        🔮 {selectedFreq.hz} • {selectedFreq.crystalName}
                      </p>
                    </div>
                    <div className="my-auto">
                      <img
                        src="/crystalmind-icon-only.svg"
                        alt="CrystalMind Emblem"
                        className="w-12 h-12 mx-auto drop-shadow-md"
                      />
                    </div>
                    <div className="bg-black/80 p-2 rounded-xl border border-white/10 text-left">
                      <p className="text-[10px] font-serif text-amber-100 italic leading-snug">
                        "{affirmationResult.affirmationText}"
                      </p>
                      <p className="text-[8px] text-slate-400 mt-1">{affirmationResult.rasTip}</p>
                    </div>
                    <p className="text-[8px] text-slate-500 pb-0.5">CrystalMind AI • 1080x1920 HD</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── SCREEN 3: Global PayPal Checkout ── */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 text-center backdrop-blur-md">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {content.monetization.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto">
              {content.monetization.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Product 1: Digital Talisman */}
            <div className="bg-black/40 border border-white/10 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  DIGITAL TALISMAN
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {content.monetization.digitalTalismanTitle}
                </h3>
                <p className="text-2xl font-extrabold text-amber-300 mt-2">
                  {content.monetization.digitalTalismanPrice}
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <PayPalCheckoutButton
                  product={PRODUCTS[0]}
                  onSuccess={(details) =>
                    handlePayPalSuccess(
                      details,
                      PRODUCTS[0].id,
                      PRODUCTS[0].name,
                      PRODUCTS[0].price
                    )
                  }
                />
              </div>
            </div>

            {/* Product 2: Secret 2.0 E-Book */}
            <div className="bg-black/40 border border-white/10 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  NEURO-GUIDE E-BOOK
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {content.monetization.ebookTitle}
                </h3>
                <p className="text-2xl font-extrabold text-amber-300 mt-2">
                  {content.monetization.ebookPrice}
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 space-y-2">
                <PayPalCheckoutButton
                  product={PRODUCTS[1]}
                  onSuccess={(details) =>
                    handlePayPalSuccess(
                      details,
                      PRODUCTS[1].id,
                      PRODUCTS[1].name,
                      PRODUCTS[1].price
                    )
                  }
                />
                <button
                  onClick={() => setIsEBookModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 flex items-center justify-center gap-1.5 transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  📖 Read & Download Full E-Book Guide
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 py-10 px-4 text-center text-xs text-slate-500 space-y-3">
        <img
          src="/crystalmind-logo-dark.svg"
          alt="CrystalMind AI"
          className="h-9 w-auto mx-auto mb-4 opacity-90 hover:opacity-100 transition-opacity"
        />
        <p>{content.footer.rights}</p>
        <p>{content.footer.disclaimer}</p>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* E-Book Reader Modal */}
      <EBookModal isOpen={isEBookModalOpen} onClose={() => setIsEBookModalOpen(false)} isUnlocked={isEBookUnlocked} />
    </div>
  );
}
