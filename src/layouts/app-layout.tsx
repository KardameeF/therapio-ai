import { useState, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { useTranslation } from "react-i18next";
import { cn } from "../lib/utils";
import { CreditCard, User, FileText, Shield } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const appNav = [
  { to: "/billing", label: "nav.billing", icon: CreditCard },
  { to: "/profile", label: "nav.profile", icon: User },
] as const;

export function AppLayout() {
  const { t } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();
      setIsAdmin(data?.role === "admin");
    };
    check();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6 py-8">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <div className="sticky top-24">
            <nav className="space-y-2">
              {appNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group",
                        isActive
                          ? "bg-secondary text-foreground font-medium"
                          : "text-foreground-muted hover:bg-secondary hover:text-foreground"
                      )
                    }
                  >
                    <Icon className={cn(
                      "h-5 w-5 transition-colors",
                      "group-hover:scale-110 transition-transform"
                    )} />
                    <span>{t(item.label)}</span>
                  </NavLink>
                );
              })}
              
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group",
                      isActive
                        ? "bg-destructive/10 text-destructive"
                        : "text-muted-foreground hover:bg-destructive/5 hover:text-destructive"
                    )
                  }
                >
                  <Shield className="h-5 w-5" />
                  <span>Админ</span>
                </NavLink>
              )}

              <div className="pt-6 border-t border-border/50">
                <div className="px-4 py-2 text-xs font-medium text-foreground-muted uppercase tracking-wider mb-3">
                  {t("nav.legal")}
                </div>
                <div className="space-y-1">
                  <Link 
                    to="/legal/terms" 
                    className="flex items-center gap-3 px-4 py-2 text-xs text-foreground-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    {t("nav.terms")}
                  </Link>
                  <Link 
                    to="/legal/privacy" 
                    className="flex items-center gap-3 px-4 py-2 text-xs text-foreground-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    {t("nav.privacy")}
                  </Link>
                  <Link 
                    to="/legal/gdpr" 
                    className="flex items-center gap-3 px-4 py-2 text-xs text-foreground-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    {t("nav.gdpr")}
                  </Link>
                  <Link 
                    to="/legal/cookies" 
                    className="flex items-center gap-3 px-4 py-2 text-xs text-foreground-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    {t("nav.cookies")}
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </aside>
        
        <main className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}