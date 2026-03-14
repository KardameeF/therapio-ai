import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useTranslation } from "react-i18next";

export function CookiesPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("legal.cookies.pageTitle")}</h1>
        <p className="text-muted-foreground">{t("legal.lastUpdated")}: {t("legal.lastUpdatedDate")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.cookies.whatTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.cookies.whatP1")}</p>
          <p>{t("legal.cookies.whatP2")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.cookies.categoriesTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <h4>{t("legal.cookies.strictlyTitle")}</h4>
          <p>{t("legal.cookies.strictlyDesc")}</p>

          <h4>{t("legal.cookies.functionalTitle")}</h4>
          <p>{t("legal.cookies.functionalDesc")}</p>

          <h4>{t("legal.cookies.securityTitle")}</h4>
          <p>{t("legal.cookies.securityDesc")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.cookies.tableTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">{t("legal.cookies.colName")}</th>
                  <th className="border border-border p-2 text-left">{t("legal.cookies.colProvider")}</th>
                  <th className="border border-border p-2 text-left">{t("legal.cookies.colPurpose")}</th>
                  <th className="border border-border p-2 text-left">{t("legal.cookies.colDuration")}</th>
                  <th className="border border-border p-2 text-left">{t("legal.cookies.colCategory")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2 font-mono text-sm">sb-[ref]-auth-token</td>
                  <td className="border border-border p-2">Supabase</td>
                  <td className="border border-border p-2">{t("legal.cookies.table.purposeAuthSession")}</td>
                  <td className="border border-border p-2">{t("legal.cookies.table.durationSession")}</td>
                  <td className="border border-border p-2">{t("legal.cookies.strictlyTitle")}</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono text-sm">sb-[ref]-auth-token-code-verifier</td>
                  <td className="border border-border p-2">Supabase</td>
                  <td className="border border-border p-2">{t("legal.cookies.table.purposeOAuthPKCE")}</td>
                  <td className="border border-border p-2">{t("legal.cookies.table.durationSession")}</td>
                  <td className="border border-border p-2">{t("legal.cookies.strictlyTitle")}</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono text-sm">stripe.mid</td>
                  <td className="border border-border p-2">Stripe</td>
                  <td className="border border-border p-2">{t("legal.cookies.table.purposeFraudPrevention")}</td>
                  <td className="border border-border p-2">{t("legal.cookies.table.durationYear")}</td>
                  <td className="border border-border p-2">{t("legal.cookies.strictlyTitle")}</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono text-sm">stripe.sid</td>
                  <td className="border border-border p-2">Stripe</td>
                  <td className="border border-border p-2">{t("legal.cookies.table.purposePaymentSession")}</td>
                  <td className="border border-border p-2">{t("legal.cookies.table.durationSession")}</td>
                  <td className="border border-border p-2">{t("legal.cookies.strictlyTitle")}</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono text-sm">_grecaptcha</td>
                  <td className="border border-border p-2">Google</td>
                  <td className="border border-border p-2">{t("legal.cookies.table.purposeBotDetection")}</td>
                  <td className="border border-border p-2">{t("legal.cookies.table.duration6Months")}</td>
                  <td className="border border-border p-2">{t("legal.cookies.securityTitle")}</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono text-sm">cookie_consent</td>
                  <td className="border border-border p-2">Eterapp</td>
                  <td className="border border-border p-2">{t("legal.cookies.table.purposeCookieConsent")}</td>
                  <td className="border border-border p-2">{t("legal.cookies.table.durationYear")}</td>
                  <td className="border border-border p-2">{t("legal.cookies.strictlyTitle")}</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono text-sm">i18n_lang</td>
                  <td className="border border-border p-2">Eterapp</td>
                  <td className="border border-border p-2">{t("legal.cookies.table.purposeLanguage")}</td>
                  <td className="border border-border p-2">{t("legal.cookies.table.durationYear")}</td>
                  <td className="border border-border p-2">{t("legal.cookies.functionalTitle")}</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono text-sm">theme</td>
                  <td className="border border-border p-2">Eterapp</td>
                  <td className="border border-border p-2">{t("legal.cookies.table.purposeTheme")}</td>
                  <td className="border border-border p-2">{t("legal.cookies.table.durationYear")}</td>
                  <td className="border border-border p-2">{t("legal.cookies.functionalTitle")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.cookies.thirdPartyTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.cookies.thirdPartyIntro")}</p>
          <ul>
            <li>
              <strong>Supabase</strong> —{" "}
              <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">supabase.com/privacy</a>
            </li>
            <li>
              <strong>Stripe</strong> —{" "}
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">stripe.com/privacy</a>
            </li>
            <li>
              <strong>Google</strong> —{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.cookies.managingTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.cookies.managingIntro")}</p>
          <ul>
            <li><strong>{t("legal.cookies.chromeInstr")}</strong></li>
            <li><strong>{t("legal.cookies.firefoxInstr")}</strong></li>
            <li><strong>{t("legal.cookies.safariInstr")}</strong></li>
            <li><strong>{t("legal.cookies.edgeInstr")}</strong></li>
          </ul>
          <p>{t("legal.cookies.managingNote")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.cookies.changesTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.cookies.changesP1")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.cookies.contactTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.cookies.contactP1")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
