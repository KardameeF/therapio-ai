import { Moon, Sun } from "lucide-react";
import { useTheme } from "../providers/theme-provider";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (!stored || stored === "system") {
      setTheme("dark");
    }
  }, [setTheme]);

  const cycleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
  };

  const isDark = theme === "dark" || theme === "system" || !theme;

  return (
    <button
      className="rounded-full p-2 hover:bg-secondary transition-colors text-foreground"
      aria-label={t("header.toggleTheme")}
      onClick={cycleTheme}
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </button>
  );
}
