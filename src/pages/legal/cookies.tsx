import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useTranslation } from "react-i18next";

export function CookiesPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cookie Policy</h1>
        <p className="text-muted-foreground">How we use cookies and similar technologies</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What Are Cookies?</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Types of Cookies We Use</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <h4>Essential Cookies</h4>
          <p>
            These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
          </p>
          
          <h4>Functional Cookies</h4>
          <p>
            These cookies enable the website to provide enhanced functionality and personalization, such as remembering your language preference or theme setting.
          </p>
          
          <h4>Analytics Cookies</h4>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
          </p>
          
          <h4>Marketing Cookies</h4>
          <p>
            These cookies are used to track visitors across websites to display relevant and engaging advertisements.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cookies We Use</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Cookie Name</th>
                  <th className="border border-border p-2 text-left">Purpose</th>
                  <th className="border border-border p-2 text-left">Duration</th>
                  <th className="border border-border p-2 text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2 font-mono">session_id</td>
                  <td className="border border-border p-2">Maintain user session</td>
                  <td className="border border-border p-2">Session</td>
                  <td className="border border-border p-2">Essential</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono">theme</td>
                  <td className="border border-border p-2">Remember theme preference</td>
                  <td className="border border-border p-2">1 year</td>
                  <td className="border border-border p-2">Functional</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono">language</td>
                  <td className="border border-border p-2">Remember language preference</td>
                  <td className="border border-border p-2">1 year</td>
                  <td className="border border-border p-2">Functional</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono">_ga</td>
                  <td className="border border-border p-2">Google Analytics</td>
                  <td className="border border-border p-2">2 years</td>
                  <td className="border border-border p-2">Analytics</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Managing Cookies</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            You can control and manage cookies in several ways:
          </p>
          <h4>Browser Settings</h4>
          <p>
            Most browsers allow you to refuse cookies or delete them. You can usually find these settings in the "Privacy" or "Security" section of your browser's settings.
          </p>
          
          <h4>Cookie Consent</h4>
          <p>
            When you first visit our website, you'll see a cookie consent banner. You can choose which types of cookies to accept.
          </p>
          
          <h4>Opt-Out Links</h4>
          <ul>
            <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
            <li><a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance Opt-out</a></li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Third-Party Cookies</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            Some cookies on our website are set by third-party services:
          </p>
          <ul>
            <li><strong>Google Analytics:</strong> To analyze website traffic and usage</li>
            <li><strong>Stripe:</strong> To process payments securely</li>
            <li><strong>Supabase:</strong> To provide authentication and database services</li>
            <li><strong>Sentry:</strong> To monitor application errors and performance</li>
          </ul>
          <p>
            These third parties have their own privacy policies and cookie policies.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Updates to This Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
          <p>
            If you have any questions about this Cookie Policy, please contact us at privacy@eterapp.io
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
