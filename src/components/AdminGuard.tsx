import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../lib/supabaseClient";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "./ui/card";

interface UserProfile {
  user_id: string;
  name: string | null;
  locale: string | null;
  role: string;
  created_at: string;
}

export function AdminGuard() {
  const { user, loading: authLoading } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  console.log('AdminGuard user:', user);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setProfileLoading(false);
        return;
      }

      try {
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("user_id, name, locale, role, created_at")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("Error fetching user profile:", error);
          setProfileLoading(false);
          return;
        }

        setProfile(profileData);
        setIsAdmin(profileData?.role === "admin");
      } catch (error) {
        console.error("Error in fetchUserProfile:", error);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  // Show loading while auth or profile is loading
  if (authLoading || profileLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                <svg 
                  className="w-6 h-6 text-red-600 dark:text-red-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" 
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {t("admin.accessDenied.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("admin.accessDenied.description")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  

  // User is authenticated and is admin - render nested routes
  return <Outlet />;
}
