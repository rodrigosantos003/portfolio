import Link from "next/link";
import ConsentToggle from "@/components/Consent/ConsentToggle";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <main id="PrivacyPolicy">
      <h1>Privacy Policy</h1>

      <p className="privacy-effective-date">Last updated: August 2026</p>

      <p>
        This Privacy Policy explains how Rodrigo Santos (&quot;I,&quot;
        &quot;me,&quot; or &quot;my&quot;) processes personal data when you
        visit my portfolio website at{" "}
        <Link href="https://rodrigo-santos.pt">rodrigo-santos.pt</Link>{" "}
        (&quot;the Website&quot;).
      </p>

      <h2>Data Controller</h2>

      <p>
        The data controller responsible for your personal data is Rodrigo
        Santos. You can contact me at{" "}
        <Link href="mailto:rodrigo.s.santos003@gmail.com">
          rodrigo.s.santos003@gmail.com
        </Link>
        .
      </p>

      <h2>What Data I Collect</h2>

      <p>
        The Website is a static portfolio. I do not operate contact forms,
        newsletters, accounts, or advertising on the Website itself. When you
        visit, the following data may be processed:
      </p>

      <ul>
        <li>
          <strong>Hosting and server logs:</strong> When you request a page, my
          hosting provider (Vercel Inc.) processes technical data needed to
          deliver the Website, such as your IP address, browser type
          (User-Agent), requested URL, referrer, and timestamps. This data is
          generated automatically when you use the internet.
        </li>
        <li>
          <strong>Vercel Web Analytics:</strong> I use Vercel Web Analytics to
          understand traffic in aggregate. It does not use cookies. It may
          record page views, the page URL, referrer, approximate location
          (country/region/city), browser, operating system, and device type.
          Vercel identifies visitors using a short-lived hash derived from the
          incoming request; that identifier is discarded after 24 hours.
        </li>
        <li>
          <strong>Vercel Speed Insights:</strong> I use Vercel Speed Insights to
          measure website performance. It does not use cookies and may record
          route, URL, country, browser, device type, operating system, network
          speed, and Core Web Vitals metrics (such as page load timing).
        </li>
        <li>
          <strong>Contact outside the Website:</strong> If you email me or
          contact me through LinkedIn or GitHub using the links on the Website,
          any personal data you choose to send (such as your name and email
          address) is processed in that separate channel, not through a form on
          this site.
        </li>
      </ul>

      <h2>How I Use Your Data</h2>

      <ul>
        <li>To host the Website and deliver pages to your browser.</li>
        <li>
          To understand how the Website is used and to improve its content and
          performance.
        </li>
        <li>
          To respond to messages you send me voluntarily by email or through
          third-party platforms.
        </li>
      </ul>

      <h2>Legal Basis (GDPR)</h2>

      <p>
        I process personal data on the following bases under Article 6 of the
        GDPR:
      </p>

      <ul>
        <li>
          <strong>Legitimate interests (Art. 6(1)(f)):</strong> Hosting the
          Website, maintaining security, measuring audience in a
          privacy-friendly way, and improving performance. I have assessed that
          these interests do not override your rights, given the limited nature
          of the data and the absence of advertising or profiling.
        </li>
        <li>
          <strong>
            Consent or pre-contractual steps (Art. 6(1)(a) or (b)):
          </strong>{" "}
          If you contact me directly, I process the information you provide to
          respond to your inquiry.
        </li>
      </ul>

      <h2>Cookies and Similar Technologies</h2>

      <p>
        The Website does not set analytics or marketing cookies. Vercel Web
        Analytics and Speed Insights operate without cookies. If you choose to
        opt out of analytics, your preference is stored in your browser&apos;s
        local storage under the key <code>analytics-consent</code> so the
        Website can remember your choice on future visits.
      </p>

      <ConsentToggle />

      <p>
        Your browser may still store strictly necessary technical data for
        normal operation, which you can manage in your browser settings.
      </p>

      <h2>Recipients and Processors</h2>

      <p>
        I use Vercel Inc. to host the Website and to provide Web Analytics and
        Speed Insights. Vercel processes data on my behalf as a service
        provider. Vercel&apos;s privacy information is available in the{" "}
        <Link href="https://vercel.com/legal/privacy-policy">
          Vercel Privacy Policy
        </Link>{" "}
        and their product-specific documentation for{" "}
        <Link href="https://vercel.com/docs/analytics/privacy-policy">
          Web Analytics
        </Link>{" "}
        and{" "}
        <Link href="https://vercel.com/docs/speed-insights/privacy-policy">
          Speed Insights
        </Link>
        .
      </p>

      <p>
        I do not sell your personal data. I do not share it with third parties
        for their own marketing purposes.
      </p>

      <h2>International Transfers</h2>

      <p>
        Vercel Inc. is based in the United States. Where personal data is
        transferred outside the European Economic Area or the United Kingdom,
        appropriate safeguards apply, such as Standard Contractual Clauses and,
        where applicable, participation in the EU-U.S. Data Privacy Framework.
      </p>

      <h2>Data Retention</h2>

      <ul>
        <li>
          <strong>Hosting logs:</strong> Retained by Vercel according to their
          platform configuration and documentation.
        </li>
        <li>
          <strong>Analytics and Speed Insights:</strong> Visitor session
          identifiers used by Vercel Web Analytics are discarded after 24 hours.
          Aggregated metrics are retained to provide historical statistics.
        </li>
        <li>
          <strong>Email and direct messages:</strong> Retained only as long as
          needed to respond to your inquiry and for any reasonable follow-up,
          unless a longer retention period is required by law.
        </li>
      </ul>

      <h2>Your Rights</h2>

      <p>
        If you are in the European Economic Area or the United Kingdom, you have
        the right to:
      </p>

      <ul>
        <li>Access the personal data I hold about you.</li>
        <li>Request correction of inaccurate data.</li>
        <li>Request erasure in certain circumstances.</li>
        <li>Request restriction of processing in certain circumstances.</li>
        <li>
          Object to processing based on legitimate interests, including
          analytics and performance measurement. You can opt out using the
          control above or by emailing me.
        </li>
        <li>Request data portability where applicable.</li>
        <li>
          Withdraw consent at any time, where processing is based on consent,
          without affecting the lawfulness of processing before withdrawal.
        </li>
      </ul>

      <p>
        To exercise these rights, email{" "}
        <Link href="mailto:rodrigo.s.santos003@gmail.com">
          rodrigo.s.santos003@gmail.com
        </Link>
        . I may need to verify your identity before responding.
      </p>

      <h2>Right to Complain</h2>

      <p>
        You have the right to lodge a complaint with a supervisory authority. In
        Portugal, the competent authority is the Comissão Nacional de Proteção
        de Dados (CNPD): <Link href="https://www.cnpd.pt">www.cnpd.pt</Link>.
      </p>

      <h2>Data Security</h2>

      <p>
        I take reasonable measures to protect personal data, including using
        reputable hosting infrastructure and keeping the Website software up to
        date. No method of transmission over the internet is completely secure.
      </p>

      <h2>Changes to This Policy</h2>

      <p>
        I may update this Privacy Policy from time to time. The &quot;Last
        updated&quot; date at the top of this page will reflect the latest
        version. Material changes will be published on this page.
      </p>

      <h2>Contact</h2>

      <p>
        Questions about this Privacy Policy or your personal data can be sent to{" "}
        <Link href="mailto:rodrigo.s.santos003@gmail.com">
          rodrigo.s.santos003@gmail.com
        </Link>
        .
      </p>
    </main>
  );
}
