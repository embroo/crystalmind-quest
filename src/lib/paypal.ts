// ============================================================
// PayPal Configuration — @paypal/react-paypal-js 기반
// ============================================================

export const PAYPAL_CONFIG = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
  currency: 'USD',
  intent: 'capture' as const,
};

export interface PayPalProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  currency: string;
}

export interface PayPalSubscriptionPlan {
  id: string;
  name: string;
  description: string;
  planId: string;
  price: string;
  currency: string;
  interval: 'MONTH' | 'YEAR';
}

export const PRODUCTS: PayPalProduct[] = [
  {
    id: 'digital-talisman',
    name: 'Personalized AI Crystal Talisman Pack',
    description: 'AI Crystal Talisman + HD Lockscreen Wallpaper Suite',
    price: '4.99',
    currency: 'USD',
  },
  {
    id: 'secret-20-ebook',
    name: 'Secret 2.0: The Neuroscience of Manifestation',
    description: 'Complete Secret 2.0 Neuro-Manifestation E-Book Guide',
    price: '19.99',
    currency: 'USD',
  },
];

export const SUBSCRIPTION_PLANS: PayPalSubscriptionPlan[] = [
  {
    id: 'crystalmind-monthly',
    name: 'CrystalMind Pro Membership',
    description: 'Unlimited AI Affirmations & 3D Talisman Generations',
    planId: 'YOUR_PAYPAL_PLAN_ID',
    price: '9.99',
    currency: 'USD',
    interval: 'MONTH',
  },
];
