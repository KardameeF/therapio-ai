import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "../providers/theme-provider";
import { useTranslation } from "react-i18next";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-10 w-10 rounded-lg border-2 border-border hover:border-primary transition-colors"
          aria-label="Toggle theme"
          aria-describedby="theme-description"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only" id="theme-description">
            Switch between light and dark theme
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-soft-lg border-border/50 bg-card/95 backdrop-blur-sm">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="rounded-lg px-3 py-2 cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <Sun className="mr-3 h-4 w-4" />
          <span className="font-medium">{t("theme.light")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="rounded-lg px-3 py-2 cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <Moon className="mr-3 h-4 w-4" />
          <span className="font-medium">{t("theme.dark")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="rounded-lg px-3 py-2 cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <Monitor className="mr-3 h-4 w-4" />
          <span className="font-medium">{t("theme.system")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}