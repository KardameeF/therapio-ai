import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useGoals } from "../hooks/useGoals";
import { useTranslation } from "react-i18next";
import { Trash2, Check, Edit } from "lucide-react";

interface GoalFormData {
  title: string;
  description?: string;
  targetDate?: string;
}

export function GoalsPage() {
  const [error, setError] = useState<string | null>(null);
  const { goals, loading, addGoal, updateGoal, deleteGoal } = useGoals();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<GoalFormData>();

  const onSubmit = async (data: GoalFormData) => {
    setError(null);
    const result = await addGoal(data.title, data.description, data.targetDate);
    
    if (result.error) {
      setError(result.error);
    } else {
      reset();
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    await updateGoal(id, { completed: !completed });
  };

  const handleDelete = async (id: string) => {
    await deleteGoal(id);
  };

  if (loading) {
    return <div className="text-center py-8">Loading goals...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("goals.title")}</h1>
        <p className="text-muted-foreground">Set and track your wellness goals</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("goals.newGoal")}</CardTitle>
            <CardDescription>Create a new wellness goal</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">{t("goals.goalTitle")}</Label>
                <Input
                  id="title"
                  {...register("title", { required: "Goal title is required" })}
                  placeholder="e.g., Daily meditation"
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t("goals.description")}</Label>
                <Input
                  id="description"
                  {...register("description")}
                  placeholder="Describe your goal..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetDate">{t("goals.targetDate")}</Label>
                <Input
                  id="targetDate"
                  type="date"
                  {...register("targetDate")}
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button type="submit" className="w-full">
                {t("goals.save")}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Goals</CardTitle>
            <CardDescription>Track your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {goals.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No goals yet. Create your first goal!
                </p>
              ) : (
                goals.map((goal) => (
                  <div 
                    key={goal.id} 
                    className={`p-3 rounded border ${
                      goal.completed ? "bg-muted/50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleComplete(goal.id, goal.completed)}
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              goal.completed 
                                ? "bg-primary border-primary text-primary-foreground" 
                                : "border-muted-foreground"
                            }`}
                          >
                            {goal.completed && <Check className="h-3 w-3" />}
                          </button>
                          <h3 className={`font-medium ${
                            goal.completed ? "line-through text-muted-foreground" : ""
                          }`}>
                            {goal.title}
                          </h3>
                        </div>
                        
                        {goal.description && (
                          <p className="text-sm text-muted-foreground mt-1 ml-7">
                            {goal.description}
                          </p>
                        )}
                        
                        <div className="text-xs text-muted-foreground mt-2 ml-7">
                          Created: {new Date(goal.created_at).toLocaleDateString()}
                          {goal.target_date && (
                            <span> • Target: {new Date(goal.target_date).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(goal.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
