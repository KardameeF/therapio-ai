import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useTranslation } from "react-i18next";
import { Brain, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { supabase } from "../lib/supabaseClient";

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<ResetPasswordFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    // Check if we have a valid password recovery session
    const checkRecoverySession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          setIsValidSession(false);
        } else if (session) {
          // Check if this is a password recovery session
          const { data: { user } } = await supabase.auth.getUser();
          if (user && user.recovery_sent_at) {
            setIsValidSession(true);
          } else {
            setIsValidSession(false);
          }
        } else {
          setIsValidSession(false);
        }
      } catch (error) {
        console.error('Error checking recovery session:', error);
        setIsValidSession(false);
      } finally {
        setSessionChecked(true);
      }
    };

    checkRecoverySession();
  }, []);

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

  // Check if form is valid for submission
  const isFormValid = () => {
    const hasValidNewPassword = newPassword && validatePassword(newPassword) === true;
    const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
    const hasRequiredFields = newPassword && confirmPassword;
    
    return hasValidNewPassword && passwordsMatch && hasRequiredFields && isValid;
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Password reset failed",
          description: error.message,
        });
      } else {
        toast({
          variant: "success",
          title: "Password updated successfully!",
          description: "Your password has been changed. You can now log in with your new password.",
        });
        navigate("/login");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!sessionChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground-muted">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (!isValidSession) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <Card className="w-full max-w-md shadow-soft-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-xl blur-lg"></div>
                <XCircle className="relative h-12 w-12 text-red-500" />
              </div>
            </div>
            <CardTitle className="text-2xl font-heading">Invalid Reset Link</CardTitle>
            <CardDescription className="text-base">
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-foreground-muted text-center">
              Please request a new password reset link from the login page.
            </p>
            <Button 
              className="w-full" 
              onClick={() => navigate("/login")}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <CardTitle className="text-2xl font-heading">Reset Password</CardTitle>
          <CardDescription className="text-base">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">{t("auth.password")}</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  {...register("newPassword", { 
                    required: t("validation.required"),
                    validate: validatePassword
                  })}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-accent">{errors.newPassword.message}</p>
              )}
              {newPassword && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={newPassword.length >= 8 ? 'text-green-600' : 'text-gray-500'}>
                      {t("validation.password.minLength")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${/[a-z]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={/[a-z]/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}>
                      {t("validation.password.lowercase")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={/[A-Z]/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}>
                      {t("validation.password.uppercase")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${/\d/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={/\d/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}>
                      {t("validation.password.number")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${/[^A-Za-z\d]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={/[^A-Za-z\d]/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}>
                      {t("validation.password.special")}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  {...register("confirmPassword", { 
                    required: t("validation.required"),
                    validate: (value) => 
                      value === newPassword ? true : t("validation.confirmPassword")
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
              {errors.confirmPassword && (
                <p className="text-sm text-accent">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || !isFormValid()}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-foreground-muted hover:text-primary hover:underline transition-colors"
            >
              Back to Login
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
