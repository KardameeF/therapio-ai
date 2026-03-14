import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useTranslation } from "react-i18next";

export function TermsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("legal.terms.pageTitle")}</h1>
        <p className="text-muted-foreground">{t("legal.lastUpdated")}: {t("legal.lastUpdatedDate")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.terms.acceptanceTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.terms.acceptanceP1")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.terms.descriptionTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.terms.descriptionP1")}</p>
          <p><strong>{t("legal.terms.descriptionP2")}</strong></p>
          <p>{t("legal.terms.descriptionP3")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.terms.minAgeTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.terms.minAgeP1")}</p>
          <p>{t("legal.terms.minAgeP2")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.terms.userRespTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <ul>
            <li>{t("legal.terms.userResp1")}</li>
            <li>{t("legal.terms.userResp2")}</li>
            <li>{t("legal.terms.userResp3")}</li>
            <li>{t("legal.terms.userResp4")}</li>
            <li>{t("legal.terms.userResp5")}</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.terms.subscriptionTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.terms.subscriptionP1")}</p>
          <p>{t("legal.terms.subscriptionStripe")}</p>
          <p>{t("legal.terms.subscriptionCancel")}</p>
          <p>{t("legal.terms.subscriptionRefund")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.terms.disclaimerTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p><strong>{t("legal.terms.disclaimerP1")}</strong></p>
          <p><strong>{t("legal.terms.disclaimerCrisis")}</strong></p>
          <ul>
            <li><strong>{t("legal.terms.disclaimerEmergency")}</strong></li>
            <li><strong>{t("legal.terms.disclaimerChildLine")}</strong></li>
          </ul>
          <p>{t("legal.terms.disclaimerP2")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.terms.privacyTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            {t("legal.terms.privacyP1")}{" "}
            <a href="/legal/privacy">{t("legal.pageTitle")}</a> | <a href="/legal/gdpr">{t("legal.gdpr.pageTitle")}</a>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.terms.ipTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.terms.ipP1")}</p>
          <p>{t("legal.terms.ipP2")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.terms.liabilityTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.terms.liabilityP1")}</p>
          <p>{t("legal.terms.liabilityP2")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.terms.governingTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.terms.governingP1")}</p>
          <p>{t("legal.terms.governingP2")}</p>
          <p>
            {t("legal.terms.governingODR")}{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.terms.changesTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.terms.changesP1")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legal.terms.contactTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>{t("legal.terms.contactP1")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
