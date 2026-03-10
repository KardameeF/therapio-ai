import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "../providers/theme-provider";
import { useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

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
    <Button
      variant="outline"
      size="icon"
      className="h-10 w-10 rounded-lg border-2 border-border hover:border-primary transition-all duration-300"
      aria-label="Toggle theme"
      onClick={cycleTheme}
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all duration-300" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all duration-300" />
      )}
    </Button>
  );
}
