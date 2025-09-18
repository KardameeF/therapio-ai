import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../providers/AuthProvider";

export interface MoodEntry {
  id: string;
  user_id: string;
  mood: number;
  notes: string | null;
  created_at: string;
}

export function useMoodEntries() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchEntries = async () => {
      try {
        const { data, error } = await supabase
          .from("mood_entries")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setEntries(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch mood entries");
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [user]);

  const addEntry = async (mood: number, notes?: string) => {
    if (!user) return { error: "Not authenticated" };

    try {
      const { data, error } = await supabase
        .from("mood_entries")
        .insert([{
          user_id: user.id,
          mood,
          notes: notes || null
        }])
        .select()
        .single();

      if (error) throw error;
      
      setEntries(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to add mood entry";
      return { data: null, error: errorMessage };
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from("mood_entries")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      setEntries(prev => prev.filter(entry => entry.id !== id));
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete mood entry";
      return { error: errorMessage };
    }
  };

  return {
    entries,
    loading,
    error,
    addEntry,
    deleteEntry
  };
}
