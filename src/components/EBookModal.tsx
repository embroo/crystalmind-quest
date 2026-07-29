import React, { useState } from 'react';
import { X, BookOpen, Download, Sparkles, Globe } from 'lucide-react';

interface EBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EBookModal: React.FC<EBookModalProps> = ({ isOpen, onClose }) => {
  const [readerLang, setReaderLang] = useState<'en' | 'kr'>('en');

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
              {readerLang === 'en'
                ? 'Secret 2.0: The Neuroscience of Manifestation'
                : '시크릿 2.0: 뇌과학(RAS) 끌어당김 마스터 가이드'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Reader Language Switcher */}
            <button
              onClick={() => setReaderLang(readerLang === 'en' ? 'kr' : 'en')}
              className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-white/20"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{readerLang === 'en' ? 'EN' : 'KR'}</span>
            </button>

            <button
              onClick={handleDownloadFile}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Download (MD)
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body (FTC Compliant Masterpiece Manuscript) */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-sm md:text-base leading-relaxed text-slate-300 select-text">
          {readerLang === 'en' ? (
            /* ──────────────── ENGLISH MANUSCRIPT ──────────────── */
            <>
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
                <strong>📌 A Note Before You Begin:</strong> This guide is an educational and self-development resource. It draws on general, publicly understood concepts from neuroscience and psychology — attention filtering, stress physiology, and habit formation — and applies them to goal-setting and personal growth practices. It is not medical advice, is not a treatment for any condition, and is not a guarantee of any financial, health, or life outcome. Individual experiences vary.
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
                  This guide takes a different starting point: changing your attention filter, your somatic feeling, and your next 1-inch action.
                </p>
              </div>

              {/* Chapter 1 */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
                  🧠 Chapter 1: Training Your Attention Filter
                </h2>
                <p>
                  Your brain receives far more information every second than you could ever consciously process, so it filters — bringing certain things into awareness while letting the rest fade into the background.
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
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li><strong>Emotion helps memory and motivation stick</strong>: States you actually feel are more memorable than facts you merely think about.</li>
                  <li><strong>The heart's electrical signal is unusually strong</strong>: Physical techniques that calm and steady the heart have a real, measurable effect on your overall physiological state.</li>
                </ul>
              </div>

              {/* Chapter 3 */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
                  🌊 Chapter 3: Calming the Nervous System First
                </h2>
                <p>
                  When you feel threatened, your body prioritizes short-term survival over long-term thinking.
                </p>
                <div className="bg-black/40 border border-white/10 p-4 rounded-xl space-y-2">
                  <p className="font-semibold text-amber-300">Paced Breathing Protocol:</p>
                  <p className="text-xs">Inhale for <strong>4 seconds</strong>, hold for <strong>2 seconds</strong>, exhale for <strong>6 seconds</strong>. Repeat for 30–60 seconds to activate your body's natural rest and recover response.</p>
                </div>
              </div>

              {/* Chapter 4 & 5 */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
                  🎯 Chapter 4 & 5: The One-Inch Action Principle & Daily Ritual
                </h2>
                <p>
                  Clarity and calm are only useful if they lead somewhere. Ask: <em>"What is one small, concrete action I could take in the next 24 hours that moves this forward — even by an inch?"</em>
                </p>
                <div className="bg-amber-950/30 border border-amber-500/20 p-4 rounded-xl text-amber-200 font-semibold text-center">
                  "Five minutes at the start, two at the end. That's the whole ritual."
                </div>
              </div>

              {/* Epilogue */}
              <div className="text-center pt-6 border-t border-white/10 space-y-3">
                <h3 className="text-lg font-bold text-amber-300">👑 Epilogue: What You Practice, You Become</h3>
                <p className="text-xs md:text-sm max-w-xl mx-auto text-slate-400">
                  Start today. Ground yourself, picture the goal, name your focus, and take the one-inch action in front of you.
                </p>
                <p className="text-xs text-slate-500">© 2026 CrystalMind AI. All rights reserved. For educational and self-development purposes.</p>
              </div>
            </>
          ) : (
            /* ──────────────── KOREAN MANUSCRIPT ──────────────── */
            <>
              {/* Title Banner */}
              <div className="text-center space-y-3 border-b border-amber-500/20 pb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  OFFICIAL SECRET 2.0 WELLNESS GUIDE
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                  『시크릿 2.0: 뇌과학(RAS)으로 이구동성 끌어당기는 비밀』
                </h1>
                <p className="text-xs text-amber-300/80 font-mono">
                  A CrystalMind Wellness Guide to Rewiring Attention, Emotion, and Action
                </p>
                <p className="text-xs text-slate-400">
                  출판: CrystalMind AI 웰니스 연구소 | 총괄 기획: 노 대표
                </p>
              </div>

              {/* Note Before You Begin */}
              <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-2xl text-xs text-amber-100/90 leading-relaxed">
                <strong>📌 시작하기 전 안내문:</strong> 본 가이드는 교육 및 자기계발 자원입니다. 주의력 필터링, 스트레스 생리학, 습관 형성이라는 정식 뇌과학 및 심리학의 통상적 개념을 자기계발 및 목표 설정 연습에 적용한 자료입니다. 본 가이드는 의료적 조언이나 질병의 치료 목적이 아니며, 특정한 재정적, 건강상 성과를 보장하지 않습니다.
              </div>

              {/* Table of Contents */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <h3 className="font-bold text-amber-300 text-sm">📖 목차 (Table of Contents)</h3>
                <ul className="text-xs md:text-sm space-y-1.5 text-slate-300 list-disc list-inside">
                  <li><strong>프롤로그</strong>: 왜 의지력과 몽상만으로는 부족했을까?</li>
                  <li><strong>제1장</strong>: 주의력 필터(RAS) 훈련하기</li>
                  <li><strong>제2장</strong>: 머리가 아닌 몸(Somatic)으로 느끼기</li>
                  <li><strong>제3장</strong>: 신경계의 안심과 호흡 정화</li>
                  <li><strong>제4장</strong>: 1인치(1cm) 미세 행동의 원칙</li>
                  <li><strong>제5장</strong>: 간단한 매일의 아침 리추얼</li>
                  <li><strong>에필로그</strong>: 당신이 반복하는 연습이 곧 당신이 된다</li>
                </ul>
              </div>

              {/* Section Prologue */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
                  🔮 프롤로그: 왜 의지력과 몽상만으로는 부족했을까?
                </h2>
                <p>
                  지난 수십 년간 자기계발 문화는 간단한 공식을 말해왔습니다: "원하는 것을 그리고, 크게 외치고, 기다리라." 수천만 명이 시도했지만 대다수는 변하기보다 피로해졌습니다.
                </p>
                <div className="bg-amber-950/40 border border-amber-500/30 p-4 rounded-xl text-amber-100 italic font-serif">
                  "아직 믿지 않는 소원을 반복하는 것은 마음을 편안하게 하지 못하며, 도리어 현재 상태와 목표 사이의 갭(결핍)을 뇌에 상기시킬 뿐입니다."
                </div>
                <p>
                  본 가이드는 당신이 실제 영향력을 미칠 수 있는 3가지(주의력 필터, 몸의 체화 느낌, 1인치 행동)를 바꾸는 실용적 습관에 집중합니다.
                </p>
              </div>

              {/* Chapter 1 */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
                  🧠 제1장: 주의력 필터(RAS) 훈련하기
                </h2>
                <p>
                  뇌는 수백만 개의 자극 중 의식에 올릴 0.1%를 필터링합니다. 내가 '중요하다'고 정한 것이 비로소 눈에 띕니다. 특정 차를 사려고 마음먹는 순간 도로 위에서 그 차가 자주 보이는 것과 같습니다.
                </p>
                <div className="bg-black/60 border border-white/10 p-4 rounded-xl text-xs text-amber-300 space-y-1">
                  <p className="font-semibold text-white">💡 실천해 보세요:</p>
                  <p>매일 아침 이번 주에 주의를 기울일 1가지 기회 범주(고객 유형, 기술, 협력자)를 적어두세요. 저녁에 당신이 무엇을 포착했는지 확인하세요.</p>
                </div>
              </div>

              {/* Chapter 2 */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
                  🧬 제2장: 머리가 아닌 몸(Somatic)으로 느끼기
                </h2>
                <p>
                  시각화는 편안한 호흡, 작은 감사, 편안한 자세라는 <strong>신체 감각(Embodiment)</strong>과 결합할 때 강력해집니다.
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li><strong>감정은 기억과 동기를 강화합니다</strong>: 실제로 느낀 상태는 단순히 생각만 한 사실보다 기억에 오랫동안 남습니다.</li>
                  <li><strong>심장의 생리학적 신호</strong>: 심장의 물리적 안정을 돕는 호흡과 감사는 전신 생리 상태를 안정시키고 명확한 판단을 돕습니다.</li>
                </ul>
              </div>

              {/* Chapter 3 */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
                  🌊 제3장: 신경계의 안심과 호흡 정화
                </h2>
                <p>
                  위협이나 위기감을 느낄 때 뇌는 장기적 비전보다 단기 생존을 우선시합니다.
                </p>
                <div className="bg-black/40 border border-white/10 p-4 rounded-xl space-y-2">
                  <p className="font-semibold text-amber-300">호흡 조율 프로토콜:</p>
                  <p className="text-xs">4초간 숨을 마시고, 2초간 멈추고, 6초간 길게 내쉬는 호흡을 30~60초간 반복하세요. 길고 느린 날숨은 신체의 휴식과 회복 반응을 활성화합니다.</p>
                </div>
              </div>

              {/* Chapter 4 & 5 */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-amber-200 border-l-4 border-amber-500 pl-3">
                  🎯 제4장 & 제5장: 1인치(1cm) 미세 행동과 일상 리추얼
                </h2>
                <p>
                  "24시간 이내에 실행할 수 있는 지극히 작은 1인치 행동 하나는 무엇인가?" 이메일을 보내고, 첫 문장을 적고, 질문을 던지세요.
                </p>
                <div className="bg-amber-950/30 border border-amber-500/20 p-4 rounded-xl text-amber-200 font-semibold text-center">
                  "아침 5분, 저녁 2분. 이것이 리추얼의 전부입니다."
                </div>
              </div>

              {/* Epilogue */}
              <div className="text-center pt-6 border-t border-white/10 space-y-3">
                <h3 className="text-lg font-bold text-amber-300">👑 에필로그: 당신이 반복하는 연습이 곧 당신이 된다</h3>
                <p className="text-xs md:text-sm max-w-xl mx-auto text-slate-400">
                  오늘 시작하십시오. 편안히 호흡하고, 목표를 품고, 당신 눈앞의 1인치 행동을 실행하세요.
                </p>
                <p className="text-xs text-slate-500">© 2026 CrystalMind AI. All rights reserved. 교육 및 자기계발 목적으로 제공됩니다.</p>
              </div>
            </>
          )}
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
