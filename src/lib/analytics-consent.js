export const CONSENT_KEY = "analytics-consent";
export const CONSENT_CHANGE_EVENT = "analytics-consent-change";

/** @returns {"granted" | "denied" | null} */
export function getAnalyticsConsent() {
  if (typeof window === "undefined") return null;

  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "granted" || value === "denied") return value;
  return null;
}

/** @param {"granted" | "denied"} value */
export function setAnalyticsConsent(value) {
  localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function isAnalyticsAllowed(consent) {
  return consent !== "denied";
}
