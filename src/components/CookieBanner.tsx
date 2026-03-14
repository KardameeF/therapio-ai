import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

export function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [functional, setFunctional] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

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
      <div className="bg-background border border-border rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">

        <div className="flex items-center gap-2">
          <span className="text-2xl">🍪</span>
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
          <a href="/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-xs underline hover:text-foreground text-muted-foreground">
            {t("cookieBanner.privacyPolicy")}
          </a>
          <a href="/legal/cookies" target="_blank" rel="noopener noreferrer" className="text-xs underline hover:text-foreground text-muted-foreground">
            {t("cookieBanner.cookiePolicy")}
          </a>
          <a href="/legal/terms" target="_blank" rel="noopener noreferrer" className="text-xs underline hover:text-foreground text-muted-foreground">
            {t("cookieBanner.termsOfService")}
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <Button variant="ghost" className="flex-1 text-muted-foreground" onClick={() => saveConsent(false)}>
            {t("cookieBanner.declineAll")}
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => saveConsent(functional)}>
            {t("cookieBanner.savePreferences")}
          </Button>
          <Button className="flex-1" onClick={() => saveConsent(true)}>
            {t("cookieBanner.acceptAll")}
          </Button>
        </div>

      </div>
    </div>
  );
}
