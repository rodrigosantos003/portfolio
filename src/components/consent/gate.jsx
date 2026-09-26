"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  CONSENT_CHANGE_EVENT,
  getAnalyticsConsent,
  isAnalyticsAllowed,
} from "@/lib/analytics-consent";

function shouldSendEvent() {
  return isAnalyticsAllowed(getAnalyticsConsent());
}

export default function AnalyticsGate() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    setConsent(getAnalyticsConsent());

    const sync = () => setConsent(getAnalyticsConsent());
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);

  if (!isAnalyticsAllowed(consent)) return null;

  return (
    <>
      <Analytics
        beforeSend={(event) => (shouldSendEvent() ? event : null)}
      />
      <SpeedInsights
        beforeSend={(data) => (shouldSendEvent() ? data : null)}
      />
    </>
  );
}
