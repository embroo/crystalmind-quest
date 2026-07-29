// ============================================================
// AI Secret 2.0 Affirmation Generator (Gemini API & Fallback)
// ============================================================

export interface AffirmationResult {
  headline: string;
  affirmationText: string;
  rasTip: string;
  actionPrompt: string;
}

const FALLBACK_AFFIRMATIONS: Record<string, Record<'en' | 'kr', AffirmationResult>> = {
  wealth: {
    en: {
      headline: '✨ 528Hz Wealth Alignment Active',
      affirmationText:
        '“High-value financial opportunities now continuously flow into my field. My brain’s RAS filter naturally identifies and captures massive abundance.”',
      rasTip: '🧠 RAS Neuroscience Tip: Notice 1 unexpected opportunity or financial idea today and act on it within 24 hours.',
      actionPrompt: 'Write down 1 small high-value action to complete today.',
    },
    kr: {
      headline: '✨ 528Hz 풍요와 기적의 주파수 동기화',
      affirmationText:
        '“이미 모든 풍요와 기회의 주파수가 내 뇌의 RAS 안테나에 선명하게 포착되고 있습니다. 나는 가치 있는 부를 당당하게 수용합니다.”',
      rasTip: '🧠 RAS 뇌과학 팁: 오늘 눈에 띄는 1가지 의외의 기회나 수입 아이디어를 놓치지 말고 24시간 이내 실천하세요.',
      actionPrompt: '오늘 24시간 내 실행할 1cm 작은 실천 행동 1가지를 적어보세요.',
    },
  },
  love: {
    en: {
      headline: '✨ 639Hz Heart-Brain Coherence',
      affirmationText:
        '“My nervous system is calm, magnetic, and deeply open. I radiate unconditional love and effortlessly attract authentic, fulfilling relationships.”',
      rasTip: '🧠 Somatic Tip: Take 3 deep diaphragmatic breaths and feel your heart expanding into peaceful magnetism.',
      actionPrompt: 'Send a genuine 1-line message of appreciation to someone today.',
    },
    kr: {
      headline: '✨ 639Hz 심장-뇌 파동 조율 완료',
      affirmationText:
        '“나의 신경계는 완전히 안심하고 열려 있습니다. 나는 조건 없는 사랑의 진동수를 발산하며 깊고 진실된 인연을 자연스럽게 일치시킵니다.”',
      rasTip: '🧠 소매틱 팁: 깊게 3번 호흡하며 심장이 여유롭고 따뜻해지는 안전감을 몸으로 느껴보세요.',
      actionPrompt: '오늘 소중한 사람에게 따뜻한 진심의 감사 메시지 1줄을 보내보세요.',
    },
  },
  clarity: {
    en: {
      headline: '✨ 741Hz Intuitive Clarity',
      affirmationText:
        '“All mental clutter dissolves. My mind is crystal clear, sharp, and aligned with effortless wisdom and decision-making.”',
      rasTip: '🧠 Clarity Tip: Focus single-mindedly on your top priority task without multi-tasking.',
      actionPrompt: 'Remove 1 unnecessary distraction from your workspace now.',
    },
    kr: {
      headline: '✨ 741Hz 통찰과 명경 자수정 주파수',
      affirmationText:
        '“머릿속의 모든 소음과 불안이 깨끗이 정화됩니다. 나의 의식은 맑은 수정처럼 명확하며, 가장 최고의 선택을 직관적으로 직시합니다.”',
      rasTip: '🧠 통찰 팁: 멀티태스킹을 멈추고 오늘 가장 중요한 핵심 과제 1개에 집중하세요.',
      actionPrompt: '책상 위나 스마트폰의 불필요한 방해요소 1가지를 정돈해보세요.',
    },
  },
  peace: {
    en: {
      headline: '✨ 432Hz Cosmic Nervous System Safety',
      affirmationText:
        '“I am completely safe in this present moment. The universe supports my highest good, and I release all subconscious resistance and doubt.”',
      rasTip: '🧠 Nervous System Tip: Relax your shoulders and jaw. Safety in the body allows rapid manifestation.',
      actionPrompt: 'Take a 2-minute quiet breathwork pause.',
    },
    kr: {
      headline: '✨ 432Hz 부교감 신경계 안전감 조율',
      affirmationText:
        '“나는 지금 이 순간 완전히 안전하며 충분합니다. 내 무의식 속 모든 결핍과 두려움은 맑은 빛으로 정화되고 평온이 흐릅니다.”',
      rasTip: '🧠 신경계 팁: 어깨와 턱의 힘을 툭 빼보세요. 몸이 편안할 때 끌어당김 엔진이 진정으로 가동됩니다.',
      actionPrompt: '눈을 감고 2분간 깊은 이완 호흡을 진행해보세요.',
    },
  },
};

export async function generateSecretAffirmation(
  freqId: string,
  userWish: string,
  lang: 'en' | 'kr'
): Promise<AffirmationResult> {
  const fallback = FALLBACK_AFFIRMATIONS[freqId]?.[lang] || FALLBACK_AFFIRMATIONS.wealth[lang];
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || !userWish.trim()) {
    return fallback;
  }

  try {
    const prompt = `You are Rhonda Byrne & Dr. Joe Dispenza style Secret 2.0 Neuro-Manifestation Expert.
Language: ${lang === 'kr' ? 'Korean' : 'English'}
User target intention: "${userWish}"
Frequency type: ${freqId}

Generate a JSON object with this exact structure (no markdown formatting, plain JSON string):
{
  "headline": "✨ short frequency title",
  "affirmationText": "“1-2 sentence powerful present-tense Secret 2.0 affirmation in quotes”",
  "rasTip": "🧠 short Reticular Activating System (RAS) neuroscience advice",
  "actionPrompt": "short 1cm micro action suggestion"
}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!res.ok) {
      console.warn('[GeminiAPI] Response error, using fallback');
      return fallback;
    }

    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleanJsonStr = rawText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleanJsonStr);

    return {
      headline: parsed.headline || fallback.headline,
      affirmationText: parsed.affirmationText || fallback.affirmationText,
      rasTip: parsed.rasTip || fallback.rasTip,
      actionPrompt: parsed.actionPrompt || fallback.actionPrompt,
    };
  } catch (err) {
    console.warn('[GeminiAPI] Failed to call API, fallback active:', err);
    return fallback;
  }
}
