import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useTranslation } from "react-i18next";

export function GDPRPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">GDPR Compliance</h1>
        <p className="text-muted-foreground">Last updated: 14 March 2026</p>
      </div>

      <Card>
        <CardContent className="prose dark:prose-invert pt-6">
          <p>
            This page supplements our <a href="/legal/privacy">Privacy Policy</a> with specific information about your rights under the General Data Protection Regulation (EU) 2016/679 (GDPR) and the Bulgarian Personal Data Protection Act (PDPA/ЗЗЛД).
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Rights Under GDPR</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>As a data subject under GDPR, you have the following rights:</p>

          <h4>Right of Access (Article 15)</h4>
          <p>You have the right to obtain confirmation as to whether personal data concerning you is being processed, and to access that data along with information about how it is used.</p>

          <h4>Right to Rectification (Article 16)</h4>
          <p>You have the right to have inaccurate personal data corrected and incomplete personal data completed.</p>

          <h4>Right to Erasure (Article 17)</h4>
          <p>You have the right to request the deletion of your personal data ("right to be forgotten") where the data is no longer necessary, you withdraw consent, or there is no overriding legitimate ground for processing.</p>

          <h4>Right to Restrict Processing (Article 18)</h4>
          <p>You have the right to request the restriction of processing of your personal data in certain circumstances, such as when you contest its accuracy.</p>

          <h4>Right to Data Portability (Article 20)</h4>
          <p>You have the right to receive your personal data in a structured, commonly used, and machine-readable format, and to transmit that data to another controller.</p>

          <h4>Right to Object (Article 21)</h4>
          <p>You have the right to object to the processing of your personal data where the processing is based on legitimate interests.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lawful Basis for Processing</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>We process your personal data under the following lawful bases:</p>
          <ul>
            <li><strong>Performance of a contract (Art. 6(1)(b)):</strong> Account creation, authentication, and subscription management.</li>
            <li><strong>Explicit consent (Art. 6(1)(a) and Art. 9(2)(a)):</strong> Processing of chat content, including emotional and health-related data (special category data).</li>
            <li><strong>Legitimate interest (Art. 6(1)(f)):</strong> Security measures, fraud prevention, and service reliability.</li>
            <li><strong>Legal obligation (Art. 6(1)(c)):</strong> Retention of billing records as required by tax and accounting law.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Special Category Data</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            Chat messages exchanged with the AI assistant may contain emotional or health-related information. This constitutes special category data under Article 9 of GDPR.
          </p>
          <p>We process this data under the following conditions:</p>
          <ul>
            <li><strong>Legal basis:</strong> Explicit consent (Article 9(2)(a)). You provide this consent each time you use the chat feature.</li>
            <li><strong>Encryption:</strong> All chat data is encrypted in transit (TLS) and at rest.</li>
            <li><strong>Access restrictions:</strong> Chat data is accessible only to you and is processed by OpenAI solely for generating AI responses.</li>
            <li><strong>No sharing:</strong> Your chat content is not shared with any third party other than OpenAI for the purpose of providing the service.</li>
            <li><strong>No training:</strong> OpenAI does not use data submitted via the API to train its models.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Protection Contact</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            We do not currently have a formally appointed Data Protection Officer (DPO) as we do not meet the mandatory appointment thresholds under Article 37 GDPR.
          </p>
          <p>
            For all data protection enquiries, please contact: <strong>dpo@eterapp.io</strong>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Breach Notification</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            In the event of a personal data breach that is likely to result in a high risk to your rights and freedoms, we will notify you without undue delay.
          </p>
          <p>
            We will also notify the relevant supervisory authority (КЗЛД) within 72 hours of becoming aware of the breach, as required by Article 33 GDPR.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>International Transfers</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <h4>Within the EEA (no transfer outside the EEA)</h4>
          <ul>
            <li><strong>Netlify Inc.</strong> — Application hosting, servers in Rotterdam, EU.</li>
            <li><strong>Supabase Inc.</strong> — Authentication and database, servers in Stockholm, EU.</li>
          </ul>

          <h4>Outside the EEA — protected by Standard Contractual Clauses (Article 46(2)(c) GDPR)</h4>
          <ul>
            <li><strong>OpenAI Inc.</strong> (USA) — AI processing of chat messages.</li>
            <li><strong>Stripe Inc.</strong> (USA) — Payment processing.</li>
            <li><strong>Google LLC</strong> (USA) — reCAPTCHA v3 and OAuth sign-in.</li>
            <li><strong>Resend Inc.</strong> (USA) — Transactional email delivery.</li>
            <li><strong>Cloudflare Inc.</strong> (USA) — DNS and network services.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supervisory Authority</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>You have the right to lodge a complaint with the Bulgarian supervisory authority:</p>
          <p>
            <strong>Commission for Personal Data Protection (CPDP / КЗЛД)</strong><br />
            Address: 2 Prof. Tsvetan Lazarov Blvd., Sofia 1592, Bulgaria<br />
            Website: <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer">cpdp.bg</a><br />
            Phone: +359 2 915 3518
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exercising Your Rights</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>To exercise any of your GDPR rights, please contact us at:</p>
          <p>
            Email: privacy@eterapp.io<br />
            Subject line: "GDPR Rights Request"<br />
            Please include your full name and the email address associated with your account.
          </p>
          <p>
            We will respond to your request within one month of receipt. In complex cases, we may extend this period by up to two additional months, in which case we will inform you within the first month.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
