"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CONSENT_CHANGE_EVENT,
  getAnalyticsConsent,
  setAnalyticsConsent,
} from "@/lib/analytics-consent";
import "./ConsentBanner.css";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => setVisible(getAnalyticsConsent() === null);
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);

  if (!visible) return null;

  function accept() {
    setAnalyticsConsent("granted");
    setVisible(false);
  }

  function reject() {
    setAnalyticsConsent("denied");
    setVisible(false);
  }

  return (
    <div
      className="consent-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Analytics preferences"
    >
      <div className="consent-banner__content">
        <p>
          This site uses privacy-friendly analytics to measure traffic and
          performance. You can opt out at any time on the{" "}
          <Link href="/privacy">Privacy Policy</Link> page.
        </p>
        <div className="consent-banner__actions">
          <button
            type="button"
            className="consent-banner__button consent-banner__button--secondary"
            onClick={reject}
          >
            Reject analytics
          </button>
          <button
            type="button"
            className="consent-banner__button consent-banner__button--primary"
            onClick={accept}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
