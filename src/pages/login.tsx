import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { useAuth } from "../providers/AuthProvider";
import { useTranslation } from "react-i18next";
import { Brain, Eye, EyeOff } from "lucide-react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useToast } from "../hooks/use-toast";
import { supabase } from "../lib/supabaseClient";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

// Inner component that uses the reCAPTCHA hook
function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Login form
  const loginForm = useForm<LoginFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  // Signup form
  const signupForm = useForm<SignupFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const from = (location.state as any)?.from?.pathname || "/app";
  
  // Login form watchers
  const loginEmail = loginForm.watch("email");
  const loginPassword = loginForm.watch("password");
  const rememberMe = loginForm.watch("rememberMe");
  
  // Signup form watchers
  const signupEmail = signupForm.watch("email");
  const signupPassword = signupForm.watch("password");
  const confirmPassword = signupForm.watch("confirmPassword");

  const validatePassword = (password: string) => {
    // Use the regex pattern: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    
    if (!passwordRegex.test(password)) {
      // Provide specific feedback based on what's missing
      if (password.length < 8) return t("validation.password.minLength");
      if (!/[a-z]/.test(password)) return t("validation.password.lowercase");
      if (!/[A-Z]/.test(password)) return t("validation.password.uppercase");
      if (!/\d/.test(password)) return t("validation.password.number");
      if (!/[^A-Za-z\d]/.test(password)) return t("validation.password.special");
    }
    return true;
  };

  // Check if login form is valid for submission
  const isLoginFormValid = () => {
    const hasValidEmail = loginEmail && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(loginEmail);
    const hasValidPassword = loginPassword && loginPassword.length > 0;
    
    return hasValidEmail && hasValidPassword;
  };

  // Check if signup form is valid for submission
  const isSignupFormValid = () => {
    const hasValidEmail = signupEmail && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(signupEmail);
    const hasValidPassword = signupPassword && validatePassword(signupPassword) === true;
    const passwordsMatch = signupPassword && confirmPassword && signupPassword === confirmPassword;
    const hasRequiredFields = signupPassword && confirmPassword;
    
    return hasValidEmail && hasValidPassword && passwordsMatch && hasRequiredFields;
  };

  // Verify CAPTCHA token with Netlify function
  const verifyCaptcha = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch('/.netlify/functions/verify-captcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();
      return result.success === true;
    } catch (error) {
      console.error('Error verifying CAPTCHA:', error);
      return false;
    }
  };

  const onLoginSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);
    setCaptchaError(null);

    try {
      // Execute reCAPTCHA v3
      if (!executeRecaptcha) {
        setCaptchaError(t("auth.captchaError"));
        return;
      }

      const token = await executeRecaptcha('login');
      if (!token) {
        setCaptchaError(t("auth.captchaError"));
        return;
      }

      // Verify CAPTCHA token
      const captchaValid = await verifyCaptcha(token);
      if (!captchaValid) {
        setCaptchaError(t("auth.captchaFailed"));
        return;
      }

      // Sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (!signInError) {
        // Login successful
        toast({
          variant: "success",
          title: t("auth.welcomeBack"),
          description: t("auth.loginSuccess"),
        });
        navigate(from, { replace: true });
      } else {
        // Login error
        setError(signInError.message);
        toast({
          variant: "destructive",
          title: t("auth.loginFailed"),
          description: signInError.message,
        });
      }
    } catch (err) {
      setError(t("auth.unexpectedError"));
      toast({
        variant: "destructive",
        title: t("auth.error"),
        description: t("auth.tryAgain"),
      });
    } finally {
      setLoading(false);
    }
  };

  const onSignupSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setError(null);
    setCaptchaError(null);

    try {
      // Execute reCAPTCHA v3
      if (!executeRecaptcha) {
        setCaptchaError(t("auth.captchaError"));
        return;
      }

      const token = await executeRecaptcha('signup');
      if (!token) {
        setCaptchaError(t("auth.captchaError"));
        return;
      }

      // Verify CAPTCHA token
      const captchaValid = await verifyCaptcha(token);
      if (!captchaValid) {
        setCaptchaError(t("auth.captchaFailed"));
        return;
      }

      // Sign up
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      });

      if (!signUpError) {
        // Signup successful
        toast({
          variant: "success",
          title: t("auth.signupSuccess"),
          description: t("auth.checkEmail"),
        });
        navigate(from, { replace: true });
      } else {
        // Signup error
        setError(signUpError.message);
        toast({
          variant: "destructive",
          title: t("auth.signupFailed"),
          description: signUpError.message,
        });
      }
    } catch (err) {
      setError(t("auth.unexpectedError"));
      toast({
        variant: "destructive",
        title: t("auth.error"),
        description: t("auth.tryAgain"),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError(error.message);
        toast({
          variant: "destructive",
          title: "Google sign-in failed",
          description: error.message,
        });
      } else {
        toast({
          variant: "success",
          title: "Welcome!",
          description: "You have been logged in successfully.",
        });
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast({
        variant: "destructive",
        title: "Sign-in failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!loginEmail) {
      toast({
        variant: "destructive",
        title: t("auth.emailRequired"),
        description: t("auth.enterEmailFirst"),
      });
      return;
    }

    setIsResetting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(loginEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: t("auth.resetFailed"),
          description: error.message,
        });
      } else {
        toast({
          variant: "success",
          title: t("auth.resetEmailSent"),
          description: t("auth.checkEmailReset"),
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: t("auth.error"),
        description: t("auth.tryAgain"),
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Card className="w-full max-w-md shadow-soft-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg"></div>
              <Brain className="relative h-12 w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-heading">{t("app.title")}</CardTitle>
          <CardDescription className="text-base">
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t("auth.login")}</TabsTrigger>
              <TabsTrigger value="signup">{t("auth.signup")}</TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loginEmail">{t("auth.email")}</Label>
                  <Input
                    id="loginEmail"
                    type="email"
                    placeholder="Enter your email"
                    {...loginForm.register("email", { 
                      required: t("validation.required"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("validation.email")
                      }
                    })}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-accent">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="loginPassword">{t("auth.password")}</Label>
                  <div className="relative">
                    <Input
                      id="loginPassword"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...loginForm.register("password", { 
                        required: t("validation.required")
                      })}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-accent">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      {...loginForm.register("rememberMe")}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="rememberMe" className="text-sm font-medium">
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isResetting}
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    {isResetting ? "Sending..." : t("auth.forgotPassword")}
                  </button>
                </div>

                {captchaError && (
                  <p className="text-sm text-accent">{captchaError}</p>
                )}

                {error && (
                  <p className="text-sm text-accent bg-accent/10 p-3 rounded-lg">{error}</p>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || !isLoginFormValid()}
                >
                  {loading ? "Loading..." : t("auth.login")}
                </Button>
              </form>
            </TabsContent>
            
            {/* Signup Tab */}
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signupEmail">{t("auth.email")}</Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="Enter your email"
                    {...signupForm.register("email", { 
                      required: t("validation.required"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("validation.email")
                      }
                    })}
                  />
                  {signupForm.formState.errors.email && (
                    <p className="text-sm text-accent">{signupForm.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signupPassword">{t("auth.password")}</Label>
                  <div className="relative">
                    <Input
                      id="signupPassword"
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...signupForm.register("password", { 
                        required: t("validation.required"),
                        validate: validatePassword
                      })}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                    >
                      {showSignupPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {signupForm.formState.errors.password && (
                    <p className="text-sm text-accent">{signupForm.formState.errors.password.message}</p>
                  )}
                  {signupPassword && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${signupPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className={signupPassword.length >= 8 ? 'text-green-600' : 'text-gray-500'}>
                          {t("validation.password.minLength")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${/[a-z]/.test(signupPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className={/[a-z]/.test(signupPassword) ? 'text-green-600' : 'text-gray-500'}>
                          {t("validation.password.lowercase")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(signupPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className={/[A-Z]/.test(signupPassword) ? 'text-green-600' : 'text-gray-500'}>
                          {t("validation.password.uppercase")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${/\d/.test(signupPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className={/\d/.test(signupPassword) ? 'text-green-600' : 'text-gray-500'}>
                          {t("validation.password.number")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${/[^A-Za-z\d]/.test(signupPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className={/[^A-Za-z\d]/.test(signupPassword) ? 'text-green-600' : 'text-gray-500'}>
                          {t("validation.password.special")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      {...signupForm.register("confirmPassword", { 
                        required: t("validation.required"),
                        validate: (value) => 
                          value === signupPassword ? true : t("validation.confirmPassword")
                      })}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {signupForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-accent">{signupForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                {captchaError && (
                  <p className="text-sm text-accent">{captchaError}</p>
                )}

                {error && (
                  <p className="text-sm text-accent bg-accent/10 p-3 rounded-lg">{error}</p>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || !isSignupFormValid()}
                >
                  {loading ? "Loading..." : t("auth.signup")}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-foreground-muted">Or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
          </div>

          <div className="text-center">
            <Link to="/" className="text-sm text-foreground-muted hover:text-primary hover:underline transition-colors">
              Back to home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Main component that wraps the form with reCAPTCHA provider
export function LoginPage() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY}>
      <LoginForm />
    </GoogleReCaptchaProvider>
  );
}
