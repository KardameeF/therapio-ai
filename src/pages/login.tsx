import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { supabase } from "../lib/supabaseClient";
import { LegalModal } from "../components/LegalModal";
import { useLegalModal } from "../hooks/useLegalModal";

const getStrength = (pw: string) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[a-z]/.test(pw)) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^a-zA-Z0-9]/.test(pw)) s++;
  return s;
};

const STRENGTH_COLOR = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-emerald-500"];

type View = "login" | "register" | "forgot";

function LoginFormInner({ defaultTab = "login" }: { defaultTab?: "login" | "register" }) {
  const [view, setView] = useState<View>(defaultTab);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // signup
  const [displayName, setDisplayName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignupPw, setShowSignupPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // forgot
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { legalModal, openLegal, closeLegal } = useLegalModal();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const emailRef = useRef<HTMLInputElement>(null);
  const from = (location.state as any)?.from?.pathname || "/app";

  useEffect(() => {
    emailRef.current?.focus();
  }, [view]);

  const verifyCaptcha = async (token: string): Promise<boolean> => {
    try {
      const res = await fetch("/.netlify/functions/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const result = await res.json();
      return result.success === true;
    } catch {
      return false;
    }
  };

  const clearErrors = () => setFieldErrors({});

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    setLoading(true);
    try {
      if (!executeRecaptcha) { setFieldErrors({ form: t("auth.captchaError") }); return; }
      const token = await executeRecaptcha("login");
      if (!token || !(await verifyCaptcha(token))) { setFieldErrors({ form: t("auth.captchaFailed") }); return; }

      const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
      if (error) {
        setFieldErrors({ password: t("auth.wrongEmailOrPassword") });
      } else {
        navigate(from, { replace: true });
      }
    } catch {
      setFieldErrors({ form: t("auth.unexpectedError") });
    } finally {
      setLoading(false);
    }
  };

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    const errs: Record<string, string> = {};
    if (signupPassword !== confirmPassword) errs.confirmPassword = t("auth.passwordsDontMatch");
    if (signupPassword.length < 8) errs.password = t("validation.password.minLength");
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }

    setLoading(true);
    try {
      if (!executeRecaptcha) { setFieldErrors({ form: t("auth.captchaError") }); return; }
      const token = await executeRecaptcha("signup");
      if (!token || !(await verifyCaptcha(token))) { setFieldErrors({ form: t("auth.captchaFailed") }); return; }

      const { data, error } = await supabase.auth.signUp({ email: signupEmail, password: signupPassword });
      if (error) {
        if (error.message.toLowerCase().includes("already")) {
          setFieldErrors({ email: t("auth.emailAlreadyRegistered") });
        } else {
          setFieldErrors({ form: error.message });
        }
      } else {
        if (displayName && data.user) {
          await supabase.from("profiles").update({ display_name: displayName }).eq("id", data.user.id);
        }
        navigate(from, { replace: true });
      }
    } catch {
      setFieldErrors({ form: t("auth.unexpectedError") });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    clearErrors();
    try {
      const { error } = await signInWithGoogle();
      if (error) { setFieldErrors({ form: error.message }); setLoading(false); }
    } catch {
      setFieldErrors({ form: t("auth.unexpectedError") });
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setIsResetting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setIsResetting(false);
    if (!error) setForgotSent(true);
  };

  const strength = getStrength(signupPassword);
  const strengthKeys = ["", "strength.veryWeak", "strength.weak", "strength.medium", "strength.strong", "strength.veryStrong"];

  const inputCls = "w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors";
  const btnPrimaryCls = "w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  return (
    <>
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 28 28" fill="none" className="text-primary">
            <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25"/>
            <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
            <circle cx="14" cy="14" r="2.5" fill="currentColor"/>
            <ellipse cx="14" cy="14" rx="12" ry="4.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" transform="rotate(-30 14 14)" className="icon-orbit"/>
          </svg>
        </div>
        <h2 className="text-center text-xl font-semibold mb-1">{t("app.title")}</h2>

        {/* ===== FORGOT VIEW ===== */}
        {view === "forgot" ? (
          <div className="mt-6 space-y-4">
            <button onClick={() => { setView("login"); setForgotSent(false); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("auth.backToLogin")}
            </button>
            <h3 className="text-lg font-semibold">{t("auth.resetPassword")}</h3>
            <p className="text-sm text-muted-foreground">{t("auth.resetPasswordDesc")}</p>
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="email@example.com"
                className={inputCls}
                autoFocus
              />
              <button type="submit" disabled={isResetting || !forgotEmail} className={btnPrimaryCls}>
                {isResetting
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> {t("auth.sendingResetLink")}</>
                  : t("auth.sendResetLink")}
              </button>
            </form>
            {forgotSent && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 text-sm text-green-700 dark:text-green-300">
                ✓ {t("auth.resetSentTo")} <strong>{forgotEmail}</strong>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Dynamic subtitle */}
            <p className="text-center text-sm text-muted-foreground mb-6">
              {view === "login" ? t("auth.welcomeBack") : t("auth.createAccount")}
            </p>

            {/* Underline tabs */}
            <div className="flex border-b border-border mb-6">
              <button
                className={`pb-3 px-1 mr-6 text-sm font-medium transition-colors border-b-2 -mb-px ${view === "login" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                onClick={() => { setView("login"); clearErrors(); }}
              >
                {t("auth.login")}
              </button>
              <button
                className={`pb-3 px-1 text-sm font-medium transition-colors border-b-2 -mb-px ${view === "register" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                onClick={() => { setView("register"); clearErrors(); }}
              >
                {t("auth.signup")}
              </button>
            </div>

            {/* ===== LOGIN ===== */}
            {view === "login" && (
              <form onSubmit={onLogin} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">{t("auth.email")}</label>
                  <input ref={emailRef} type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="email@example.com" className={inputCls} autoFocus />
                  {fieldErrors.email && <p className="text-xs text-destructive mt-1">{fieldErrors.email}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">{t("auth.password")}</label>
                  <div className="relative">
                    <input type={showLoginPw ? "text" : "password"} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className={`${inputCls} pr-10`} />
                    <button type="button" onClick={() => setShowLoginPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-muted-foreground hover:text-foreground transition-colors">
                      {showLoginPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {fieldErrors.password && <p className="text-xs text-destructive mt-1">{fieldErrors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="accent-primary" />
                    <span className="text-xs text-muted-foreground">Remember me</span>
                  </label>
                  <button type="button" onClick={() => { setView("forgot"); setForgotEmail(loginEmail); }} className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-2">
                    {t("auth.forgotPassword")}
                  </button>
                </div>

                {fieldErrors.form && <p className="text-xs text-destructive bg-destructive/10 p-3 rounded-xl">{fieldErrors.form}</p>}

                <button type="submit" disabled={loading || !loginEmail || !loginPassword} className={btnPrimaryCls}>
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> {t("auth.signingIn")}</> : t("auth.login")}
                </button>
              </form>
            )}

            {/* ===== REGISTER ===== */}
            {view === "register" && (
              <form onSubmit={onSignup} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">{t("auth.displayName")}</label>
                  <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder={t("auth.displayNamePlaceholder")} className={inputCls} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">{t("auth.email")}</label>
                  <input ref={emailRef} type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} placeholder="email@example.com" className={inputCls} autoFocus />
                  {fieldErrors.email && <p className="text-xs text-destructive mt-1">{fieldErrors.email}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">{t("auth.password")}</label>
                  <div className="relative">
                    <input type={showSignupPw ? "text" : "password"} value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} className={`${inputCls} pr-10`} />
                    <button type="button" onClick={() => setShowSignupPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-muted-foreground hover:text-foreground transition-colors">
                      {showSignupPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {fieldErrors.password && <p className="text-xs text-destructive mt-1">{fieldErrors.password}</p>}
                  {signupPassword && (
                    <>
                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? STRENGTH_COLOR[strength] : "bg-border"}`} />
                        ))}
                      </div>
                      {strength > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">{t(`auth.${strengthKeys[strength]}`)}</p>
                      )}
                    </>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">{t("auth.confirmPassword")}</label>
                  <div className="relative">
                    <input type={showConfirmPw ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`${inputCls} pr-10`} />
                    <button type="button" onClick={() => setShowConfirmPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-muted-foreground hover:text-foreground transition-colors">
                      {showConfirmPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {fieldErrors.confirmPassword && <p className="text-xs text-destructive mt-1">{fieldErrors.confirmPassword}</p>}
                </div>

                {/* Terms & Privacy checkbox */}
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="mt-0.5 accent-primary" />
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    {t("auth.agreeToTermsBefore")}
                    <button type="button" onClick={() => openLegal("terms")} className="text-primary hover:underline mx-1">{t("auth.termsOfService")}</button>
                    {t("auth.agreeToTermsAnd")}
                    <button type="button" onClick={() => openLegal("privacy")} className="text-primary hover:underline mx-1">{t("auth.privacyPolicy")}</button>
                    {t("auth.agreeToTermsAfter")}
                  </span>
                </label>

                {fieldErrors.form && <p className="text-xs text-destructive bg-destructive/10 p-3 rounded-xl">{fieldErrors.form}</p>}

                <button type="submit" disabled={loading || !signupEmail || !signupPassword || !confirmPassword || !agreedToTerms} className={btnPrimaryCls}>
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> {t("auth.creatingAccount")}</> : t("auth.signup")}
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">{t("auth.continueWith")}</span>
              </div>
            </div>

            {/* Google */}
            <button onClick={handleGoogleSignIn} disabled={loading} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-background hover:bg-secondary text-foreground text-sm font-medium transition-colors disabled:opacity-40">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t("auth.continueWithGoogle")}
            </button>

            <div className="text-center mt-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors">
                {t("auth.backToHome")}
              </Link>
            </div>
          </>
        )}
      </div>
      <LegalModal open={legalModal} onClose={closeLegal} />
    </>
  );
}

export function LoginForm({ onSuccess, defaultTab = "login" }: { onSuccess?: () => void; defaultTab?: "login" | "register" } = {}) {
  return <LoginFormInner defaultTab={defaultTab} />;
}

export function LoginPage() {
  const { t } = useTranslation();
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
      <div className="relative min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="absolute top-4 left-4">
          <Link
            to="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("auth.backToHome")}
          </Link>
        </div>
        <LoginFormInner />
      </div>
    </GoogleReCaptchaProvider>
  );
}
