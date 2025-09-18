import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useTranslation } from "react-i18next";
import { stripePromise } from "../lib/stripe";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../providers/AuthProvider";
import { CreditCard, ExternalLink } from "lucide-react";

export function BillingPage() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();

  const handleManageBilling = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Call Supabase Edge Function to create Stripe customer portal session
      const { data, error } = await supabase.functions.invoke('stripe-webhook', {
        body: { action: 'create_portal_session', user_id: user.id }
      });

      if (error) throw error;

      // Redirect to Stripe customer portal
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating portal session:', error);
      // Fallback: show message about contacting support
      alert('Please contact support to manage your billing');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Call Supabase Edge Function to create Stripe checkout session
      const { data, error } = await supabase.functions.invoke('stripe-webhook', {
        body: { action: 'create_checkout_session', user_id: user.id, price_id: 'price_premium' }
      });

      if (error) throw error;

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Error creating checkout session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("billing.title")}</h1>
        <p className="text-muted-foreground">Manage your subscription and billing</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Plan
            </CardTitle>
            <CardDescription>Your current subscription details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Free Plan</span>
              <span className="text-sm text-muted-foreground">$0/month</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Mood entries</span>
                <span className="text-muted-foreground">5/month</span>
              </div>
              <div className="flex justify-between">
                <span>Sleep & stress entries</span>
                <span className="text-muted-foreground">5/month</span>
              </div>
              <div className="flex justify-between">
                <span>Goals</span>
                <span className="text-muted-foreground">3 active</span>
              </div>
            </div>

            <Button 
              onClick={handleManageBilling} 
              disabled={loading}
              className="w-full"
            >
              {loading ? "Loading..." : "Manage Billing"}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upgrade to Premium</CardTitle>
            <CardDescription>Unlock unlimited tracking and AI insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Premium Plan</span>
              <span className="text-sm text-muted-foreground">$9.99/month</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Mood entries</span>
                <span className="text-green-600">Unlimited</span>
              </div>
              <div className="flex justify-between">
                <span>Sleep & stress entries</span>
                <span className="text-green-600">Unlimited</span>
              </div>
              <div className="flex justify-between">
                <span>Goals</span>
                <span className="text-green-600">Unlimited</span>
              </div>
              <div className="flex justify-between">
                <span>AI Insights</span>
                <span className="text-green-600">✓</span>
              </div>
              <div className="flex justify-between">
                <span>Export Data</span>
                <span className="text-green-600">✓</span>
              </div>
            </div>

            <Button 
              onClick={handleUpgrade} 
              disabled={loading}
              className="w-full"
              variant="default"
            >
              {loading ? "Loading..." : "Upgrade Now"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your recent invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No billing history available.</p>
            <p className="text-sm mt-1">Your invoices will appear here after your first payment.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
