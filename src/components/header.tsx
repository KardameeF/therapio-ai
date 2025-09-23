import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitch } from "./locale-switch";
import { AuthMenu } from "./auth-menu";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useAuth } from "../providers/AuthProvider";

export function Header() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link 
          to="/" 
          className="flex items-center gap-3 font-semibold group transition-all duration-200"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg group-hover:bg-primary/30 transition-colors"></div>
            <Brain className="relative h-8 w-8 text-primary group-hover:text-primary-600 transition-colors" />
          </div>
          <span className="text-xl font-heading font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("app.title")}
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
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