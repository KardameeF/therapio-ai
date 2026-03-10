import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../lib/supabaseClient";
import { User, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProfileFormData {
  displayName?: string;
  bio?: string;
}

export function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ProfileFormData>();

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
      setSuccess("Профилът е обновен успешно!");
    } catch {
      setError("Грешка при обновяване. Опитай отново.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Профил</h1>
        <p className="text-muted-foreground">Настройки на акаунта</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Информация за акаунта</CardTitle>
            <CardDescription>Основни данни</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-medium">Потребителски профил</div>
                <div className="text-sm text-muted-foreground">
                  Член от {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Неизвестно'}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Имейл
              </Label>
              <Input value={user?.email || ''} disabled />
            </div>

          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Настройки на профила</CardTitle>
            <CardDescription>Обнови профилната информация</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Показвано име</Label>
                <Input
                  id="displayName"
                  {...register("displayName")}
                  placeholder="Въведи показвано име"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Кратко описание</Label>
                <Input
                  id="bio"
                  {...register("bio")}
                  placeholder="Напиши нещо за себе си"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              {success && (
                <p className="text-sm text-green-600">{success}</p>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Запазване..." : "Запази промените"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Опасна зона</CardTitle>
          <CardDescription>Необратими действия</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Изход</div>
              <div className="text-sm text-muted-foreground">
                Излез от акаунта на това устройство
              </div>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              Изход
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
