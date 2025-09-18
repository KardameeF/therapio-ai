import { useEffect, useState } from "react";
import { loadRecaptcha } from "../lib/recaptcha";

interface RecaptchaWrapperProps {
  children: React.ReactNode;
}

export function RecaptchaWrapper({ children }: RecaptchaWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeRecaptcha = async () => {
      try {
        await loadRecaptcha();
        setIsLoaded(true);
      } catch (err) {
        console.warn('Failed to load reCAPTCHA:', err);
        setError('reCAPTCHA failed to load');
        // Still render children even if reCAPTCHA fails
        setIsLoaded(true);
      }
    };

    initializeRecaptcha();
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading security verification...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      {error && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded text-sm">
          Security verification unavailable
        </div>
      )}
    </>
  );
}
