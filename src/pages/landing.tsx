import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Brain, Heart, Target, TrendingUp, Sparkles, Shield, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSEO } from "../hooks/use-seo";

export function LandingPage() {
  const { t } = useTranslation();
  
  useSEO({
    title: "Therapio AI - AI-Powered Mental Wellness Companion",
    description: "Track your mood, sleep, stress, and goals with AI-powered insights. Start your mental wellness journey with Therapio AI today.",
    keywords: "mental health, wellness, mood tracking, sleep tracking, stress management, AI therapy, self-care, mindfulness",
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent"></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl"></div>
        
        <div className="relative max-w-5xl mx-auto text-center space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              {t("landing.hero.badge")}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-heading">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("landing.hero.title")}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              {t("landing.hero.tagline")}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                {t("landing.hero.cta")}
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-4">
                {t("landing.hero.signIn")}
              </Button>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-foreground-muted pt-8">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>{t("landing.hero.trust.secure")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>{t("landing.hero.trust.users")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <span>{t("landing.hero.trust.ai")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              {t("landing.features.title")}
              <span className="text-primary"> {t("landing.features.subtitle")}</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              {t("landing.features.description")}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{t("landing.features.mood.title")}</CardTitle>
                <CardDescription className="text-base">
                  {t("landing.features.mood.description")}
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Brain className="h-8 w-8 text-secondary-600" />
                </div>
                <CardTitle className="text-xl">{t("landing.features.sleep.title")}</CardTitle>
                <CardDescription className="text-base">
                  {t("landing.features.sleep.description")}
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{t("landing.features.goals.title")}</CardTitle>
                <CardDescription className="text-base">
                  {t("landing.features.goals.description")}
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <TrendingUp className="h-8 w-8 text-secondary-600" />
                </div>
                <CardTitle className="text-xl">{t("landing.features.ai.title")}</CardTitle>
                <CardDescription className="text-base">
                  {t("landing.features.ai.description")}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-6">
              {t("landing.pricing.title")}
            </h2>
            <p className="text-xl text-foreground-muted">
              {t("landing.pricing.subtitle")}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* First Step - Free */}
            <Card className="relative overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/20 text-secondary-700 text-sm font-medium mb-4">
                  {t("landing.pricing.firstStep.name")}
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-foreground">
                    {t("landing.pricing.firstStep.price")}
                  </div>
                  <p className="text-foreground-muted">
                    {t("landing.pricing.firstStep.description")}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {t("landing.pricing.firstStep.features", { returnObjects: true }).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div>
                      <span className="text-foreground-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    {t("landing.pricing.firstStep.cta")}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Personal Growth - $19.99 */}
            <Card className="relative overflow-hidden border-2 border-primary">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg">
                Popular
              </div>
              <CardHeader className="text-center pb-4 pt-8">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                  {t("landing.pricing.personalGrowth.name")}
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-foreground">
                    {t("landing.pricing.personalGrowth.price")}
                    <span className="text-lg text-foreground-muted">
                      {t("landing.pricing.personalGrowth.period")}
                    </span>
                  </div>
                  <p className="text-foreground-muted">
                    {t("landing.pricing.personalGrowth.description")}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {t("landing.pricing.personalGrowth.features", { returnObjects: true }).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-foreground-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/login">
                  <Button className="w-full">
                    {t("landing.pricing.personalGrowth.cta")}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Expanded Horizons - $39.99 */}
            <Card className="relative overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/20 text-secondary-700 text-sm font-medium mb-4">
                  {t("landing.pricing.expandedHorizons.name")}
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-foreground">
                    {t("landing.pricing.expandedHorizons.price")}
                    <span className="text-lg text-foreground-muted">
                      {t("landing.pricing.expandedHorizons.period")}
                    </span>
                  </div>
                  <p className="text-foreground-muted">
                    {t("landing.pricing.expandedHorizons.description")}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {t("landing.pricing.expandedHorizons.features", { returnObjects: true }).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div>
                      <span className="text-foreground-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/login">
                  <Button variant="secondary" className="w-full">
                    {t("landing.pricing.expandedHorizons.cta")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="py-16">
              <h2 className="text-4xl font-bold font-heading mb-6">
                {t("landing.cta.title")}
              </h2>
              <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto">
                {t("landing.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                    {t("landing.cta.button")}
                  </Button>
                </Link>
                <Link to="/legal/privacy">
                  <Button size="lg" variant="ghost" className="w-full sm:w-auto text-lg px-8 py-4">
                    {t("landing.cta.privacy")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
