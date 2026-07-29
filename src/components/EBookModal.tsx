import React from 'react';
import { X, BookOpen, Download, Sparkles } from 'lucide-react';

interface EBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EBookModal: React.FC<EBookModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownloadFile = () => {
    const link = document.createElement('a');
    link.href = '/secret_20_neuroscience_manifestation_guide.md';
    link.download = 'secret_20_neuroscience_manifestation_guide.md';
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0d0d1a] border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="font-extrabold text-base md:text-lg text-amber-200">
              Secret 2.0: The Neuroscience of Manifestation
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadFile}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Download Guide (.md)
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body (100% Pure Global English Manuscript) */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-sm md:text-base leading-relaxed text-slate-300 select-text">
          {/* Title Banner */}
          <div className="text-center space-y-3 border-b border-amber-500/20 pb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              OFFICIAL SECRET 2.0 WELLNESS GUIDE
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
          </div>

          {/* Note Before You Begin */}
          <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-2xl text-xs text-amber-100/90 leading-relaxed">
            <strong>📌 A Note Before You Begin:</strong> This guide is an educational and self-development resource. It draws on general, publicly understood concepts from neuroscience and psychology — attention filtering, stress physiology, and habit formation — and applies them to goal-setting and personal growth practices. It is not medical advice, is not a treatment for any condition, and is not a guarantee of any financial, health, or life outcome. Individual experiences vary. If you have a medical or mental health condition, please consult a licensed professional before beginning any new wellness practice.
          </div>

          {/* Table of Contents */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-amber-300 text-sm">📖 Table of Contents</h3>
            <ul className="text-xs md:text-sm space-y-1.5 text-slate-300 list-disc list-inside">
              <li><strong>Prologue</strong>: Why Willpower Alone Wasn't Enough</li>
              <li><strong>Chapter 1</strong>: Training Your Attention Filter</li>
              <li><strong>Chapter 2</strong>: Feeling It in the Body, Not Just the Mind</li>
              <li><strong>Chapter 3</strong>: Calming the Nervous System First</li>
              <li><strong>Chapter 4</strong>: The One-Inch Action Principle</li>
              <li><strong>Chapter 5</strong>: A Simple Daily Ritual</li>
              <li><strong>Epilogue</strong>: What You Practice, You Become</li>
            </ul>
          </div>

          {/* Section Prologue */}
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
              This guide takes a different starting point: changing your attention filter, your somatic feeling, and your next 1-inch action. These are not mystical claims — they're practical habits grounded in how attention, emotion, and behavior actually work together.
            </p>
          </div>

          {/* Chapter 1 */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
              🧠 Chapter 1: Training Your Attention Filter
            </h2>
            <p>
              Your brain receives far more information every second than you could ever consciously process, so it filters — bringing certain things into awareness while letting the rest fade into the background. This is a well-documented feature of attention: what you've decided matters gets noticed; everything else tends to blend into the noise.
            </p>
            <p>
              The practical implication: if you consistently focus on scarcity, obstacles, and what could go wrong, your attention will keep surfacing evidence for exactly that. If you deliberately and repeatedly direct your attention toward solutions, resources, and possibilities, you train yourself to notice openings you'd otherwise miss.
            </p>

            <div className="bg-black/60 border border-white/10 p-4 rounded-xl text-xs text-amber-300 space-y-1">
              <p className="font-semibold text-white">💡 Try this:</p>
              <p>Each morning, name one specific category of opportunity you want your attention tuned to this week (a client type, a skill, a kind of collaborator). Write it down. Notice at the end of the day what you actually paid attention to.</p>
            </div>
          </div>

          {/* Chapter 2 */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
              🧬 Chapter 2: Feeling It in the Body, Not Just the Mind
            </h2>
            <p>
              Visualization works better when paired with an actual felt sense in the body: a settled breath, a genuine feeling of gratitude, and a relaxed posture. This pairing is called <strong>embodiment</strong>.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li><strong>Emotion helps memory and motivation stick</strong>: States you actually feel — even briefly — tend to be more motivating and memorable than facts you merely think about.</li>
              <li><strong>The heart's electrical signal is unusually strong</strong>: The heart generates a measurable electromagnetic field, larger than the brain's. Physical techniques that calm and steady the heart have a real, measurable effect on your overall physiological state, which affects how clearly you think and how calmly you act.</li>
            </ul>

            <div className="bg-black/60 border border-white/10 p-4 rounded-xl text-xs text-amber-300 space-y-1">
              <p className="font-semibold text-white">💡 Try this:</p>
              <p>Before visualizing a goal, spend 20 seconds simply slowing your breath and noticing one thing you're already grateful for today. Then picture the goal. The order matters — body first, image second.</p>
            </div>
          </div>

          {/* Chapter 3 */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
              🌊 Chapter 3: Calming the Nervous System First
            </h2>
            <p>
              None of the above works well if your nervous system is in a stress response. When you feel threatened, your body prioritizes short-term survival over long-term thinking, creativity, or openness to new ideas.
            </p>
            <div className="bg-black/40 border border-white/10 p-4 rounded-xl space-y-2">
              <p className="font-semibold text-amber-300">Paced Breathing Protocol:</p>
              <p className="text-xs">Inhale for <strong>4 seconds</strong>, hold for <strong>2 seconds</strong>, exhale for <strong>6 seconds</strong>. Repeat for 30–60 seconds to activate your body's natural "rest and recover" response, which lowers physical tension and supports clearer thinking.</p>
            </div>
          </div>

          {/* Chapter 4 */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
              🎯 Chapter 4: The One-Inch Action Principle
            </h2>
            <p>
              Clarity and calm are only useful if they lead somewhere. Waiting passively for a breakthrough is the part of older "manifestation" advice most worth leaving behind.
            </p>
            <p>
              Instead: once you feel clear and calm, ask <em>"What is one small, concrete action I could take in the next 24 hours that moves this forward — even by an inch?"</em> Send the email. Make the call. Draft the outline. Ask the question.
            </p>
          </div>

          {/* Chapter 5 */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
              🔮 Chapter 5: A Simple Daily Ritual
            </h2>
            <div className="bg-amber-950/30 border border-amber-500/20 p-5 rounded-xl text-amber-200 space-y-2">
              <p>• <strong>Ground (30–60 sec)</strong>: Paced breathing, optionally with your calming sound or tone.</p>
              <p>• <strong>Picture (60–90 sec)</strong>: A specific, vivid image of a near-term goal, paired with genuine ease.</p>
              <p>• <strong>Name (30 sec)</strong>: One category of opportunity you want your attention tuned to today.</p>
              <p>• <strong>Act (rest of day)</strong>: Identify and complete your one-inch action.</p>
              <p>• <strong>Log (2 min, evening)</strong>: What did you notice? What did you do? What are you grateful for?</p>
              <p className="text-center font-bold text-white pt-2">"Five minutes at the start, two at the end. That's the whole ritual."</p>
            </div>
          </div>

          {/* Epilogue */}
          <div className="text-center pt-6 border-t border-white/10 space-y-3">
            <h3 className="text-lg font-bold text-amber-300">👑 Epilogue: What You Practice, You Become</h3>
            <p className="text-xs md:text-sm max-w-xl mx-auto text-slate-400">
              Start today. Ground yourself, picture the goal, name your focus, and take the one-inch action in front of you.
            </p>
            <p className="text-xs text-slate-500">© 2026 CrystalMind AI. All rights reserved. Provided for educational and self-development purposes.</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-black/60 border-t border-white/10 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold text-sm"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
