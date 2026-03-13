import React from "react";
import { Route, Routes } from "react-router-dom";
import "./lib/i18n";
import { initSentry } from "./lib/sentry";
import { ThemeProvider } from "./providers/theme-provider";
import { AuthProvider } from "./providers/AuthProvider";
import { Header } from "./components/header";
import { GuardedRoute } from "./components/guarded-route";
import { AdminGuard } from "./components/AdminGuard";
import { AppLayout } from "./layouts/app-layout";
import { RecaptchaWrapper } from "./components/recaptcha-wrapper";
import { LandingPage } from "./pages/landing";
import { LoginPage } from "./pages/login";
import { AuthCallbackPage } from "./pages/auth-callback";
import { ChatPage } from "./pages/chat";
import { BillingPage } from "./pages/billing";
import { ProfilePage } from "./pages/profile";
import { AdminPage } from "./pages/admin";
import { TermsPage } from "./pages/legal/terms";
import { PrivacyPage } from "./pages/legal/privacy";
import { GDPRPage } from "./pages/legal/gdpr";
import { CookiesPage } from "./pages/legal/cookies";
import { SuccessPage } from "./pages/success";
import { CancelPage } from "./pages/cancel";
import { ResetPasswordPage } from "./pages/reset-password";
import { FeaturesPage } from "./pages/features";

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
              path="/features" 
              element={
                <>
                  <Header />
                  <FeaturesPage />
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

            {/* Stripe Checkout pages */}
            <Route 
              path="/success" 
              element={
                <>
                  <Header />
                  <SuccessPage />
                </>
              } 
            />
            <Route 
              path="/cancel" 
              element={
                <>
                  <Header />
                  <CancelPage />
                </>
              } 
            />
            <Route 
              path="/reset-password" 
              element={
                <>
                  <Header />
                  <ResetPasswordPage />
                </>
              } 
            />

            {/* Protected routes */}
            <Route element={<GuardedRoute />}>
              <Route path="/app" element={<ChatPage />} />

              <Route element={<AppLayout />}>
                <Route path="/billing" element={<BillingPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                {/* Admin-only route — requires role = 'admin' */}
                <Route element={<AdminGuard />}>
                  <Route path="/admin" element={<AdminPage />} />
                </Route>
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