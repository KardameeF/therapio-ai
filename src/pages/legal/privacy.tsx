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
          <p>
            The data controller responsible for your personal data is:
          </p>
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
            <strong>Important:</strong> Chat messages may contain emotional or health-related information, which constitutes special category data under Article 9 of GDPR. We process this data only with your explicit consent.
          </p>

          <h4>Subscription and payment data</h4>
          <ul>
            <li>Current subscription plan</li>
            <li>Payment history and billing information (processed and stored by Stripe)</li>
            <li>Prepaid credit balance</li>
          </ul>

          <h4>Technical data</h4>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Usage patterns and preferences (language, theme)</li>
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
          <p>
            Processing necessary to provide the Eterapp service, including account authentication, subscription management, and delivering core functionality.
          </p>

          <h4>Explicit consent — Article 6(1)(a) and Article 9(2)(a)</h4>
          <p>
            Processing of chat content and emotional/health-related data. You provide this consent when you use the chat feature. You may withdraw consent at any time by deleting your chat history or your account.
          </p>

          <h4>Legitimate interest — Article 6(1)(f)</h4>
          <p>
            Processing necessary for security measures, fraud prevention, and service improvement. Our legitimate interest does not override your fundamental rights and freedoms.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Third-Party Processors</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>We share your data with the following third-party processors, each bound by data processing agreements:</p>

          <ul>
            <li>
              <strong>Supabase Inc.</strong> — Authentication and database services.
              Servers located in Stockholm, EU. No data transfer outside the EEA.
            </li>
            <li>
              <strong>Stripe Inc.</strong> — Payment processing.
              Protected by Standard Contractual Clauses (SCCs) for any data transferred outside the EEA.
            </li>
            <li>
              <strong>OpenAI Inc.</strong> — AI processing of chat messages.
              Protected by Standard Contractual Clauses (SCCs). Your data is not used to train OpenAI's models.
            </li>
            <li>
              <strong>Google LLC</strong> — reCAPTCHA v3 (bot protection) and OAuth sign-in.
              Protected by Standard Contractual Clauses (SCCs).
            </li>
            <li>
              <strong>Netlify Inc.</strong> — Application hosting.
              Servers located in Rotterdam, EU. No data transfer outside the EEA.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Data Retention</CardTitle>
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
          <CardTitle>6. Data Security</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            We implement appropriate technical and organisational measures to protect your personal data, including:
          </p>
          <ul>
            <li>Encryption of data in transit (TLS) and at rest</li>
            <li>Access controls and role-based authentication</li>
            <li>Secure hosting within the European Union</li>
            <li>Regular review of security practices</li>
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
          <p>
            To exercise any of these rights, contact us at privacy@eterapp.io. We will respond within one month of your request.
          </p>
          <p>
            <strong>Right to lodge a complaint:</strong> You have the right to lodge a complaint with the Commission for Personal Data Protection (CPDP/КЗЛД):
          </p>
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
          <CardTitle>9. Changes to This Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on this page and updating the "Last updated" date. For significant changes, we may also notify you via email.
          </p>
          <p>
            Your continued use of Eterapp after changes take effect constitutes acceptance of the revised policy.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>10. Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            If you have any questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <p>
            Email: privacy@eterapp.io
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
