import React from "react";
import { Route, Routes } from "react-router-dom";
import "./lib/i18n";
import { initSentry } from "./lib/sentry";
import { ThemeProvider } from "./providers/theme-provider";
import { AuthProvider } from "./providers/AuthProvider";
import { Header } from "./components/header";
import { GuardedRoute } from "./components/guarded-route";
import { AppLayout } from "./layouts/app-layout";
import { RecaptchaWrapper } from "./components/recaptcha-wrapper";
import { LandingPage } from "./pages/landing";
import { LoginPage } from "./pages/login";
import { AuthCallbackPage } from "./pages/auth-callback";
import { DashboardPage } from "./pages/dashboard";
import { MoodPage } from "./pages/mood";
import { SleepStressPage } from "./pages/sleep-stress";
import { GoalsPage } from "./pages/goals";
import { BillingPage } from "./pages/billing";
import { ProfilePage } from "./pages/profile";
import { AdminPage } from "./pages/admin";
import { TermsPage } from "./pages/legal/terms";
import { PrivacyPage } from "./pages/legal/privacy";
import { GDPRPage } from "./pages/legal/gdpr";
import { CookiesPage } from "./pages/legal/cookies";

// Initialize Sentry
initSentry();

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RecaptchaWrapper>
          <Routes>
            {/* Public routes */}
            <Route 
              index 
              element={
                <>
                  <Header />
                  <LandingPage />
                </>
              } 
            />
            
            <Route 
              path="/login" 
              element={
                <>
                  <Header />
                  <LoginPage />
                </>
              } 
            />
            
            <Route 
              path="/auth/callback" 
              element={<AuthCallbackPage />} 
            />

            {/* Protected routes */}
            <Route element={<GuardedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/app" element={<DashboardPage />} />
                <Route path="/mood" element={<MoodPage />} />
                <Route path="/sleep-stress" element={<SleepStressPage />} />
                <Route path="/goals" element={<GoalsPage />} />
                <Route path="/billing" element={<BillingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Route>

            {/* Legal pages */}
            <Route 
              path="/legal/terms" 
              element={
                <>
                  <Header />
                  <TermsPage />
                </>
              } 
            />
            <Route 
              path="/legal/privacy" 
              element={
                <>
                  <Header />
                  <PrivacyPage />
                </>
              } 
            />
            <Route 
              path="/legal/gdpr" 
              element={
                <>
                  <Header />
                  <GDPRPage />
                </>
              } 
            />
            <Route 
              path="/legal/cookies" 
              element={
                <>
                  <Header />
                  <CookiesPage />
                </>
              } 
            />
          </Routes>
        </RecaptchaWrapper>
      </AuthProvider>
    </ThemeProvider>
  );
}