import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAuth } from "../providers/AuthProvider";
import { Button } from "../components/ui/button";
import {
  ClipboardList,
  CheckSquare,
  Headphones,
  Mic,
  Check,
  X,
  Coins,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const PLANS = ["free", "personal_growth", "expanded_horizons"] as const;

const FEATURES_MATRIX: {
  key: string;
  free: string | boolean;
  personal_growth: string | boolean;
  expanded_horizons: string | boolean;
}[] = [
  { key: "aiMessages", free: "30", personal_growth: "500", expanded_horizons: "1500" },
  { key: "sessionNotes", free: false, personal_growth: true, expanded_horizons: true },
  { key: "tasks", free: false, personal_growth: true, expanded_horizons: true },
  { key: "audioTherapy", free: false, personal_growth: false, expanded_horizons: true },
  { key: "voiceAssistant", free: false, personal_growth: false, expanded_horizons: true },
  { key: "history", free: "30", personal_growth: "90", expanded_horizons: "180" },
  { key: "support", free: "basic", personal_growth: "priority", expanded_horizons: "247" },
  { key: "price", free: "price_free", personal_growth: "price_pg", expanded_horizons: "price_eh" },
];

const FEATURE_DETAILS = [
  { key: "sessionNotes", Icon: ClipboardList },
  { key: "tasks", Icon: CheckSquare },
  { key: "audioTherapy", Icon: Headphones },
  { key: "voiceAssistant", Icon: Mic },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.08 },
  }),
};

export function FeaturesPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("subscription_plan")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        setCurrentPlan(data?.subscription_plan ?? "first_step");
      });
  }, [user]);

  const renderCell = (value: string | boolean) => {
    if (value === true) return <Check className="w-4 h-4 text-primary mx-auto" />;
    if (value === false) return <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />;
    return <span className="text-sm font-medium text-foreground">{value}</span>;
  };

  const renderCellValue = (key: string, value: string | boolean) => {
    if (typeof value === "boolean") return renderCell(value);
    if (key === "history") return t("featuresPage.table.days", { count: Number(value) });
    if (key === "support") return t(`featuresPage.table.support_${value}`);
    if (key === "price") return <span className="text-sm font-semibold text-foreground">{t(`featuresPage.table.${value}`)}</span>;
    return renderCell(value);
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 md:px-6 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </button>
      </div>
      <main className="mx-auto max-w-5xl px-4 md:px-6 py-8 md:py-14 space-y-16 md:space-y-24">

        {/* Hero */}
        <motion.section
          className="text-center space-y-4"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {t("featuresPage.hero.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("featuresPage.hero.subtitle")}
          </p>
        </motion.section>

        {/* Plan comparison table */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          custom={1}
        >
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    {t("featuresPage.table.feature")}
                  </th>
                  {PLANS.map((plan) => (
                    <th key={plan} className="px-4 py-3 text-center font-semibold text-foreground">
                      {t(`featuresPage.plans.${plan}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURES_MATRIX.map((row, i) => (
                  <tr
                    key={row.key}
                    className={i % 2 === 0 ? "bg-muted/30" : ""}
                  >
                    <td className="px-4 py-3 text-foreground font-medium">
                      {t(`featuresPage.table.${row.key}`)}
                    </td>
                    {PLANS.map((plan) => (
                      <td key={plan} className="px-4 py-3 text-center">
                        {renderCellValue(row.key, row[plan])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Feature details */}
        <section className="space-y-6">
          <motion.h2
            className="text-2xl font-bold text-foreground text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            {t("featuresPage.details.title")}
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURE_DETAILS.map(({ key, Icon }, i) => (
              <motion.div
                key={key}
                className="rounded-xl border border-border bg-card p-5 space-y-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {t(`featuresPage.details.${key}.title`)}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`featuresPage.details.${key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pay-as-you-go */}
        <motion.section
          className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Coins className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">
              {t("featuresPage.payg.title")}
            </h2>
          </div>
          <p className="text-muted-foreground">
            {t("featuresPage.payg.description")}
          </p>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {t("featuresPage.payg.packages")}
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {t("featuresPage.payg.costPerMessage")}
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {t("featuresPage.payg.budgetCap")}
            </li>
          </ul>
          <Link to="/billing">
            <Button className="mt-2">
              {t("featuresPage.payg.cta")}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="text-center space-y-4 pb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
          <h2 className="text-2xl font-bold text-foreground">
            {t("featuresPage.cta.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("featuresPage.cta.subtitle")}
          </p>
          {!user ? (
            <Link to="/login">
              <Button size="lg">
                {t("featuresPage.cta.startFree")}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          ) : currentPlan === "first_step" ? (
            <Link to="/billing">
              <Button size="lg">
                {t("featuresPage.cta.upgrade")}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          ) : (
            <Link to="/billing">
              <Button size="lg" variant="outline">
                {t("featuresPage.cta.manage")}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          )}
        </motion.section>
      </main>
    </div>
  );
}
