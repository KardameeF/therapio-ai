import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useTranslation } from "react-i18next";

export function TermsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: 14 March 2026</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. Acceptance of Terms</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            By accessing and using Eterapp ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use the Service.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Description of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            Eterapp provides AI-based emotional support through conversational interaction, session notes, growth tasks, and audio therapies.
          </p>
          <p>
            <strong>Eterapp is NOT a medical service.</strong> It is not psychotherapy, psychological counselling, or psychiatric treatment. Eterapp does not diagnose, treat, or cure any medical or mental health condition.
          </p>
          <p>
            Eterapp does not replace professional psychological, psychiatric, or medical help. If you are experiencing a mental health crisis, please contact a qualified professional immediately (see Section 6).
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Minimum Age</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            In accordance with Article 25c of the Bulgarian Personal Data Protection Act (ЗЗЛД), the minimum age for using Eterapp is <strong>14 years</strong>.
          </p>
          <p>
            Users under the age of 14 may only use Eterapp with the verifiable consent of a parent or legal guardian. If we discover that a user under 14 is using the Service without appropriate consent, we will terminate the account and delete associated data.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. User Responsibilities</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <ul>
            <li>You must provide accurate and truthful information when creating your account.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You must not use the Service for any illegal or unauthorised purpose.</li>
            <li>You must not attempt to gain unauthorised access to the Service or its systems.</li>
            <li>You must not use the Service to generate content that is harmful, abusive, or violates the rights of others.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Subscription and Payments</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>Eterapp offers subscription plans with varying features and message limits:</p>
          <ul>
            <li><strong>First Step (Free):</strong> Limited messages per month with basic AI functionality.</li>
            <li><strong>Personal Growth:</strong> Expanded message limits, session notes, tasks, and priority support.</li>
            <li><strong>Expanded Horizons:</strong> Full access including audio therapies, voice assistant, and the most advanced AI model.</li>
          </ul>
          <p>
            All payments are processed securely by <strong>Stripe Inc.</strong> Eterapp does not store your credit card details.
          </p>
          <p>
            You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period.
          </p>
          <p>
            Refunds are handled in accordance with the Bulgarian Consumer Protection Act (Закон за защита на потребителите). For digital content and services, you have the right to withdraw within 14 days of purchase, unless you have explicitly consented to immediate provision of the service and acknowledged that you waive your right of withdrawal.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Medical Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            <strong>Important:</strong> Eterapp is an AI-based emotional support tool. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified health professional with any questions you may have regarding a medical or mental health condition.
          </p>
          <p>
            <strong>If you are in a crisis situation or experiencing thoughts of self-harm, please immediately contact:</strong>
          </p>
          <ul>
            <li><strong>Emergency Services:</strong> 112</li>
            <li><strong>National Child Helpline:</strong> 116 111</li>
          </ul>
          <p>
            Eterapp is not a substitute for emergency psychiatric help. Never disregard professional medical advice or delay seeking treatment because of something you read or experienced in Eterapp.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Privacy and Data</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            Your privacy is important to us. Please review our <a href="/legal/privacy">Privacy Policy</a> and <a href="/legal/gdpr">GDPR Compliance</a> page, which also govern your use of the Service.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>8. Intellectual Property</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            All content, features, and functionality of Eterapp — including text, graphics, logos, and software — are the property of Eterapp and are protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            Your chat content and personal data remain your property. We do not claim ownership of user-generated content.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>9. Limitation of Liability</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            To the fullest extent permitted by applicable law, Eterapp shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation loss of profits, data, use, goodwill, or other intangible losses resulting from your use of the Service.
          </p>
          <p>
            Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable Bulgarian or EU law, including liability for death or personal injury caused by negligence, or for fraud.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>10. Governing Law and Jurisdiction</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            These Terms are governed by and construed in accordance with the laws of the Republic of Bulgaria and applicable EU law.
          </p>
          <p>
            Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts of the Republic of Bulgaria.
          </p>
          <p>
            Consumers within the EU may also use the European Commission's Online Dispute Resolution platform:{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>11. Changes to Terms</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of Eterapp after the changes take effect constitutes acceptance of the revised Terms.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>12. Contact</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            If you have any questions about these Terms of Service, please contact us at privacy@eterapp.io
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
