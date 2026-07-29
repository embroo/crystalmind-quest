// ============================================================
// 토스페이먼츠 Configuration
// ============================================================

export const TOSS_CONFIG = {
  clientKey: import.meta.env.VITE_TOSS_CLIENT_KEY || 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq',
  customerKey: '',
  successUrl: `${window.location.origin}/payment/success`,
  failUrl: `${window.location.origin}/payment/fail`,
};

export interface TossProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
}

export const TOSS_PRODUCTS: TossProduct[] = [
  {
    id: 'digital-talisman-kr',
    name: '1:1 맞춤 AI 디지털 부적 + 왈페이퍼',
    price: 5900,
    currency: 'KRW',
  },
  {
    id: 'secret-20-ebook-kr',
    name: '시크릿 2.0 뇌과학 끌어당김 전자책',
    price: 24900,
    currency: 'KRW',
  },
];

export function generateOrderId(): string {
  const now = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return `order_${now}_${random}`;
}
