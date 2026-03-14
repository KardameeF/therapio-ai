import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useAuth } from "../providers/AuthProvider";
import { X } from "lucide-react";
import { PrivacyPage } from "../pages/legal/privacy";
import { CookiesPage } from "../pages/legal/cookies";
import { TermsPage } from "../pages/legal/terms";

type InnerModalType = "privacy" | "cookies" | "terms" | null;

export function CookieBanner() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [functional, setFunctional] = useState(true);
  const [innerModal, setInnerModal] = useState<InnerModalType>(null);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      if (user) {
        localStorage.setItem(
          "cookie_consent",
          JSON.stringify({
            necessary: true,
            functional: true,
            timestamp: new Date().toISOString(),
          })
        );
      } else {
        setVisible(true);
      }
    }
  }, [user]);

  const saveConsent = (functionalValue: boolean) => {
    localStorage.setItem(
      "cookie_consent",
      JSON.stringify({
        necessary: true,
        functional: functionalValue,
        timestamp: new Date().toISOString(),
      })
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-background border border-border rounded-xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
              <path d="M8.5 8.5v.01" />
              <path d="M16 15.5v.01" />
              <path d="M12 12v.01" />
              <path d="M11 17v.01" />
              <path d="M7 14v.01" />
            </svg>
            <h2 className="text-lg font-semibold">{t("cookieBanner.title")}</h2>
          </div>

          <p className="text-sm text-muted-foreground">
            {t("cookieBanner.description")}
          </p>

          <div className="space-y-2">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{t("cookieBanner.strictlyTitle")}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">
                    {t("cookieBanner.alwaysActive")}
                  </span>
                  <Switch checked disabled />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{t("cookieBanner.strictlyDesc")}</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{t("cookieBanner.functionalTitle")}</span>
                <Switch checked={functional} onCheckedChange={setFunctional} />
              </div>
              <p className="text-xs text-muted-foreground">{t("cookieBanner.functionalDesc")}</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{t("cookieBanner.securityTitle")}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">
                    {t("cookieBanner.alwaysActive")}
                  </span>
                  <Switch checked disabled />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{t("cookieBanner.securityDesc")}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <button type="button" onClick={() => setInnerModal("privacy")} className="text-xs underline hover:text-foreground text-muted-foreground">
              {t("cookieBanner.privacyPolicy")}
            </button>
            <button type="button" onClick={() => setInnerModal("cookies")} className="text-xs underline hover:text-foreground text-muted-foreground">
              {t("cookieBanner.cookiePolicy")}
            </button>
            <button type="button" onClick={() => setInnerModal("terms")} className="text-xs underline hover:text-foreground text-muted-foreground">
              {t("cookieBanner.termsOfService")}
            </button>
          </div>
        </div>

        <div className="shrink-0 p-4 border-t border-border bg-background grid grid-cols-3 gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground text-xs px-2" onClick={() => saveConsent(false)}>
            {t("cookieBanner.declineAll")}
          </Button>
          <Button variant="outline" size="sm" className="text-xs px-2" onClick={() => saveConsent(functional)}>
            {t("cookieBanner.savePreferences")}
          </Button>
          <Button size="sm" className="text-xs px-2" onClick={() => saveConsent(true)}>
            {t("cookieBanner.acceptAll")}
          </Button>
        </div>

      </div>

      {innerModal && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setInnerModal(null)}
        >
          <div
            className="bg-background border border-border rounded-xl shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
              <h2 className="text-base font-semibold">
                {innerModal === "privacy" && t("cookieBanner.privacyPolicy")}
                {innerModal === "cookies" && t("cookieBanner.cookiePolicy")}
                {innerModal === "terms" && t("cookieBanner.termsOfService")}
              </h2>
              <button
                type="button"
                onClick={() => setInnerModal(null)}
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                aria-label={t("common.close")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 px-2 py-4">
              {innerModal === "privacy" && <PrivacyPage />}
              {innerModal === "cookies" && <CookiesPage />}
              {innerModal === "terms" && <TermsPage />}
            </div>
            <div className="px-6 py-4 border-t border-border shrink-0 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setInnerModal(null)}>
                {t("common.close")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
