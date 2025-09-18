import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useAuth } from "../providers/AuthProvider";
import { useTranslation } from "react-i18next";
import { Brain, CheckCircle, XCircle } from "lucide-react";
import { executeRecaptcha } from "../lib/recaptcha";
import { useToast } from "../hooks/use-toast";

interface LoginFormData {
  fullName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LoginFormData>();

  const from = (location.state as any)?.from?.pathname || "/app";
  const password = watch("password");

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

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      // Execute reCAPTCHA for signup/login
      let recaptchaToken = "";
      try {
        recaptchaToken = await executeRecaptcha(isSignUp ? "signup" : "login");
      } catch (recaptchaError) {
        console.warn("reCAPTCHA failed:", recaptchaError);
        // Continue without reCAPTCHA for development
      }

      const { error } = isSignUp 
        ? await signUp(data.email, data.password)
        : await signIn(data.email, data.password);

      if (error) {
        setError(error.message);
        toast({
          variant: "destructive",
          title: isSignUp ? "Sign up failed" : "Login failed",
          description: error.message,
        });
      } else {
        toast({
          variant: "success",
          title: isSignUp ? "Account created successfully!" : "Welcome back!",
          description: isSignUp 
            ? "Your account has been created successfully." 
            : "You have been logged in successfully.",
        });
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError("An unexpected error occurred");
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
            {isSignUp ? t("auth.createAccount") : t("auth.welcomeBack")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName">{t("auth.fullName")}</Label>
                <Input
                  id="fullName"
                  type="text"
                  {...register("fullName", { 
                    required: isSignUp ? t("validation.required") : false 
                  })}
                />
                {errors.fullName && (
                  <p className="text-sm text-accent">{errors.fullName.message}</p>
                )}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { 
                  required: t("validation.required"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t("validation.email")
                  }
                })}
              />
              {errors.email && (
                <p className="text-sm text-accent">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { 
                  required: t("validation.required"),
                  validate: isSignUp ? validatePassword : undefined
                })}
              />
              {errors.password && (
                <p className="text-sm text-accent">{errors.password.message}</p>
              )}
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", { 
                    required: isSignUp ? t("validation.required") : false,
                    validate: (value) => 
                      isSignUp && value !== password ? t("validation.confirmPassword") : true
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-accent">{errors.confirmPassword.message}</p>
                )}
              </div>
            )}

            {error && (
              <p className="text-sm text-accent bg-accent/10 p-3 rounded-lg">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : (isSignUp ? t("auth.signup") : t("auth.login"))}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-foreground-muted">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {isSignUp ? t("auth.signupWithGoogle") : t("auth.loginWithGoogle")}
          </Button>

          <div className="text-center text-sm">
            {isSignUp ? (
              <>
                {t("auth.alreadyHaveAccount")}{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-primary hover:underline font-medium"
                >
                  {t("auth.login")}
                </button>
              </>
            ) : (
              <>
                {t("auth.dontHaveAccount")}{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-primary hover:underline font-medium"
                >
                  {t("auth.signup")}
                </button>
              </>
            )}
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
