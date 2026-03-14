import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useTranslation } from "react-i18next";

export function GDPRPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("legal.gdpr.pageTitle")}</h1>
        <p className="text-muted-foreground">{t("legal.lastUpdated")}: {t("legal.lastUpdatedDate")}</p>
      </div>

      <Card>
        <CardContent className="prose dark:prose-invert pt-6">
          <p>
            {t("legal.gdpr.intro")}{" "}
            <a href="/legal/privacy">{t("legal.pageTitle")}</a>.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.gdpr.rightsTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.gdpr.rightsIntro")}</p>

          <h4>{t("legal.gdpr.accessTitle")}</h4>
          <p>{t("legal.gdpr.accessDesc")}</p>

          <h4>{t("legal.gdpr.rectificationTitle")}</h4>
          <p>{t("legal.gdpr.rectificationDesc")}</p>

          <h4>{t("legal.gdpr.erasureTitle")}</h4>
          <p>{t("legal.gdpr.erasureDesc")}</p>

          <h4>{t("legal.gdpr.restrictionTitle")}</h4>
          <p>{t("legal.gdpr.restrictionDesc")}</p>

          <h4>{t("legal.gdpr.portabilityTitle")}</h4>
          <p>{t("legal.gdpr.portabilityDesc")}</p>

          <h4>{t("legal.gdpr.objectTitle")}</h4>
          <p>{t("legal.gdpr.objectDesc")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.gdpr.lawfulBasisTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.gdpr.lawfulBasisIntro")}</p>
          <ul>
            <li><strong>{t("legal.gdpr.lawfulContract")}</strong></li>
            <li><strong>{t("legal.gdpr.lawfulConsent")}</strong></li>
            <li><strong>{t("legal.gdpr.lawfulLegitimate")}</strong></li>
            <li><strong>{t("legal.gdpr.lawfulObligation")}</strong></li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.gdpr.specialDataTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.gdpr.specialDataP1")}</p>
          <p>{t("legal.gdpr.specialDataIntro")}</p>
          <ul>
            <li>{t("legal.gdpr.specialDataLegalBasis")}</li>
            <li>{t("legal.gdpr.specialDataEncryption")}</li>
            <li>{t("legal.gdpr.specialDataAccess")}</li>
            <li>{t("legal.gdpr.specialDataSharing")}</li>
            <li>{t("legal.gdpr.specialDataTraining")}</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.gdpr.dpoTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.gdpr.dpoP1")}</p>
          <p>{t("legal.gdpr.dpoP2")} <strong>dpo@eterapp.io</strong></p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.gdpr.breachTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.gdpr.breachP1")}</p>
          <p>{t("legal.gdpr.breachP2")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.gdpr.transfersTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <h4>{t("legal.gdpr.transfersEEA")}</h4>
          <ul>
            <li><strong>Netlify Inc.</strong> — Rotterdam, EU</li>
            <li><strong>Supabase Inc.</strong> — Stockholm, EU</li>
          </ul>

          <h4>{t("legal.gdpr.transfersOutside")}</h4>
          <ul>
            <li><strong>OpenAI Inc.</strong> (USA)</li>
            <li><strong>Stripe Inc.</strong> (USA)</li>
            <li><strong>Google LLC</strong> (USA)</li>
            <li><strong>Resend Inc.</strong> (USA)</li>
            <li><strong>Cloudflare Inc.</strong> (USA)</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.gdpr.supervisoryTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.gdpr.supervisoryIntro")}</p>
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
          <CardTitle>{t("legal.gdpr.exerciseTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.gdpr.exerciseIntro")}</p>
          <p>
            Email: <a href="mailto:privacy@eterapp.io">privacy@eterapp.io</a><br />
            {t("legal.gdpr.exerciseSubject")}<br />
            {t("legal.gdpr.exerciseNote")}
          </p>
          <p>{t("legal.gdpr.exerciseResponse")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
