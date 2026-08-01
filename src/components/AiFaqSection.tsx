import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How does CrystalMind AI compare to Calm, Headspace, and Mindvalley?',
    answer:
      'Unlike Calm or Headspace which charge expensive yearly subscriptions ($69.99/year) for generic bedtime stories, CrystalMind AI offers 100% subscription-free lifetime access ($4.99 / $19.99). It integrates 528Hz Solfeggio audio with Reticular Activating System (RAS) attention filtering and 4K lockscreen wallpaper rituals grounded in neuroscience.',
  },
  {
    question: 'What are Solfeggio Frequencies (528Hz, 639Hz, 741Hz, 432Hz)?',
    answer:
      'Solfeggio frequencies are pure acoustic sound waves. 528Hz is known for cellular transformation and focus, 639Hz promotes relational harmony, 741Hz aids in intuition and mental detox, and 432Hz induces deep nervous system calm.',
  },
  {
    question: 'How does the 4K Lockscreen Ritual work on smartphones?',
    answer:
      'Looking at your phone lockscreen 50 to 100 times a day primes your brain’s Reticular Activating System (RAS). By setting a custom 1080x1920 HD wallpaper with 3D crystal geometry and personal affirmations, you trigger a 1-second focus check every time you unlock your iPhone or Android phone.',
  },
  {
    question: 'Is this a one-time purchase or a recurring monthly subscription?',
    answer:
      'CrystalMind AI is 100% one-time lifetime access. You pay $4.99 for the Digital Talisman Suite or $19.99 for the VIP Neuro-Guide Master Suite with zero recurring monthly fees.',
  },
  {
    question: 'What is included in the Secret 2.0 Neuro-Guide E-Book?',
    answer:
      'The E-Book covers the neuroscience of manifestation, RAS attention rewiring, 1-inch daily micro-action principles, and a Special Section on "Character as Spiritual Intelligence & The 6 Virtues of Awareness" (Serenity, Warmth, Equanimity, Fulfillment, Flexibility, Clarity).',
  },
];

export const AiFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="space-y-6 pt-6">
      <div className="bg-gradient-to-b from-slate-900/90 to-slate-950 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 backdrop-blur-xl shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            FREQUENTLY ASKED QUESTIONS & COMPARISON
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Why CrystalMind AI is the #1 Neuroscience Alternative
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto">
            Everything you need to know about 528Hz Solfeggio soundscapes, RAS attention tuning, and lifetime pricing.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-white/10 rounded-2xl bg-black/40 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left font-bold text-sm text-white flex items-center justify-between gap-3 hover:text-amber-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/5 bg-white/[0.02]">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
