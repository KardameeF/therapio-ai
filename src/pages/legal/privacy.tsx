import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useTranslation } from "react-i18next";

export function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: 14 March 2026</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. Data Controller</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>The data controller responsible for your personal data is:</p>
          <p>
            [COMPANY NAME], UIC: [UIC NUMBER]<br />
            Sofia, Bulgaria<br />
            Email: privacy@eterapp.io
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. What Data We Collect</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <h4>Account data</h4>
          <ul>
            <li>Email address</li>
            <li>Password (stored in hashed form only — we never see or store your plaintext password)</li>
            <li>Display name (optional)</li>
          </ul>

          <h4>Chat content</h4>
          <ul>
            <li>Messages exchanged with the AI assistant</li>
            <li>Session notes and tasks generated from conversations</li>
          </ul>
          <p>
            <strong>Important:</strong> Chat messages may contain emotional or health-related information. This constitutes special category data under Article 9 of GDPR. We process this data only with your explicit consent.
          </p>

          <h4>Subscription and payment data</h4>
          <ul>
            <li>Current subscription plan</li>
            <li>Payment history and billing information (processed and stored by Stripe — we do not store your card details)</li>
            <li>Prepaid credit balance</li>
          </ul>

          <h4>Technical data</h4>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Usage preferences (language, theme)</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Legal Basis for Processing</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>We process your personal data under the following legal bases as defined by the General Data Protection Regulation (GDPR):</p>

          <h4>Performance of a contract — Article 6(1)(b)</h4>
          <p>Processing necessary to provide the Eterapp service, including account authentication, subscription management, and delivering core functionality.</p>

          <h4>Explicit consent — Article 6(1)(a) and Article 9(2)(a)</h4>
          <p>Processing of chat content and any emotional or health-related data it may contain. You provide this consent when you use the chat feature. You may withdraw consent at any time (see Section 7 below).</p>

          <h4>Legitimate interest — Article 6(1)(f)</h4>
          <p>Processing necessary for security measures, fraud prevention, and service reliability. Our legitimate interest does not override your fundamental rights and freedoms.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Third-Party Processors</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>We share your data with the following categories of third-party processors, each bound by data processing agreements:</p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Category</th>
                  <th className="border border-border p-2 text-left">Company</th>
                  <th className="border border-border p-2 text-left">Region</th>
                  <th className="border border-border p-2 text-left">Legal basis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Authentication & Database</td>
                  <td className="border border-border p-2">Supabase Inc.</td>
                  <td className="border border-border p-2">Stockholm, EU</td>
                  <td className="border border-border p-2">Necessary for contract</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Payment processing</td>
                  <td className="border border-border p-2">Stripe Inc.</td>
                  <td className="border border-border p-2">USA</td>
                  <td className="border border-border p-2">Standard Contractual Clauses</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">AI processing</td>
                  <td className="border border-border p-2">OpenAI Inc.</td>
                  <td className="border border-border p-2">USA</td>
                  <td className="border border-border p-2">Standard Contractual Clauses</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Bot protection & Login</td>
                  <td className="border border-border p-2">Google LLC</td>
                  <td className="border border-border p-2">USA</td>
                  <td className="border border-border p-2">Standard Contractual Clauses</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Hosting & CDN</td>
                  <td className="border border-border p-2">Netlify Inc.</td>
                  <td className="border border-border p-2">Rotterdam, EU</td>
                  <td className="border border-border p-2">Necessary for contract</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Transactional email</td>
                  <td className="border border-border p-2">Resend Inc.</td>
                  <td className="border border-border p-2">USA</td>
                  <td className="border border-border p-2">Standard Contractual Clauses</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">DNS & Network</td>
                  <td className="border border-border p-2">Cloudflare Inc.</td>
                  <td className="border border-border p-2">USA</td>
                  <td className="border border-border p-2">Standard Contractual Clauses</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            For detailed privacy policies of each processor, see the links in our <a href="/legal/cookies">Cookie Policy</a> and <a href="/legal/gdpr">GDPR Compliance</a> pages.
          </p>
          <p>
            <strong>Note:</strong> OpenAI does not use data submitted via the API to train its models.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Automated Decision-Making</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            Eterapp uses artificial intelligence to generate conversational responses, session notes, and tasks based on your chat messages.
          </p>
          <p>
            This AI processing does <strong>not</strong> constitute automated decision-making that produces legal effects or similarly significantly affects you within the meaning of Article 22 GDPR. No profiling is carried out.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Data Retention</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <ul>
            <li><strong>Account data:</strong> Retained until you delete your account.</li>
            <li><strong>Chat history:</strong> Retained until deleted by you or upon account deletion.</li>
            <li><strong>Payment and billing data:</strong> Retained for 5 years to comply with tax and accounting obligations under Bulgarian law.</li>
            <li><strong>Technical logs:</strong> Retained for 90 days, then automatically deleted.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Your Rights</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>Under GDPR Articles 15–22, you have the right to:</p>
          <ul>
            <li><strong>Access</strong> — Obtain a copy of the personal data we hold about you (Art. 15)</li>
            <li><strong>Rectification</strong> — Correct inaccurate or incomplete data (Art. 16)</li>
            <li><strong>Erasure</strong> — Request deletion of your data ("right to be forgotten") (Art. 17)</li>
            <li><strong>Restriction</strong> — Request restricted processing in certain circumstances (Art. 18)</li>
            <li><strong>Data portability</strong> — Receive your data in a structured, machine-readable format (Art. 20)</li>
            <li><strong>Object</strong> — Object to processing based on legitimate interest (Art. 21)</li>
            <li><strong>Withdraw consent</strong> — Withdraw your consent at any time without affecting the lawfulness of prior processing</li>
          </ul>

          <h4>How to withdraw consent or delete your data</h4>
          <ul>
            <li>In the app: Settings → Delete account</li>
            <li>By email: send a request to privacy@eterapp.io</li>
          </ul>

          <p>We will respond to your request within one month of receipt (GDPR Article 12(3)).</p>

          <h4>Right to lodge a complaint</h4>
          <p>You have the right to lodge a complaint with the Commission for Personal Data Protection (CPDP/КЗЛД):</p>
          <ul>
            <li>Website: <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer">cpdp.bg</a></li>
            <li>Phone: +359 2 915 3518</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>8. Children</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            In accordance with Article 25c of the Bulgarian Personal Data Protection Act (ЗЗЛД), the minimum age for consenting to data processing in connection with information society services is <strong>14 years</strong>.
          </p>
          <p>
            Children under the age of 14 may only use Eterapp with the consent of a parent or legal guardian. If we become aware that we have collected data from a child under 14 without appropriate parental consent, we will delete that data promptly.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>9. Crisis Situations</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            Eterapp is not a crisis service and does not replace professional emergency help. If you or someone you know is in a crisis situation or experiencing thoughts of self-harm, please contact:
          </p>
          <ul>
            <li><strong>Emergency Services:</strong> 112</li>
            <li><strong>National Child Helpline:</strong> 116 111</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>10. Changes to This Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page and updating the "Last updated" date. For significant changes, we may also notify you via email.
          </p>
          <p>
            Your continued use of Eterapp after changes take effect constitutes acceptance of the revised policy.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>11. Contact</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>For any questions about this Privacy Policy or our data practices:</p>
          <p>Email: dpo@eterapp.io</p>
        </CardContent>
      </Card>
    </div>
  );
}
