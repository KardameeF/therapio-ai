import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useSleepStress } from "../hooks/useSleepStress";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";

interface SleepStressFormData {
  sleepHours: number;
  stressLevel: number;
  notes?: string;
}

export function SleepStressPage() {
  const [error, setError] = useState<string | null>(null);
  const { entries, loading, addEntry, deleteEntry } = useSleepStress();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SleepStressFormData>();

  const onSubmit = async (data: SleepStressFormData) => {
    setError(null);
    const result = await addEntry(data.sleepHours, data.stressLevel, data.notes);
    
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
    return <div className="text-center py-8">Loading sleep & stress entries...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("sleepStress.title")}</h1>
        <p className="text-muted-foreground">Track your sleep quality and stress levels</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add Entry</CardTitle>
            <CardDescription>Record your sleep and stress data</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sleepHours">{t("sleepStress.sleepHours")}</Label>
                <Input
                  id="sleepHours"
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  {...register("sleepHours", { 
                    required: "Sleep hours is required",
                    min: { value: 0, message: "Sleep hours must be at least 0" },
                    max: { value: 24, message: "Sleep hours must be at most 24" }
                  })}
                  placeholder="e.g., 7.5"
                />
                {errors.sleepHours && (
                  <p className="text-sm text-destructive">{errors.sleepHours.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stressLevel">Stress Level (1-10)</Label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Low</span>
                  <Input
                    id="stressLevel"
                    type="range"
                    min="1"
                    max="10"
                    {...register("stressLevel", { 
                      required: "Stress level is required",
                      valueAsNumber: true
                    })}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">High</span>
                </div>
                {errors.stressLevel && (
                  <p className="text-sm text-destructive">{errors.stressLevel.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">{t("sleepStress.notes")}</Label>
                <Input
                  id="notes"
                  {...register("notes")}
                  placeholder="Any additional notes about your sleep or stress..."
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button type="submit" className="w-full">
                {t("sleepStress.save")}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
            <CardDescription>Your sleep & stress tracking history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {entries.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No entries yet. Start tracking your sleep and stress!
                </p>
              ) : (
                entries.slice(0, 10).map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 rounded border">
                    <div>
                      <div className="font-medium">
                        {entry.sleep_hours}h sleep • Stress: {entry.stress_level}/10
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </div>
                      {entry.notes && (
                        <div className="text-sm mt-1">{entry.notes}</div>
                      )}
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
