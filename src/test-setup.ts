// Simple test to verify the setup works
// This file can be removed after verification

import { supabase } from "./lib/supabaseClient";
import { initSentry } from "./lib/sentry";

console.log("🧪 Testing Therapio AI Setup...");

// Test environment variables
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_STRIPE_PUBLIC_KEY',
  'VITE_SENTRY_DSN',
  'VITE_RECAPTCHA_SITE_KEY'
];

const missingEnvVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

if (missingEnvVars.length > 0) {
  console.warn("⚠️ Missing environment variables:", missingEnvVars);
  console.warn("Please check your .env file and ensure all required variables are set.");
} else {
  console.log("✅ All environment variables are configured");
}

// Test Supabase connection
if (supabase) {
  console.log("✅ Supabase client initialized successfully");
} else {
  console.error("❌ Failed to initialize Supabase client");
}

// Test Sentry initialization
try {
  initSentry();
  console.log("✅ Sentry initialized successfully");
} catch (error) {
  console.warn("⚠️ Sentry initialization failed:", error);
}

console.log("🎉 Setup test completed!");
console.log("Run 'npm run dev' to start the development server");
