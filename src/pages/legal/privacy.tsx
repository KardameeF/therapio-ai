import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useTranslation } from "react-i18next";

export function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("legal.pageTitle")}</h1>
        <p className="text-muted-foreground">{t("legal.lastUpdated")}: {t("legal.lastUpdatedDate")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.dataController.title")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.dataController.intro")}</p>
          <p>
            [COMPANY NAME], UIC: [UIC NUMBER]<br />
            {t("legal.dataController.address")}<br />
            {t("legal.dataController.email")}: privacy@eterapp.io
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.whatWeCollect.title")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <h4>{t("legal.whatWeCollect.accountData")}</h4>
          <ul>
            <li>{t("legal.whatWeCollect.email")}</li>
            <li>{t("legal.whatWeCollect.password")}</li>
            <li>{t("legal.whatWeCollect.displayName")}</li>
          </ul>

          <h4>{t("legal.whatWeCollect.chatContent")}</h4>
          <ul>
            <li>{t("legal.whatWeCollect.chatMessages")}</li>
            <li>{t("legal.whatWeCollect.sessionNotes")}</li>
          </ul>
          <p>
            <strong>Important:</strong> {t("legal.whatWeCollect.chatWarning")}
          </p>

          <h4>{t("legal.whatWeCollect.subscriptionData")}</h4>
          <ul>
            <li>{t("legal.whatWeCollect.currentPlan")}</li>
            <li>{t("legal.whatWeCollect.paymentHistory")}</li>
            <li>{t("legal.whatWeCollect.creditBalance")}</li>
          </ul>

          <h4>{t("legal.whatWeCollect.technicalData")}</h4>
          <ul>
            <li>{t("legal.whatWeCollect.ipAddress")}</li>
            <li>{t("legal.whatWeCollect.browserInfo")}</li>
            <li>{t("legal.whatWeCollect.deviceInfo")}</li>
            <li>{t("legal.whatWeCollect.usagePrefs")}</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.legalBasis.title")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.legalBasis.intro")}</p>

          <h4>{t("legal.legalBasis.contractTitle")}</h4>
          <p>{t("legal.legalBasis.contractDesc")}</p>

          <h4>{t("legal.legalBasis.consentTitle")}</h4>
          <p>{t("legal.legalBasis.consentDesc")}</p>

          <h4>{t("legal.legalBasis.legitimateTitle")}</h4>
          <p>{t("legal.legalBasis.legitimateDesc")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.processors.title")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.processors.intro")}</p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">{t("legal.processors.category")}</th>
                  <th className="border border-border p-2 text-left">{t("legal.processors.company")}</th>
                  <th className="border border-border p-2 text-left">{t("legal.processors.region")}</th>
                  <th className="border border-border p-2 text-left">{t("legal.processors.legalBasis")}</th>
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
            {t("legal.processors.moreInfo")}{" "}
            <a href="/legal/cookies">Cookie Policy</a> / <a href="/legal/gdpr">GDPR Compliance</a>.
          </p>
          <p>
            <strong>Note:</strong> {t("legal.processors.openAiNote")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.automatedDecisions.title")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.automatedDecisions.p1")}</p>
          <p>{t("legal.automatedDecisions.p2")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.dataRetention.title")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <ul>
            <li>{t("legal.dataRetention.accountData")}</li>
            <li>{t("legal.dataRetention.chatHistory")}</li>
            <li>{t("legal.dataRetention.paymentData")}</li>
            <li>{t("legal.dataRetention.technicalLogs")}</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.yourRights.title")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.yourRights.intro")}</p>
          <ul>
            <li>{t("legal.yourRights.access")}</li>
            <li>{t("legal.yourRights.rectification")}</li>
            <li>{t("legal.yourRights.erasure")}</li>
            <li>{t("legal.yourRights.restriction")}</li>
            <li>{t("legal.yourRights.portability")}</li>
            <li>{t("legal.yourRights.object")}</li>
            <li>{t("legal.yourRights.withdraw")}</li>
          </ul>

          <h4>{t("legal.yourRights.howToTitle")}</h4>
          <ul>
            <li>{t("legal.yourRights.howToApp")}</li>
            <li>{t("legal.yourRights.howToEmail")}</li>
          </ul>

          <p>{t("legal.yourRights.responseTime")}</p>

          <h4>{t("legal.yourRights.complaintTitle")}</h4>
          <p>{t("legal.yourRights.complaintIntro")}</p>
          <ul>
            <li>Website: <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer">cpdp.bg</a></li>
            <li>Phone: +359 2 915 3518</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.children.title")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.children.p1")}</p>
          <p>{t("legal.children.p2")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.crisis.title")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.crisis.p1")}</p>
          <ul>
            <li><strong>{t("legal.crisis.emergency")}</strong></li>
            <li><strong>{t("legal.crisis.childLine")}</strong></li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.policyChanges.title")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.policyChanges.p1")}</p>
          <p>{t("legal.policyChanges.p2")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.contact.title")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.contact.p1")}</p>
          <p>{t("legal.contact.email")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
