// ============================================================
// CrystalMind AI — Content Configuration (Bilingual EN / KR)
// ============================================================

export interface LanguageContent {
  brandName: string;
  tagline: string;
  hero: {
    badge: string;
    titleFirst: string;
    titleHighlight: string;
    titleSecond: string;
    subtitle: string;
    ctaButton: string;
    audioToggleOn: string;
    audioToggleOff: string;
  };
  tuner: {
    sectionTitle: string;
    sectionSubtitle: string;
    wishPlaceholder: string;
    frequencySelectLabel: string;
    frequencies: Array<{
      id: string;
      hz: string;
      name: string;
      crystalName: string;
      color: string;
      desc: string;
    }>;
    tuneButton: string;
    tuningProgress: string;
  };
  affirmationCard: {
    badge: string;
    actionLabel: string;
    actionPlaceholder: string;
    saveActionBtn: string;
    downloadWallpaperBtn: string;
    pwaInstallBtn: string;
    shareBtn: string;
  };
  vault: {
    title: string;
    subtitle: string;
    gratitudeTitle: string;
    actionLoggedMsg: string;
  };
  monetization: {
    title: string;
    subtitle: string;
    digitalTalismanTitle: string;
    digitalTalismanPrice: string;
    ebookTitle: string;
    ebookPrice: string;
    paypalBtnText: string;
  };
  footer: {
    rights: string;
    disclaimer: string;
  };
}

export const CONTENT: Record<'en' | 'kr', LanguageContent> = {
  en: {
    brandName: 'CrystalMind AI',
    tagline: 'Secret 2.0 — Rewire Your Brain with RAS & 528Hz Frequencies',
    hero: {
      badge: 'BIOLOGICAL NEURO-TUNING • LAW OF ATTRACTION 2.0',
      titleFirst: 'Rewire Your',
      titleHighlight: 'RAS Antenna',
      titleSecond: 'For Wealth & Harmony',
      subtitle:
        'Move beyond passive wishing. Tune your Reticular Activating System (RAS) with 528Hz Solfeggio sound waves & interactive 3D crystal resonance.',
      ctaButton: '🔮 Tune Frequency (10s)',
      audioToggleOn: '🔊 528Hz Solfeggio Active',
      audioToggleOff: '🔇 Sound Off',
    },
    tuner: {
      sectionTitle: 'Select Your Manifestation Frequency',
      sectionSubtitle: 'Choose your crystal frequency node and state your target intention for today.',
      wishPlaceholder: 'e.g., I want to double my business revenue with clarity and confidence...',
      frequencySelectLabel: 'Choose Frequency Node:',
      frequencies: [
        {
          id: 'wealth',
          hz: '528 Hz',
          name: 'Abundance & Transformation',
          crystalName: 'Golden Citrine & Pyrite',
          color: 'from-amber-400 to-yellow-600',
          desc: 'Rewires RAS filter for financial opportunities & high-value breakthroughs.',
        },
        {
          id: 'love',
          hz: '639 Hz',
          name: 'Relational Coherence',
          crystalName: 'Rose Quartz',
          color: 'from-pink-400 to-rose-600',
          desc: 'Harmonizes heart-brain nervous system for deep love & magnetism.',
        },
        {
          id: 'clarity',
          hz: '741 Hz',
          name: 'Intuition & Awakening',
          crystalName: 'Amethyst Quartz',
          color: 'from-purple-400 to-indigo-600',
          desc: 'Clears cognitive noise, anxiety, and sharpens strategic decision-making.',
        },
        {
          id: 'peace',
          hz: '432 Hz',
          name: 'Nervous System Safety',
          crystalName: 'Clear Quartz Crystal',
          color: 'from-cyan-300 to-blue-500',
          desc: 'Activates parasympathetic nervous system to release deep subconscious fear.',
        },
      ],
      tuneButton: '✨ Activate Crystal Frequency & Recalibrate',
      tuningProgress: 'Harmonizing 528Hz Sound Wave & Gemini AI Affirmation...',
    },
    affirmationCard: {
      badge: 'AI SECRET 2.0 AFFIRMATION CARD',
      actionLabel: 'Your 24-Hour 1cm Micro-Action',
      actionPlaceholder: 'What is 1 tiny action you will complete within 24 hours?',
      saveActionBtn: '🔒 Log Action to Gratitude Vault',
      downloadWallpaperBtn: '🖼️ Download HD Lockscreen Wallpaper',
      pwaInstallBtn: '📲 Add Crystal App to Home Screen',
      shareBtn: '✨ Share Frequency Card',
    },
    vault: {
      title: 'Your Gratitude Crystal Vault',
      subtitle: 'Every micro-action and gratitude entry energizes your neural crystal.',
      gratitudeTitle: 'Daily Gratitude Entry',
      actionLoggedMsg: 'Your 1cm action has been logged into Firestore. Neural alignment locked!',
    },
    monetization: {
      title: 'Upgrade Your Frequency Arsenal',
      subtitle: 'Gain permanent access to custom digital talismans and the complete Secret 2.0 Neuro-Guide.',
      digitalTalismanTitle: 'Personalized AI Crystal Talisman + Lockscreen Pack',
      digitalTalismanPrice: '$4.99 USD',
      ebookTitle: 'Secret 2.0: The Neuroscience of Manifestation (E-Book)',
      ebookPrice: '$19.99 USD',
      paypalBtnText: 'Pay via PayPal / Credit Card ($ USD)',
    },
    footer: {
      rights: '© 2026 CrystalMind AI. All rights reserved.',
      disclaimer: 'Based on Reticular Activating System (RAS) neuroscience and Solfeggio audio frequencies.',
    },
  },
  kr: {
    brandName: 'CrystalMind AI',
    tagline: '시크릿 2.0 — RAS 뇌 안테나 & 528Hz 우주 주파수 조율',
    hero: {
      badge: '신경계 체화 • 끌어당김의 법칙 2.0 뇌과학',
      titleFirst: '당신의',
      titleHighlight: 'RAS 뇌 안테나',
      titleSecond: '를 부와 치유에 맞추세요',
      subtitle:
        '막연한 몽상은 끝났습니다. 528Hz 솔페지오 우주 파동과 인터랙티브 3D 크리스탈로 뇌의 망상활성계(RAS)를 재배선하세요.',
      ctaButton: '🔮 10초 주파수 조율 시작',
      audioToggleOn: '🔊 528Hz 솔페지오 주파수 작동 중',
      audioToggleOff: '🔇 소리 켜기',
    },
    tuner: {
      sectionTitle: '오늘 우주로 쏘아올릴 주파수 선택',
      sectionSubtitle: '원하는 크리스탈 주파수 노드를 선택하고 오늘 집중할 의도를 적어주세요.',
      wishPlaceholder: '예시: 명확한 자신감으로 이번 달 사업 매출을 2배로 올린다...',
      frequencySelectLabel: '주파수 노드 선택:',
      frequencies: [
        {
          id: 'wealth',
          hz: '528 Hz',
          name: '풍요와 기적 (Wealth)',
          crystalName: '황수정 & 파이라이트',
          color: 'from-amber-400 to-yellow-600',
          desc: '재물과 부의 기회를 즉각 알아보도록 뇌의 RAS 필터를 재배선합니다.',
        },
        {
          id: 'love',
          hz: '639 Hz',
          name: '사랑과 조화 (Love)',
          crystalName: '장미수정',
          color: 'from-pink-400 to-rose-600',
          desc: '심장-뇌 파동을 조율하여 인연과 사랑의 끌어당김 주파수를 맞춥니다.',
        },
        {
          id: 'clarity',
          hz: '741 Hz',
          name: '통찰과 마인드 (Clarity)',
          crystalName: '아메지스트 (자수정)',
          color: 'from-purple-400 to-indigo-600',
          desc: '불안과 뇌의 소음을 정화하고 명확한 전략적 판단력을 줍니다.',
        },
        {
          id: 'peace',
          hz: '432 Hz',
          name: '신경계 안심 (Peace)',
          crystalName: '명경 백수정',
          color: 'from-cyan-300 to-blue-500',
          desc: '부교감 신경을 활성화하여 무의식 속 결핍과 불안을 완전 정화합니다.',
        },
      ],
      tuneButton: '✨ 크리스탈 주파수 동기화 & 확언 생성',
      tuningProgress: '528Hz 음파 조율 & Gemini AI 확언 생성 중...',
    },
    affirmationCard: {
      badge: 'AI 시크릿 2.0 확언 카드',
      actionLabel: '오늘 24시간 이내 실천할 1cm 행동',
      actionPlaceholder: '24시간 안에 이룰 수 있는 지극히 작은 행동 1가지는?',
      saveActionBtn: '🔒 감사 보석함에 1cm 행동 저장',
      downloadWallpaperBtn: '🖼️ HD 잠금화면 왈페이퍼 다운로드',
      pwaInstallBtn: '📲 스마트폰 홈 화면에 크리스탈 앱 추가',
      shareBtn: '✨ 확언 카드 공유하기',
    },
    vault: {
      title: '나만의 감사 보석함 (Gratitude Vault)',
      subtitle: '매일 기록된 1cm 행동과 감사가 쌓여 나만의 크리스탈이 더 맑게 빛납니다.',
      gratitudeTitle: '오늘의 감사 3가지',
      actionLoggedMsg: '1cm 행동이 Firestore DB에 안전하게 저장되었습니다!',
    },
    monetization: {
      title: '프리미엄 웰니스 라인업',
      subtitle: '나만의 커스텀 AI 디지털 부적과 시크릿 2.0 뇌과학 전자책을 소장하세요.',
      digitalTalismanTitle: '1:1 맞춤 AI 크리스탈 디지털 부적 + 왈페이퍼',
      digitalTalismanPrice: '$4.99 USD',
      ebookTitle: '시크릿 2.0: 뇌과학으로 이구동성 끌어당기는 비밀 (전자책)',
      ebookPrice: '$19.99 USD',
      paypalBtnText: 'PayPal 및 해외 신용/체크카드 결제 ($ USD)',
    },
    footer: {
      rights: '© 2026 CrystalMind AI. All rights reserved.',
      disclaimer: '뇌의 망상활성계(RAS) 원리 및 528Hz 솔페지오 사운드 파동 기반.',
    },
  },
};
