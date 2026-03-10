import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../providers/theme-provider";
import { useAuth } from "../providers/AuthProvider";
import { AuthModal } from "../components/auth-modal";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { useSEO } from "../hooks/use-seo";
import {
  Sparkles,
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
  const [authTab, setAuthTab] = useState<"login" | "signup">("signup");
  const { user } = useAuth();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

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
      <section className="relative flex items-center justify-center px-4 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/8 via-cyan-500/5 to-transparent pointer-events-none" />
        <div className="absolute top-24 left-8 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-16 right-8 w-56 h-56 bg-cyan-400/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/20 text-sm text-violet-400">
            <Sparkles className="w-3.5 h-3.5" />
            {t("landing.hero.badge")}
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            {t("landing.hero.tagline")}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("landing.hero.subtitle")}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            {user ? (
              <Link to="/app">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 py-5">
                  Към чата
                </Button>
              </Link>
            ) : (
              <>
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 py-5"
                  onClick={() => { setAuthTab("signup"); setAuthOpen(true); }}
                >
                  {t("landing.hero.cta")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base px-8 py-5"
                  onClick={() => { setAuthTab("login"); setAuthOpen(true); }}
                >
                  {t("landing.hero.signIn")}
                </Button>
              </>
            )}
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 flex-wrap justify-center pt-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-violet-400" />
              <span>{t("landing.hero.trust.secure")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Globe className="w-4 h-4 text-violet-400" />
              <span>{t("landing.hero.trust.users")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-violet-400" />
              <span>{t("landing.hero.trust.ai")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("landing.features.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              {t("landing.features.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ Icon, titleKey, descKey }) => (
              <Card
                key={titleKey}
                className="group border border-border/50 hover:border-violet-400/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <CardHeader>
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <CardTitle className="text-lg">{t(titleKey)}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{t(descKey)}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-20 px-4 bg-gradient-to-r from-violet-500/5 to-cyan-500/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">{t("landing.pricing.title")}</h2>
            <p className="text-xl text-muted-foreground">{t("landing.pricing.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const planFeatures = t(plan.featuresKey, { returnObjects: true }) as string[];
              return (
                <Card
                  key={plan.key}
                  className={`relative overflow-hidden ${
                    plan.popular
                      ? "border-2 border-primary shadow-lg shadow-primary/10"
                      : "border border-border/50"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold rounded-bl-lg">
                      {t("landing.pricing.popular", "Популярен")}
                    </div>
                  )}
                  <CardHeader className={`text-center pb-4 ${plan.popular ? "pt-10" : "pt-6"}`}>
                    <div
                      className={`inline-flex items-center self-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                        plan.popular
                          ? "bg-primary/15 text-primary"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {t(plan.nameKey)}
                    </div>
                    <div className="space-y-1">
                      <div className="text-4xl font-bold">
                        {plan.price}
                        <span className="text-lg font-normal text-muted-foreground">{plan.period}</span>
                      </div>
                      {plan.bgnNote && (
                        <p className="text-xs text-muted-foreground">{plan.bgnNote}</p>
                      )}
                      <p className="text-sm text-muted-foreground pt-1">{t(plan.descKey)}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-2.5">
                      {Array.isArray(planFeatures) && planFeatures.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-sm">
                          <Check className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feat}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.priceId ? (
                      <Button
                        variant={plan.ctaVariant}
                        className="w-full"
                        onClick={() => { setAuthTab("signup"); setAuthOpen(true); }}
                      >
                        {t(plan.ctaKey)}
                      </Button>
                    ) : (
                      <Button
                        variant={plan.ctaVariant}
                        className="w-full"
                        onClick={() => { setAuthTab("signup"); setAuthOpen(true); }}
                      >
                        {t(plan.ctaKey)}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border-primary/20">
            <CardContent className="py-16 space-y-6">
              <h2 className="text-4xl font-bold">{t("landing.cta.title")}</h2>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto">
                {t("landing.cta.description")}
              </p>
              <Button
                size="lg"
                className="text-base px-10 py-5 mt-2"
                onClick={() => { setAuthTab("signup"); setAuthOpen(true); }}
              >
                {t("landing.cta.button")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-background py-10 px-4 text-center text-sm text-muted-foreground space-y-3">
        <p>{t("footer.rights")}</p>
        <p className="max-w-xl mx-auto leading-relaxed">{t("footer.disclaimer")}</p>
        <div className="flex justify-center gap-4 flex-wrap pt-1">
          <Link
            to="/legal/terms"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("footer.terms")}
          </Link>

          <a
            href="https://www.iubenda.com/privacy-policy/83536904"
            className={`iubenda-noiframe iubenda-embed text-sm ${
              resolvedTheme === "dark" ? "iubenda-white" : "iubenda-black"
            }`}
            title="Политика за поверителност"
          >
            {t("footer.privacy")}
          </a>

          <Link
            to="/legal/gdpr"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("footer.gdpr")}
          </Link>

          <a
            href="https://www.iubenda.com/privacy-policy/83536904/cookie-policy"
            className={`iubenda-noiframe iubenda-embed text-sm ${
              resolvedTheme === "dark" ? "iubenda-white" : "iubenda-black"
            }`}
            title="Политика за Бисквитки"
          >
            {t("footer.cookies")}
          </a>
        </div>
      </footer>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultTab={authTab}
      />
    </div>
  );
}
