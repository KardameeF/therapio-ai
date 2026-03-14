import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAuth } from "../providers/AuthProvider";
import { AuthModal } from "../components/auth-modal";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { useSEO } from "../hooks/use-seo";
import { LegalModal } from "../components/LegalModal";
import { useLegalModal } from "../hooks/useLegalModal";
import {
  Shield,
  Globe,
  Zap,
  MessageCircle,
  Check,
} from "lucide-react";

const STRIPE_PRICE_IDS = {
  PERSONAL_GROWTH: "price_1S8qnIDVd6WnP7HIrd5qxgrt",
  EXPANDED_HORIZONS: "price_1S8qoxDVd6WnP7HI4Vjfan7y",
};

export function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("register");
  const { user } = useAuth();
  const { t } = useTranslation();
  const { legalModal, openLegal, closeLegal } = useLegalModal();
  useSEO({
    title: "Eterapp — Твоят асистент за емоционална подкрепа",
    description: "Eterapp е твоят асистент за емоционална подкрепа, наличен 24/7.",
    keywords: "психично здраве, емоционална подкрепа, асистент, настроение, стрес, Eterapp",
  });

  const features = [
    { Icon: MessageCircle, titleKey: "landing.features.ai.title",        descKey: "landing.features.ai.description" },
    { Icon: Shield,        titleKey: "landing.features.privacy.title",   descKey: "landing.features.privacy.description" },
    { Icon: Globe,         titleKey: "landing.features.bilingual.title", descKey: "landing.features.bilingual.description" },
    { Icon: Zap,           titleKey: "landing.features.available.title", descKey: "landing.features.available.description" },
  ];

  const plans = [
    {
      key: "first_step",
      nameKey: "landing.pricing.firstStep.name",
      price: t("landing.pricing.firstStep.price"),
      period: t("landing.pricing.firstStep.period"),
      bgnNote: null as string | null,
      descKey: "landing.pricing.firstStep.description",
      popular: false,
      featuresKey: "landing.pricing.firstStep.features",
      ctaKey: "landing.pricing.firstStep.cta",
      ctaVariant: "outline" as const,
      priceId: null as string | null,
    },
    {
      key: "personal_growth",
      nameKey: "landing.pricing.personalGrowth.name",
      price: t("landing.pricing.personalGrowth.price"),
      period: t("landing.pricing.personalGrowth.period"),
      bgnNote: "(39.09 лв.)",
      descKey: "landing.pricing.personalGrowth.description",
      popular: true,
      featuresKey: "landing.pricing.personalGrowth.features",
      ctaKey: "landing.pricing.personalGrowth.cta",
      ctaVariant: "default" as const,
      priceId: STRIPE_PRICE_IDS.PERSONAL_GROWTH,
    },
    {
      key: "expanded_horizons",
      nameKey: "landing.pricing.expandedHorizons.name",
      price: t("landing.pricing.expandedHorizons.price"),
      period: t("landing.pricing.expandedHorizons.period"),
      bgnNote: "(78.22 лв.)",
      descKey: "landing.pricing.expandedHorizons.description",
      popular: false,
      featuresKey: "landing.pricing.expandedHorizons.features",
      ctaKey: "landing.pricing.expandedHorizons.cta",
      ctaVariant: "secondary" as const,
      priceId: STRIPE_PRICE_IDS.EXPANDED_HORIZONS,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="px-4 py-16 md:py-28">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-7"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.h1
              className="font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-[1.05]"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
            >
              {t("landing.hero.tagline")}
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
            >
              {t("landing.hero.subtitle")}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:justify-center md:justify-start"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
            >
              {user ? (
                <Link to="/app">
                  <Button size="lg" className="w-full sm:w-auto text-base px-8 rounded-xl">
                    Към чата
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 rounded-xl"
                  onClick={() => { setAuthTab("register"); setAuthOpen(true); }}
                >
                  {t("landing.hero.cta")}
                </Button>
              )}
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-x-4 gap-y-2"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
            >
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                <span>{t("landing.hero.trust.secure")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Globe className="w-4 h-4 text-primary" />
                <span>{t("landing.hero.trust.users")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-primary" />
                <span>{t("landing.hero.trust.ai")}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Decorative right column */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-56 h-56 rounded-full border border-primary/20 flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border border-primary/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-primary">
                    <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/>
                    <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
                    <circle cx="14" cy="14" r="2.5" fill="currentColor"/>
                    <ellipse cx="14" cy="14" rx="12" ry="4.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" transform="rotate(-30 14 14)" className="icon-orbit"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="font-display font-normal text-3xl md:text-4xl mb-3">
              {t("landing.features.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg">
              {t("landing.features.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
            {features.map(({ Icon, titleKey, descKey }) => (
              <div
                key={titleKey}
                className="bg-card p-6 md:p-8 space-y-3"
              >
                <Icon className="w-5 h-5 text-primary" />
                <h3 className="text-base font-semibold">{t(titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="font-display font-normal text-3xl md:text-4xl mb-3">{t("landing.pricing.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("landing.pricing.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
            {plans.map((plan) => {
              const planFeatures = t(plan.featuresKey, { returnObjects: true }) as string[];
              const isHighlighted = plan.key === "personal_growth";
              return (
                <div
                  key={plan.key}
                  className={`rounded-xl p-6 space-y-5 ${
                    isHighlighted
                      ? "border-2 border-primary bg-card"
                      : "border border-border bg-card"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{t(plan.nameKey)}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                    {plan.bgnNote && (
                      <p className="text-xs text-muted-foreground mt-0.5">{plan.bgnNote}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">{t(plan.descKey)}</p>
                  </div>
                  <ul className="space-y-2">
                    {Array.isArray(planFeatures) && planFeatures.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.priceId ? "default" : "outline"}
                    className="w-full rounded-xl"
                    onClick={() => { setAuthTab("register"); setAuthOpen(true); }}
                  >
                    {t(plan.ctaKey)}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="font-display font-normal text-3xl md:text-4xl mb-3">
              {t("landing.howItWorks.title")}
            </h2>
            <p className="text-lg text-muted-foreground">{t("landing.howItWorks.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", titleKey: "landing.howItWorks.step1.title", descKey: "landing.howItWorks.step1.desc" },
              { step: "02", titleKey: "landing.howItWorks.step2.title", descKey: "landing.howItWorks.step2.desc" },
              { step: "03", titleKey: "landing.howItWorks.step3.title", descKey: "landing.howItWorks.step3.desc" },
            ].map(({ step, titleKey, descKey }) => (
              <div key={step} className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-sm">{step}</span>
                </div>
                <h3 className="font-semibold">{t(titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-muted py-10 px-4 text-center text-sm text-muted-foreground space-y-3">
        <p>{t("footer.rights")}</p>
        <p className="max-w-xl mx-auto leading-relaxed">{t("footer.disclaimer")}</p>
        <div className="flex justify-center gap-4 flex-wrap pt-1">
          <button
            onClick={() => openLegal("terms")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("footer.terms")}
          </button>

          <button
            onClick={() => openLegal("privacy")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("footer.privacy")}
          </button>

          <button
            onClick={() => openLegal("gdpr")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("footer.gdpr")}
          </button>

          <button
            onClick={() => openLegal("cookies")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("footer.cookies")}
          </button>
        </div>
        <p className="text-xs text-muted-foreground/70 mt-2">
          Защитено от reCAPTCHA —{" "}
          <a href="https://policies.google.com/privacy" className="underline hover:text-muted-foreground transition-colors">Поверителност</a>
          {" "}и{" "}
          <a href="https://policies.google.com/terms" className="underline hover:text-muted-foreground transition-colors">Условия</a>
        </p>
      </footer>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultTab={authTab}
      />
      <LegalModal open={legalModal} onClose={closeLegal} />
    </div>
  );
}
