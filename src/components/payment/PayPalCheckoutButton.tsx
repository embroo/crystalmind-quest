import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import type { PayPalProduct } from '../../lib/paypal';

interface PayPalCheckoutButtonProps {
  product: PayPalProduct;
  onSuccess: (details: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
}

const PayPalCheckoutButton: React.FC<PayPalCheckoutButtonProps> = ({
  product,
  onSuccess,
  onError,
  onCancel,
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <PayPalButtons
        style={{
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: 50,
          tagline: false,
        }}
        createOrder={(_data, actions) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: product.description,
                custom_id: product.id,
                amount: {
                  currency_code: product.currency,
                  value: product.price,
                  breakdown: {
                    item_total: {
                      currency_code: product.currency,
                      value: product.price,
                    },
                  },
                },
                items: [
                  {
                    name: product.name,
                    unit_amount: {
                      currency_code: product.currency,
                      value: product.price,
                    },
                    quantity: '1',
                    category: 'DIGITAL_GOODS' as const,
                  },
                ],
              },
            ],
            application_context: {
              brand_name: 'CrystalMind AI',
              shipping_preference: 'NO_SHIPPING' as const,
              user_action: 'PAY_NOW' as const,
            },
          });
        }}
        onApprove={async (_data, actions) => {
          if (actions.order) {
            const details = await actions.order.capture();
            onSuccess(details);
          }
        }}
        onError={(err) => {
          console.error('[PayPal] Error:', err);
          onError?.(err);
        }}
        onCancel={() => {
          onCancel?.();
        }}
      />
    </div>
  );
};

export default PayPalCheckoutButton;
