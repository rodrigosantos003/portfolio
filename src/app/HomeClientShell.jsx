"use client";

import { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";
import PrivacyPolicy from "@/components/PrivacyPolicy/PrivacyPolicy";
import { initGA, logPageView } from "@/app/google-analytics";
import Link from "next/link";

export default function HomeClientShell() {
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

  useEffect(() => {
    initGA();
    logPageView();

    return () => {
      window.removeEventListener("scroll", logPageView);
    };
  }, []);

  return (
    <>
      <CookieConsent
        style={{
          backgroundColor: "rgba(11, 15, 26, 0.85)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(148, 163, 184, 0.12)",
          padding: "16px 24px",
          fontSize: "0.9rem",
        }}
        buttonStyle={{
          background: "linear-gradient(135deg, #38bdf8, #818cf8)",
          color: "#0b0f1a",
          borderRadius: "8px",
          padding: "10px 24px",
          fontWeight: "600",
          fontSize: "0.85rem",
          border: "none",
        }}
        declineButtonStyle={{
          background: "transparent",
          border: "1px solid rgba(148, 163, 184, 0.3)",
          color: "#cbd5e1",
          borderRadius: "8px",
          padding: "10px 24px",
          fontSize: "0.85rem",
        }}
      >
        This website uses cookies. By browsing the site you consent to its use.
        <Link
          href="#"
          onClick={() => setPrivacyPolicy(true)}
          style={{
            color: "#38bdf8",
            float: "right",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            marginLeft: "12px",
          }}
        >
          Privacy Policy
        </Link>
      </CookieConsent>

      {privacyPolicy && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            overflowY: "auto",
            background: "#0b0f1a",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Privacy Policy"
        >
          <button
            onClick={() => setPrivacyPolicy(false)}
            style={{
              position: "sticky",
              top: "1rem",
              display: "block",
              margin: "1rem 1.5rem",
              background: "transparent",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              color: "#cbd5e1",
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            ← Back to Site
          </button>
          <PrivacyPolicy />
        </div>
      )}
    </>
  );
}
