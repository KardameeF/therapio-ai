import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type UserType = {
  id: string;
  email: string | null;
  role: string | null;
  name?: string | null;
  locale?: string | null;
  photo_url?: string | null;
};

interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = async (userId: string): Promise<UserType | null> => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("name, locale, photo_url, role")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error loading user profile:", error);
        return null;
      }

      // Get the current session to get user email
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        return null;
      }

      return {
        id: session.user.id,
        email: session.user.email ?? null,
        role: profile?.role ?? null,
        name: profile?.name ?? null,
        locale: profile?.locale ?? null,
        photo_url: profile?.photo_url ?? null,
      };
    } catch (error) {
      console.error("Error in loadUserProfile:", error);
      return null;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      try {
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          setUser(null);
          setLoading(false);
          return;
        }

        if (session?.user) {
          // Load user profile
          const userProfile = await loadUserProfile(session.user.id);
          setUser(userProfile);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      
      if (session?.user) {
        // User signed in or session refreshed
        const userProfile = await loadUserProfile(session.user.id);
        setUser(userProfile);
      } else {
        // User signed out
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      }
      // User state will be updated via onAuthStateChange
    } catch (error) {
      console.error("Error in signOut:", error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};