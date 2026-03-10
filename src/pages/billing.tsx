import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Check } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../providers/AuthProvider";
import { useTranslation } from "react-i18next";

export function BillingPage() {
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<string>("first_step");
  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) return;
    supabase
      .from("subscriptions")
      .select("plan_type, status")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data?.status === "active") setCurrentPlan(data.plan_type);
      });
  }, [user]);

  // Показва EUR като основна, BGN в скоби до 06.01.2026, след това само EUR
  const formatPrice = (eur: number): string => {
    const bgn = (eur * 1.95583).toFixed(2);
    const cutoffDate = new Date("2026-01-06");
    const today = new Date();
    if (today < cutoffDate) {
      return `€${eur.toFixed(2)} (${bgn} лв.)`;
    }
    return `€${eur.toFixed(2)}`;
  };

  const handleManageBilling = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      const response = await fetch("/.netlify/functions/billing-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ user_id: user.id }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || "No URL returned");
    } catch (error) {
      console.error('Error creating portal session:', error);
      alert('Грешка при отваряне на портала. Опитай отново.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (priceId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      const planTypeMap: Record<string, string> = {
        "price_1S8qnIDVd6WnP7HIrd5qxgrt": "personal_growth",
        "price_1S8qoxDVd6WnP7HI4Vjfan7y": "expanded_horizons",
      };
      const plan_type = planTypeMap[priceId] || "first_step";

      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      const response = await fetch("/.netlify/functions/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ priceId, user_id: user.id, plan_type }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || "No URL returned");
    } catch (error) {
      console.error('Error creating checkout:', error);
      alert('Грешка при стартиране на плащането. Опитай отново.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {currentPlan !== "first_step" && (
        <div className="md:col-span-3 flex justify-end mb-2">
          <Button variant="outline" onClick={handleManageBilling} disabled={loading}>
            {loading ? t("billing.loading") : t("billing.manageSub")}
          </Button>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-base font-semibold flex items-center justify-between">
            <span>{t("billing.plans.first_step.name")}</span>
            {currentPlan === "first_step" && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {t("billing.currentPlan")}
              </span>
            )}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{formatPrice(0)}/{t("billing.month")}</p>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.aiMessages30")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.basicAI")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.history30")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.bgEn")}</span></div>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-primary bg-card p-6">
        <div className="mb-4">
          <h3 className="text-base font-semibold flex items-center justify-between">
            <span>{t("billing.plans.personal_growth.name")}</span>
            {currentPlan === "personal_growth" && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {t("billing.currentPlan")}
              </span>
            )}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{formatPrice(19.99)}/{t("billing.month")}</p>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.aiMessages500")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.powerfulAI")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.history90")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.prioritySupport")}</span></div>
          <Button onClick={() => handleUpgrade("price_1S8qnIDVd6WnP7HIrd5qxgrt")} disabled={loading || currentPlan === "personal_growth"} className="w-full mt-4">
            {loading ? t("billing.loading") : currentPlan === "personal_growth" ? t("billing.currentPlan") : t("billing.choosePlan")}
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-base font-semibold flex items-center justify-between">
            <span>{t("billing.plans.expanded_horizons.name")}</span>
            {currentPlan === "expanded_horizons" && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {t("billing.currentPlan")}
              </span>
            )}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{formatPrice(39.99)}/{t("billing.month")}</p>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.aiMessages1500")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.mostPowerfulAI")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.history180")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.prioritySupport247")}</span></div>
          <Button onClick={() => handleUpgrade("price_1S8qoxDVd6WnP7HI4Vjfan7y")} disabled={loading || currentPlan === "expanded_horizons"} className="w-full mt-4">
            {loading ? t("billing.loading") : currentPlan === "expanded_horizons" ? t("billing.currentPlan") : t("billing.choosePlan")}
          </Button>
        </div>
      </div>
    </div>
  );
}
