import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Check, Coins, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../providers/AuthProvider";
import { useTranslation } from "react-i18next";

export function BillingPage() {
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<string>("first_step");
  const [billingInterval, setBillingInterval] = useState<"month" | "year">("month");
  const [prepaidCredits, setPrepaidCredits] = useState(0);
  const [budgetCap, setBudgetCap] = useState(0);
  const [budgetCapInput, setBudgetCapInput] = useState("");
  const [savingCap, setSavingCap] = useState(false);
  const [prepaidLoading, setPrepaidLoading] = useState<number | null>(null);
  const [prepaidSuccess, setPrepaidSuccess] = useState(false);
  const [showDowngradeDialog, setShowDowngradeDialog] = useState(false);
  const [downgradeTarget, setDowngradeTarget] = useState<string | null>(null);
  const { user } = useAuth();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("prepaid_success") === "true") {
      setPrepaidSuccess(true);
      setSearchParams({}, { replace: true });
      setTimeout(() => setPrepaidSuccess(false), 5000);
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (!user) return;
    const loadBilling = async () => {
      const [{ data: subData }, { data: profileData }] = await Promise.all([
        supabase
          .from("subscriptions")
          .select("plan_type, status")
          .eq("user_id", user.id)
          .single(),
        supabase
          .from("profiles")
          .select("prepaid_credits, budget_cap, subscription_plan")
          .eq("id", user.id)
          .single(),
      ]);

      if (subData?.status === "active") {
        setCurrentPlan(subData.plan_type);
      } else if (
        profileData?.subscription_plan &&
        profileData.subscription_plan !== "first_step"
      ) {
        setCurrentPlan(profileData.subscription_plan);
      }

      if (profileData) {
        setPrepaidCredits(profileData.prepaid_credits ?? 0);
        setBudgetCap(profileData.budget_cap ?? 0);
        setBudgetCapInput(String((profileData.budget_cap ?? 0) / 100));
      }
    };
    loadBilling();
  }, [user]);

  const EUR_TO_BGN = 1.95583;
  const bgnOf = (eur: number) => `(${(eur * EUR_TO_BGN).toFixed(2)} лв.)`;

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

  const monthlyPrices: Record<string, string> = {
    personal_growth: "price_1S8qnIDVd6WnP7HIrd5qxgrt",
    expanded_horizons: "price_1S8qoxDVd6WnP7HI4Vjfan7y",
  };
  const yearlyPrices: Record<string, string> = {
    personal_growth: "price_YEARLY_PG_PLACEHOLDER",
    expanded_horizons: "price_YEARLY_EH_PLACEHOLDER",
  };

  const handleUpgrade = async (planKey: string) => {
    if (!user) return;

    setLoading(true);
    try {
      const prices = billingInterval === "year" ? yearlyPrices : monthlyPrices;
      const priceId = prices[planKey];
      if (!priceId) throw new Error("Unknown plan");

      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      const response = await fetch("/.netlify/functions/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ priceId, user_id: user.id, plan_type: planKey, interval: billingInterval }),
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

  const handleDowngrade = async (targetPlan: string) => {
    if (!user) return;
    setLoading(true);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      const response = await fetch("/.netlify/functions/cancel-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ target_plan: targetPlan, user_id: user.id }),
      });
      const data = await response.json();
      if (data.success) {
        setCurrentPlan(targetPlan);
        alert(t("billing.downgradeSuccess"));
      }
    } catch (err) {
      console.error("Downgrade error:", err);
    } finally {
      setLoading(false);
    }
  };

  const promptDowngrade = (targetPlan: string) => {
    setDowngradeTarget(targetPlan);
    setShowDowngradeDialog(true);
  };

  const confirmDowngrade = () => {
    if (downgradeTarget) handleDowngrade(downgradeTarget);
    setShowDowngradeDialog(false);
    setDowngradeTarget(null);
  };

  const PLAN_ORDER = ["first_step", "personal_growth", "expanded_horizons"] as const;
  const currentIdx = PLAN_ORDER.indexOf(currentPlan as typeof PLAN_ORDER[number]);

  const handleTopUp = async (amount: number) => {
    if (!user) return;
    setPrepaidLoading(amount);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      const res = await fetch("/.netlify/functions/create-prepaid-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || "No URL returned");
    } catch (error) {
      console.error("Error creating prepaid checkout:", error);
    } finally {
      setPrepaidLoading(null);
    }
  };

  const handleSaveBudgetCap = async () => {
    if (!user) return;
    setSavingCap(true);
    const capInCredits = Math.max(0, Math.round(parseFloat(budgetCapInput || "0") * 100));
    const { error } = await supabase
      .from("profiles")
      .update({ budget_cap: capInCredits })
      .eq("id", user.id);
    if (!error) setBudgetCap(capInCredits);
    setSavingCap(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", delay: i * 0.1 } }),
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
    {currentPlan !== "first_step" && (
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={handleManageBilling} disabled={loading} className="w-full sm:w-auto">
          {loading ? t("billing.loading") : t("billing.manageSub")}
        </Button>
      </div>
    )}

    <div className="flex items-center justify-center gap-2 mb-8">
      <button
        onClick={() => setBillingInterval("month")}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${billingInterval === "month" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
      >
        {t("billing.monthly")}
      </button>
      <button
        onClick={() => setBillingInterval("year")}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 ${billingInterval === "year" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
      >
        {t("billing.yearly")}
        <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-full">
          {t("billing.yearlyDiscount")}
        </span>
      </button>
    </div>

    <div className="grid gap-4 md:gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
      <motion.div className={`rounded-2xl p-6 ${currentPlan === "first_step" ? "border-2 border-primary bg-card" : "border border-border bg-card"}`} custom={0} initial="hidden" animate="visible" variants={cardVariants}>
        <div className="mb-4">
          <h3 className="text-base font-semibold flex items-center justify-between">
            <span>{t("billing.plans.first_step.name")}</span>
            {currentPlan === "first_step" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t("billing.currentPlan")}
              </span>
            )}
          </h3>
          <div className="mt-1">
            <p className="text-sm text-muted-foreground">€0.00/{t("billing.month")}</p>
            <p className="text-xs text-muted-foreground/70">{bgnOf(0)}</p>
          </div>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.aiMessages30")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.basicAi")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.history30")}</span></div>
          {currentPlan !== "first_step" && currentIdx > 0 && (
            <Button
              variant="outline"
              className="w-full mt-4 text-orange-500 border-orange-400/50 hover:bg-orange-500/10 hover:text-orange-500"
              onClick={() => promptDowngrade("first_step")}
              disabled={loading}
            >
              {t("billing.downgrade")}
            </Button>
          )}
        </div>
      </motion.div>

      <motion.div className={`rounded-2xl p-6 ${currentPlan === "personal_growth" ? "border-2 border-primary bg-card" : "border border-border bg-card"}`} custom={1} initial="hidden" animate="visible" variants={cardVariants}>
        <div className="mb-4">
          <h3 className="text-base font-semibold flex items-center justify-between">
            <span>{t("billing.plans.personal_growth.name")}</span>
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs font-semibold text-green-500">
                ⭐ {t("billing.recommended")}
              </span>
              {currentPlan === "personal_growth" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t("billing.currentPlan")}
                </span>
              )}
            </div>
          </h3>
          <div className="mt-1">
            <p className="text-sm text-muted-foreground">
              €{(billingInterval === "year" ? 16.99 : 19.99).toFixed(2)}/{t("billing.month")}
            </p>
            <p className="text-xs text-muted-foreground/70">
              {bgnOf(billingInterval === "year" ? 16.99 : 19.99)}
            </p>
          </div>
          {billingInterval === "year" && (
            <span className="text-xs text-green-500 font-medium">{t("billing.saveYearlyPG")}</span>
          )}
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.aiMessages500")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.powerfulAi")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.sessionNotes")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.tasks")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.history90")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.prioritySupport")}</span></div>
          {currentPlan === "personal_growth" ? (
            <Button variant="outline" className="w-full mt-4" onClick={handleManageBilling} disabled={loading}>
              {loading ? t("billing.loading") : t("billing.manage")}
            </Button>
          ) : currentIdx < 1 ? (
            <Button onClick={() => handleUpgrade("personal_growth")} disabled={loading} className="w-full mt-4">
              {loading ? t("billing.loading") : t("billing.upgrade")}
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full mt-4 text-orange-500 border-orange-400/50 hover:bg-orange-500/10 hover:text-orange-500"
              onClick={() => promptDowngrade("personal_growth")}
              disabled={loading}
            >
              {t("billing.downgrade")}
            </Button>
          )}
        </div>
      </motion.div>

      <motion.div className={`rounded-2xl p-6 ${currentPlan === "expanded_horizons" ? "border-2 border-primary bg-card" : "border border-border bg-card"}`} custom={2} initial="hidden" animate="visible" variants={cardVariants}>
        <div className="mb-4">
          <h3 className="text-base font-semibold flex items-center justify-between">
            <span>{t("billing.plans.expanded_horizons.name")}</span>
            {currentPlan === "expanded_horizons" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t("billing.currentPlan")}
              </span>
            )}
          </h3>
          <div className="mt-1">
            <p className="text-sm text-muted-foreground">
              €{(billingInterval === "year" ? 33.99 : 39.99).toFixed(2)}/{t("billing.month")}
            </p>
            <p className="text-xs text-muted-foreground/70">
              {bgnOf(billingInterval === "year" ? 33.99 : 39.99)}
            </p>
          </div>
          {billingInterval === "year" && (
            <span className="text-xs text-green-500 font-medium">{t("billing.saveYearlyEH")}</span>
          )}
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.aiMessages1500")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.mostPowerfulAi")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.sessionNotes")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.tasks")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.audioTherapy")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.voiceAssistant")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.history180")}</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span>{t("billing.features.prioritySupport247")}</span></div>
          {currentPlan === "expanded_horizons" ? (
            <Button variant="outline" className="w-full mt-4" onClick={handleManageBilling} disabled={loading}>
              {loading ? t("billing.loading") : t("billing.manage")}
            </Button>
          ) : (
            <Button onClick={() => handleUpgrade("expanded_horizons")} disabled={loading} className="w-full mt-4">
              {loading ? t("billing.loading") : t("billing.upgrade")}
            </Button>
          )}
        </div>
      </motion.div>
    </div>

    {/* Prepaid Credits Section */}
    <motion.div
      className="mt-6 rounded-2xl border border-border bg-card p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Coins className="w-5 h-5 text-primary" />
        <h3 className="text-base font-semibold">{t("prepaid.title")}</h3>
      </div>

      {prepaidSuccess && (
        <div className="mb-4 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-2 text-sm text-green-600 dark:text-green-400">
          {t("prepaid.success")}
        </div>
      )}

      <p className="text-sm text-muted-foreground mb-4">
        {t("prepaid.balance", {
          credits: prepaidCredits,
          amount: (prepaidCredits / 100).toFixed(2),
        })}
      </p>

      <div className="flex flex-wrap gap-4 mb-6">
        {([5, 10, 20] as const).map((amount) => {
          const bgnEquiv: Record<number, string> = { 5: "9.78", 10: "19.56", 20: "39.12" };
          return (
            <div key={amount} className="flex flex-col items-center gap-0.5">
              <Button
                variant="outline"
                onClick={() => handleTopUp(amount)}
                disabled={prepaidLoading !== null}
                className="min-w-[120px]"
              >
                {prepaidLoading === amount ? t("billing.loading") : t(`prepaid.topUp${amount}`)}
              </Button>
              <span className="text-xs text-muted-foreground">({bgnEquiv[amount]} лв.)</span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border pt-4">
        <label className="text-sm font-medium text-foreground block mb-1">
          {t("prepaid.budgetCap")}
        </label>
        <p className="text-xs text-muted-foreground mb-2">{t("prepaid.budgetCapHint")}</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            step="0.01"
            value={budgetCapInput}
            onChange={(e) => setBudgetCapInput(e.target.value)}
            className="w-28 px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary/50"
          />
          <span className="text-sm text-muted-foreground">EUR</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveBudgetCap}
            disabled={savingCap}
          >
            {savingCap ? t("billing.loading") : t("prepaid.save")}
          </Button>
        </div>
      </div>

    </motion.div>

    <p className="text-xs text-muted-foreground text-center mt-8 px-4">
      {t("billing.disclaimer")}
    </p>

    <Dialog open={showDowngradeDialog} onOpenChange={setShowDowngradeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("billing.downgradeTitle")}</DialogTitle>
          <DialogDescription>{t("billing.downgradeWarning")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDowngradeDialog(false)}>
            {t("billing.cancel")}
          </Button>
          <Button variant="destructive" onClick={confirmDowngrade}>
            {t("billing.confirmDowngrade")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  );
}
