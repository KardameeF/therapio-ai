import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../lib/supabaseClient";
import { User, Mail, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProfileFormData {
  displayName?: string;
  bio?: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState<string | null>(null);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ProfileFormData>();

  const {
    register: registerPw,
    handleSubmit: handleSubmitPw,
    reset: resetPw,
    watch: watchPw,
    formState: { errors: pwErrors }
  } = useForm<PasswordFormData>();

  const newPasswordValue = watchPw("newPassword", "");

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase
        .from("profiles")
        .select("display_name, bio")
        .eq("id", session.user.id)
        .single();
      if (data) {
        setValue("displayName", data.display_name ?? "");
        setValue("bio", data.bio ?? "");
      }
    };
    load();
  }, []);

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: data.displayName || null,
          bio: data.bio || null,
        })
        .eq("id", session.user.id);
      if (error) throw error;
      setSuccess(t("profile.settings.successMsg"));
    } catch {
      setError(t("profile.settings.errorMsg"));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleForgotPassword = async () => {
    if (!user?.email) return;
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/profile`,
    });
    if (!error) {
      setForgotPasswordSent(true);
      setTimeout(() => setForgotPasswordSent(false), 30000);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setPwLoading(true);
    setPwError(null);
    setPwSuccess(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email ?? "",
        password: data.currentPassword,
      });
      if (signInError) throw new Error(t("security.errorWrongPassword"));

      const { error: updateError } = await supabase.auth.updateUser({
        password: data.newPassword,
      });
      if (updateError) throw updateError;

      setPwSuccess(t("security.success"));
      resetPw();
    } catch (err: unknown) {
      setPwError(err instanceof Error ? err.message : t("security.errorWrongPassword"));
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{t("profile.title")}</h1>
        <p className="text-muted-foreground">{t("profile.subtitle")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4">
            <h3 className="text-base font-semibold">{t("profile.accountInfo.title")}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t("profile.accountInfo.subtitle")}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-medium">{t("profile.accountInfo.userProfile")}</div>
                <div className="text-sm text-muted-foreground">
                  {t("profile.accountInfo.memberSince")} {user?.created_at ? new Date(user.created_at).toLocaleDateString() : t("profile.accountInfo.unknown")}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {t("profile.accountInfo.email")}
              </Label>
              <Input value={user?.email || ''} disabled className="text-base" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4">
            <h3 className="text-base font-semibold">{t("profile.settings.title")}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t("profile.settings.subtitle")}</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">{t("profile.settings.displayName")}</Label>
              <Input
                id="displayName"
                {...register("displayName")}
                placeholder={t("profile.settings.displayNamePlaceholder")}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">{t("profile.settings.bio")}</Label>
              <Input
                id="bio"
                {...register("bio")}
                placeholder={t("profile.settings.bioPlaceholder")}
                className="text-base"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            {success && (
              <p className="text-sm text-green-600">{success}</p>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t("profile.settings.saving") : t("profile.settings.save")}
            </Button>
          </form>
        </div>
      </div>

      {/* Security — password change */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-base font-semibold">{t("security.title")}</h3>
          <p className="text-sm text-muted-foreground mt-1">{t("security.subtitle")}</p>
        </div>
        <form onSubmit={handleSubmitPw(onPasswordSubmit)} className="space-y-4">

          {/* Current password */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">{t("security.currentPassword")}</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrent ? "text" : "password"}
                {...registerPw("currentPassword", { required: true })}
                className="pr-12 text-base"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {pwErrors.currentPassword && (
              <p className="text-xs text-destructive">{t("validation.required")}</p>
            )}
            <div className="flex justify-end mt-1">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={forgotPasswordSent}
                className="text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-2 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {forgotPasswordSent ? t("profile.resetEmailSent") : t("profile.forgotPassword")}
              </button>
            </div>
          </div>

          {/* New password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">{t("security.newPassword")}</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNew ? "text" : "password"}
                {...registerPw("newPassword", {
                  required: true,
                  minLength: { value: 8, message: t("security.errorMinLength") },
                  validate: (v) => /\d/.test(v) || t("security.errorNoNumber"),
                })}
                className="pr-12 text-base"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {pwErrors.newPassword && (
              <p className="text-xs text-destructive">{pwErrors.newPassword.message}</p>
            )}
          </div>

          {/* Confirm new password */}
          <div className="space-y-2">
            <Label htmlFor="confirmNewPassword">{t("security.confirmNewPassword")}</Label>
            <div className="relative">
              <Input
                id="confirmNewPassword"
                type={showConfirm ? "text" : "password"}
                {...registerPw("confirmNewPassword", {
                  required: true,
                  validate: (v) => v === newPasswordValue || t("security.errorPasswordsNoMatch"),
                })}
                className="pr-12 text-base"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {pwErrors.confirmNewPassword && (
              <p className="text-xs text-destructive">{pwErrors.confirmNewPassword.message}</p>
            )}
          </div>

          {pwError && <p className="text-sm text-destructive">{pwError}</p>}
          {pwSuccess && <p className="text-sm text-green-600">{pwSuccess}</p>}

          <Button type="submit" disabled={pwLoading} variant="outline" className="w-full">
            {pwLoading ? t("security.changing") : t("security.changePassword")}
          </Button>
        </form>
      </div>

      <div className="rounded-2xl border border-destructive/20 bg-card p-6">
        <div className="mb-4">
          <h3 className="text-base font-semibold">{t("profile.dangerZone.title")}</h3>
          <p className="text-sm text-muted-foreground mt-1">{t("profile.dangerZone.subtitle")}</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between">
          <div>
            <div className="font-medium">{t("profile.dangerZone.signOut")}</div>
            <div className="text-sm text-muted-foreground">
              {t("profile.dangerZone.signOutDesc")}
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="w-full sm:w-auto">
            {t("profile.dangerZone.signOut")}
          </Button>
        </div>
      </div>
    </div>
  );
}
