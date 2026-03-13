import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../components/header";
import { useTranslation } from "react-i18next";
import { cn } from "../lib/utils";
import { User, CreditCard, Sparkles, FileText, Shield, PanelLeftOpen, PanelLeftClose, MessageCircle } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const appNav = [
  { to: "/billing", label: "nav.billing", icon: CreditCard },
  { to: "/features", label: "nav.features", icon: Sparkles },
  { to: "/profile", label: "nav.profile", icon: User },
] as const;

export function AppLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      <div className="mx-auto flex max-w-7xl gap-4 md:gap-8 px-4 md:px-6 py-4 md:py-8">

        {/* SIDEBAR */}
        <aside className={`hidden md:flex flex-col shrink-0 transition-all duration-200 ease-in-out ${isCollapsed ? "w-16" : "w-56"}`}>
          <div className="sticky top-24 flex flex-col gap-1">

            {/* Toggle */}
            <button
              onClick={() => setIsCollapsed((c) => !c)}
              title={isCollapsed ? "Разгъни" : "Свий"}
              className={`mb-2 flex items-center justify-center h-8 w-8 rounded-lg hover:bg-secondary text-muted-foreground transition-colors ${isCollapsed ? "mx-auto" : ""}`}
            >
              {isCollapsed
                ? <PanelLeftOpen className="h-4 w-4" />
                : <PanelLeftClose className="h-4 w-4" />}
            </button>

            {/* Back to chat */}
            {location.pathname !== "/app" && (
              <Link
                to="/app"
                title={isCollapsed ? t("nav.backToChat") : undefined}
                className={cn(
                  "flex items-center rounded-xl text-sm font-medium mb-2 transition-colors duration-200",
                  "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20",
                  isCollapsed ? "justify-center w-10 h-10 mx-auto" : "gap-3 px-3 py-2.5"
                )}
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{t("nav.backToChat")}</span>}
              </Link>
            )}

            {/* Main nav */}
            {appNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  title={isCollapsed ? t(item.label) : undefined}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center rounded-xl text-sm font-medium transition-all duration-200",
                      isCollapsed ? "justify-center w-10 h-10 mx-auto" : "gap-3 px-4 py-3",
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-foreground-muted hover:bg-secondary hover:text-foreground"
                    )
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span>{t(item.label)}</span>}
                </NavLink>
              );
            })}

            {/* Admin link */}
            {isAdmin && (
              <NavLink
                to="/admin"
                title={isCollapsed ? t("nav.admin") : undefined}
                className={({ isActive }) =>
                  cn(
                    "flex items-center rounded-xl text-sm font-medium transition-all duration-200",
                    isCollapsed ? "justify-center w-10 h-10 mx-auto" : "gap-3 px-4 py-3",
                    isActive
                      ? "bg-destructive/10 text-destructive"
                      : "text-muted-foreground hover:bg-destructive/5 hover:text-destructive"
                  )
                }
              >
                <Shield className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>{t("nav.admin")}</span>}
              </NavLink>
            )}

            {/* Legal section — hidden when collapsed */}
            {!isCollapsed && (
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
            )}
          </div>
        </aside>

        <main className="flex-1 min-w-0 pb-24 md:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-8"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background border-t border-border px-2 py-2 safe-area-bottom">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          <Link to="/app" className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-secondary transition-colors">
            <MessageCircle className="w-5 h-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">{t("nav.backToChat").replace("← ", "")}</span>
          </Link>
          <NavLink to="/billing" className={({ isActive }) => `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:bg-secondary"}`}>
            <CreditCard className="w-5 h-5" />
            <span className="text-[10px]">{t("nav.billing")}</span>
          </NavLink>
          <NavLink to="/features" className={({ isActive }) => `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:bg-secondary"}`}>
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px]">{t("nav.features")}</span>
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:bg-secondary"}`}>
            <User className="w-5 h-5" />
            <span className="text-[10px]">{t("nav.profile")}</span>
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${isActive ? "text-destructive" : "text-muted-foreground hover:bg-secondary"}`}>
              <Shield className="w-5 h-5" />
              <span className="text-[10px]">{t("nav.admin")}</span>
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
}