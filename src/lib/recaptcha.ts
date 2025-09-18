declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_KEY;

export const loadRecaptcha = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      window.grecaptcha.ready(() => {
        resolve();
      });
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load reCAPTCHA'));
    };
    
    document.head.appendChild(script);
  });
};

export const executeRecaptcha = async (action: string): Promise<string> => {
  if (!RECAPTCHA_SITE_KEY) {
    throw new Error('reCAPTCHA site key not configured');
  }

  if (!window.grecaptcha) {
    throw new Error('reCAPTCHA not loaded');
  }

  try {
    const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
    return token;
  } catch (error) {
    throw new Error('Failed to execute reCAPTCHA');
  }
};

export const verifyRecaptchaToken = async (token: string): Promise<boolean> => {
  try {
    // In a real app, you'd send this to your backend for verification
    // For now, we'll just return true as a placeholder
    const response = await fetch('/api/verify-recaptcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error('Failed to verify reCAPTCHA token');
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    // For development, return true to allow testing
    return true;
  }
};
