import { useState } from 'react';
import { stripePromise } from '../lib/stripe';

export interface CheckoutError {
  message: string;
  details?: string;
}

export function useStripeCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<CheckoutError | null>(null);

  const createCheckoutSession = async (priceId: string) => {
    setLoading(true);
    setError(null);

    try {
      // Call our Netlify function to create checkout session
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();

      if (!url) {
        throw new Error('No checkout URL received');
      }

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError({
        message: 'Failed to start checkout',
        details: errorMessage,
      });
      setLoading(false);
    }
  };

  return {
    createCheckoutSession,
    loading,
    error,
    clearError: () => setError(null),
  };
}
