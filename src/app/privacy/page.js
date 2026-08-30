import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import PrivacyPolicy from "@/components/PrivacyPolicy/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy | Rodrigo Santos",
  description:
    "Privacy Policy for rodrigo-santos.pt — how personal data is processed when you visit this portfolio website.",
  openGraph: {
    title: "Privacy Policy | Rodrigo Santos",
    description:
      "Privacy Policy for rodrigo-santos.pt — how personal data is processed when you visit this portfolio website.",
    url: "https://rodrigo-santos.pt/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Link href="/" className="privacy-back">
        ← Back to Site
      </Link>
      <PrivacyPolicy />
      <Footer />
    </>
  );
}
