import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useTranslation } from "react-i18next";

export function CookiesPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cookie Policy</h1>
        <p className="text-muted-foreground">Last updated: 14 March 2026</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. What Are Cookies</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            Cookies are small text files stored on your device when you visit a website. They allow the website to recognise your device and remember information about your visit, such as your preferences or login status.
          </p>
          <p>
            This Cookie Policy is issued in accordance with the Bulgarian Electronic Communications Act (ЗЗЕС) and the EU ePrivacy Directive (2002/58/EC).
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Categories of Cookies</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <h4>Strictly Necessary Cookies</h4>
          <p>
            These cookies are essential for the website to function. They enable core functionality such as authentication and security. These cookies do not require your consent under the ePrivacy Directive.
          </p>

          <h4>Functional Cookies</h4>
          <p>
            These cookies remember your preferences (such as language and theme) to provide a personalised experience. These cookies require your consent.
          </p>

          <h4>Security Cookies</h4>
          <p>
            These cookies protect the service from automated abuse and fraud. They are considered strictly necessary and do not require separate consent.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Cookies We Use</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Cookie Name</th>
                  <th className="border border-border p-2 text-left">Provider</th>
                  <th className="border border-border p-2 text-left">Purpose</th>
                  <th className="border border-border p-2 text-left">Duration</th>
                  <th className="border border-border p-2 text-left">Category</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2 font-mono text-sm">sb-[ref]-auth-token</td>
                  <td className="border border-border p-2">Supabase</td>
                  <td className="border border-border p-2">Authentication session</td>
                  <td className="border border-border p-2">Session</td>
                  <td className="border border-border p-2">Strictly necessary</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono text-sm">sb-[ref]-auth-token-code-verifier</td>
                  <td className="border border-border p-2">Supabase</td>
                  <td className="border border-border p-2">OAuth PKCE flow verification</td>
                  <td className="border border-border p-2">Session</td>
                  <td className="border border-border p-2">Strictly necessary</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono text-sm">stripe.mid</td>
                  <td className="border border-border p-2">Stripe</td>
                  <td className="border border-border p-2">Fraud prevention</td>
                  <td className="border border-border p-2">1 year</td>
                  <td className="border border-border p-2">Strictly necessary</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono text-sm">stripe.sid</td>
                  <td className="border border-border p-2">Stripe</td>
                  <td className="border border-border p-2">Payment session</td>
                  <td className="border border-border p-2">Session</td>
                  <td className="border border-border p-2">Strictly necessary</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono text-sm">_grecaptcha</td>
                  <td className="border border-border p-2">Google</td>
                  <td className="border border-border p-2">reCAPTCHA v3 bot detection</td>
                  <td className="border border-border p-2">6 months</td>
                  <td className="border border-border p-2">Security</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono text-sm">cookie_consent</td>
                  <td className="border border-border p-2">Eterapp</td>
                  <td className="border border-border p-2">Stores user cookie preference</td>
                  <td className="border border-border p-2">1 year</td>
                  <td className="border border-border p-2">Strictly necessary</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono text-sm">i18n_lang</td>
                  <td className="border border-border p-2">Eterapp</td>
                  <td className="border border-border p-2">Language preference</td>
                  <td className="border border-border p-2">1 year</td>
                  <td className="border border-border p-2">Functional</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono text-sm">theme</td>
                  <td className="border border-border p-2">Eterapp</td>
                  <td className="border border-border p-2">Theme preference (light/dark)</td>
                  <td className="border border-border p-2">1 year</td>
                  <td className="border border-border p-2">Functional</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Third-Party Cookie Policies</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>The following third-party services may set cookies on your device:</p>
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
          <CardTitle>5. Managing Cookies</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            You can control and manage cookies through your browser settings. Most browsers allow you to:
          </p>
          <ul>
            <li>View what cookies are stored and delete them individually</li>
            <li>Block third-party cookies</li>
            <li>Block cookies from specific sites</li>
            <li>Block all cookies</li>
            <li>Delete all cookies when you close the browser</li>
          </ul>
          <p>
            Please note that blocking strictly necessary cookies may prevent Eterapp from functioning correctly.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Changes to This Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated date.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Contact</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            If you have any questions about this Cookie Policy, please contact us at privacy@eterapp.io
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
