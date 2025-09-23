import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSEO } from "../hooks/use-seo";

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  
  useSEO({
    title: "Payment Successful - Therapio AI",
    description: "Your subscription has been activated successfully. Start your mental wellness journey with Therapio AI.",
  });

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Here you could verify the session with Stripe if needed
    // For now, we'll just show success after a brief loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground-muted">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader className="pb-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-green-600 mb-2">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-lg">
              Your subscription has been activated successfully. Welcome to your mental wellness journey!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                <strong>What's next?</strong><br />
                You can now access all premium features and start tracking your mental wellness journey.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Manage Subscription
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
