import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { PrivacyPage } from "../pages/legal/privacy";
import { CookiesPage } from "../pages/legal/cookies";
import { GDPRPage } from "../pages/legal/gdpr";
import { TermsPage } from "../pages/legal/terms";

export type LegalModalType = "privacy" | "cookies" | "gdpr" | "terms" | null;

interface LegalModalProps {
  open: LegalModalType;
  onClose: () => void;
}

export function LegalModal({ open, onClose }: LegalModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const titles: Record<NonNullable<LegalModalType>, string> = {
    privacy: t("nav.privacy"),
    cookies: t("nav.cookies"),
    gdpr: t("nav.gdpr"),
    terms: t("nav.terms"),
  };

  const content: Record<NonNullable<LegalModalType>, React.ReactNode> = {
    privacy: <PrivacyPage />,
    cookies: <CookiesPage />,
    gdpr: <GDPRPage />,
    terms: <TermsPage />,
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-background border border-border rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <h2 className="text-lg font-semibold">{titles[open]}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full"
            aria-label={t("common.close")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-y-auto flex-1 px-2 py-4">
          {content[open]}
        </div>

        <div className="px-6 py-4 border-t border-border shrink-0 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            {t("common.close")}
          </Button>
        </div>
      </div>
    </div>
  );
}
