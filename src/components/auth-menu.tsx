import { User, LogOut, Settings } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function AuthMenu() {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  if (!user) {
    return (
      <div className="flex gap-3">
        <Link to="/login">
          <Button variant="outline" className="rounded-lg">
            {t("auth.login")}
          </Button>
        </Link>
        <Link to="/login">
          <Button className="rounded-lg">
            {t("auth.signup")}
          </Button>
        </Link>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 sm:h-10 px-2 sm:px-4 rounded-lg border-2 border-border hover:border-primary transition-colors font-medium">
          <User className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline text-sm">{user.email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 rounded-xl shadow-soft-lg border-border/50 bg-card/95 backdrop-blur-sm">
        <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold text-foreground">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/50" />
        <DropdownMenuItem asChild className="rounded-lg mx-1">
          <Link to="/profile" className="flex items-center px-3 py-2 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
            <Settings className="mr-3 h-4 w-4" />
            <span className="font-medium">{t("nav.profile")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border/50" />
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="rounded-lg mx-1 px-3 py-2 hover:bg-accent/10 hover:text-accent-600 transition-colors cursor-pointer"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span className="font-medium">{t("auth.logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
