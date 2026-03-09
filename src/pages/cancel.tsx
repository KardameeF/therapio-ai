import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSEO } from "../hooks/use-seo";

export function CancelPage() {
  const { t } = useTranslation();
  
  useSEO({
    title: "Payment Cancelled - Eterapp",
    description: "Your payment was cancelled. You can try again or explore our free features.",
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader className="pb-6">
            <div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <XCircle className="h-12 w-12 text-orange-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-orange-600 mb-2">
              Payment Cancelled
            </CardTitle>
            <CardDescription className="text-lg">
              Your payment was cancelled. No charges have been made to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-800 text-sm">
                <strong>No worries!</strong><br />
                You can try again anytime or start with our free features to explore the platform.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Pricing
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
