import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useMoodEntries } from "../hooks/useMoodEntries";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";

interface MoodFormData {
  mood: number;
  notes?: string;
}

const moodEmojis = ["😢", "😔", "😐", "🙂", "😊", "😄", "🤩", "🥳", "😍", "🤗"];

export function MoodPage() {
  const [error, setError] = useState<string | null>(null);
  const { entries, loading, addEntry, deleteEntry } = useMoodEntries();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<MoodFormData>();

  const onSubmit = async (data: MoodFormData) => {
    setError(null);
    const result = await addEntry(data.mood, data.notes);
    
    if (result.error) {
      setError(result.error);
    } else {
      reset();
    }
  };

  const handleDelete = async (id: string) => {
    await deleteEntry(id);
  };

  if (loading) {
    return <div className="text-center py-8">Loading mood entries...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("mood.title")}</h1>
        <p className="text-muted-foreground">{t("mood.howAreYouFeeling")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add Mood Entry</CardTitle>
            <CardDescription>Track how you're feeling today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mood">Mood (1-10)</Label>
                <div className="grid grid-cols-10 gap-1">
                  {moodEmojis.map((emoji, index) => (
                    <label key={index} className="text-center cursor-pointer">
                      <input
                        type="radio"
                        value={index + 1}
                        {...register("mood", { required: "Please select a mood" })}
                        className="sr-only"
                      />
                      <div className="text-2xl hover:scale-110 transition-transform">
                        {emoji}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.mood && (
                  <p className="text-sm text-destructive">{errors.mood.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">{t("mood.addNote")}</Label>
                <Input
                  id="notes"
                  {...register("notes")}
                  placeholder="How are you feeling? What's on your mind?"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button type="submit" className="w-full">
                {t("mood.save")}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
            <CardDescription>Your mood tracking history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {entries.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No mood entries yet. Start tracking your mood!
                </p>
              ) : (
                entries.slice(0, 10).map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 rounded border">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{moodEmojis[entry.mood - 1]}</span>
                      <div>
                        <div className="font-medium">{entry.mood}/10</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </div>
                        {entry.notes && (
                          <div className="text-sm mt-1">{entry.notes}</div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(entry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
