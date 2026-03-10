import { Link } from "react-router-dom";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitch } from "./locale-switch";
import { AuthMenu } from "./auth-menu";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useAuth } from "../providers/AuthProvider";

function EtheraLogo() {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25"/>
        <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
        <circle cx="14" cy="14" r="2.5" fill="currentColor"/>
        <ellipse cx="14" cy="14" rx="12" ry="4.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" transform="rotate(-30 14 14)"/>
      </svg>
      <span className="font-semibold text-lg tracking-tight text-foreground">
        Eterapp
      </span>
    </div>
  );
}

export function Header() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo — home link */}
        <Link to="/" className="transition-opacity hover:opacity-80">
          <EtheraLogo />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-3">
          <LocaleSwitch />
          <ThemeToggle />
          {user ? (
            <AuthMenu />
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
                {t("header.loginOrSignup")}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
