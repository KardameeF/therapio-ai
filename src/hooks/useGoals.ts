import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../providers/AuthProvider";

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  target_date: string | null;
  completed: boolean;
  created_at: string;
}

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchGoals = async () => {
      try {
        const { data, error } = await supabase
          .from("goals")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setGoals(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch goals");
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [user]);

  const addGoal = async (title: string, description?: string, targetDate?: string) => {
    if (!user) return { error: "Not authenticated" };

    try {
      const { data, error } = await supabase
        .from("goals")
        .insert([{
          user_id: user.id,
          title,
          description: description || null,
          target_date: targetDate || null,
          completed: false
        }])
        .select()
        .single();

      if (error) throw error;
      
      setGoals(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to add goal";
      return { data: null, error: errorMessage };
    }
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    try {
      const { data, error } = await supabase
        .from("goals")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      
      setGoals(prev => prev.map(goal => goal.id === id ? data : goal));
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update goal";
      return { data: null, error: errorMessage };
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      const { error } = await supabase
        .from("goals")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      setGoals(prev => prev.filter(goal => goal.id !== id));
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete goal";
      return { error: errorMessage };
    }
  };

  return {
    goals,
    loading,
    error,
    addGoal,
    updateGoal,
    deleteGoal
  };
}
