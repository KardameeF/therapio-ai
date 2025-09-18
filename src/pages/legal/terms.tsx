import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useTranslation } from "react-i18next";

export function TermsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. Acceptance of Terms</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            By accessing and using Therapio AI ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Description of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            Therapio AI is a mental wellness application that provides mood tracking, sleep monitoring, stress assessment, and goal setting features. The Service uses artificial intelligence to provide insights and recommendations for mental health and wellness.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. User Responsibilities</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <ul>
            <li>You must provide accurate and truthful information</li>
            <li>You are responsible for maintaining the confidentiality of your account</li>
            <li>You must not use the Service for any illegal or unauthorized purpose</li>
            <li>You must not attempt to gain unauthorized access to the Service</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Medical Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            <strong>Important:</strong> Therapio AI is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Privacy and Data</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Limitation of Liability</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            In no event shall Therapio AI be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Changes to Terms</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Service.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
