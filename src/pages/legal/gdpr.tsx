import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useTranslation } from "react-i18next";

export function GDPRPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">GDPR Compliance</h1>
        <p className="text-muted-foreground">General Data Protection Regulation Information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Rights Under GDPR</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            As a data subject under the General Data Protection Regulation (GDPR), you have the following rights:
          </p>
          <h4>Right of Access (Article 15)</h4>
          <p>You have the right to obtain confirmation as to whether or not personal data concerning you is being processed.</p>
          
          <h4>Right to Rectification (Article 16)</h4>
          <p>You have the right to have inaccurate personal data corrected and incomplete personal data completed.</p>
          
          <h4>Right to Erasure (Article 17)</h4>
          <p>You have the right to request the deletion of your personal data under certain circumstances.</p>
          
          <h4>Right to Restrict Processing (Article 18)</h4>
          <p>You have the right to request the restriction of processing of your personal data.</p>
          
          <h4>Right to Data Portability (Article 20)</h4>
          <p>You have the right to receive your personal data in a structured, commonly used format.</p>
          
          <h4>Right to Object (Article 21)</h4>
          <p>You have the right to object to the processing of your personal data.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lawful Basis for Processing</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>We process your personal data under the following lawful bases:</p>
          <ul>
            <li><strong>Consent:</strong> You have given clear consent for processing your personal data</li>
            <li><strong>Contract:</strong> Processing is necessary for the performance of a contract</li>
            <li><strong>Legitimate Interest:</strong> Processing is necessary for our legitimate interests</li>
            <li><strong>Legal Obligation:</strong> Processing is necessary for compliance with a legal obligation</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Protection Officer</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            We have appointed a Data Protection Officer (DPO) to ensure compliance with GDPR and to act as your point of contact for data protection matters.
          </p>
          <p>
            <strong>Contact Information:</strong><br />
            Email: dpo@eterapp.io
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Breach Notification</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            In the event of a personal data breach that is likely to result in a high risk to your rights and freedoms, we will notify you without undue delay and within 72 hours where feasible.
          </p>
          <p>
            We will also notify the relevant supervisory authority within 72 hours of becoming aware of the breach.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>International Transfers</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            If we transfer your personal data outside the European Economic Area (EEA), we will ensure appropriate safeguards are in place, such as:
          </p>
          <ul>
            <li>Adequacy decisions by the European Commission</li>
            <li>Standard Contractual Clauses (SCCs)</li>
            <li>Binding Corporate Rules</li>
            <li>Certification schemes and codes of conduct</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exercising Your Rights</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            To exercise any of your GDPR rights, please contact us at:
          </p>
          <p>
            Email: privacy@eterapp.io<br />
            Subject Line: "GDPR Rights Request"<br />
            Please include your full name and email address associated with your account.
          </p>
          <p>
            We will respond to your request within one month of receipt.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
