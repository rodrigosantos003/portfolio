"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_CHANGE_EVENT,
  getAnalyticsConsent,
  isAnalyticsAllowed,
  setAnalyticsConsent,
} from "@/lib/analytics-consent";

export default function ConsentToggle() {
  const [enabled, setEnabled] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(isAnalyticsAllowed(getAnalyticsConsent()));
    sync();
    setReady(true);
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    setAnalyticsConsent(next ? "granted" : "denied");
  }

  if (!ready) return null;

  return (
    <section className="consent-toggle" aria-labelledby="analytics-preferences">
      <h2 id="analytics-preferences">Analytics Preferences</h2>
      <p>
        Analytics and performance measurement are enabled by default. You can
        opt out below. Changes take effect immediately; reload the page if
        scripts were already loaded.
      </p>
      <label className="consent-toggle__label">
        <input
          type="checkbox"
          checked={enabled}
          onChange={toggle}
          className="consent-toggle__input"
        />
        <span>Allow analytics and performance measurement</span>
      </label>
    </section>
  );
}
