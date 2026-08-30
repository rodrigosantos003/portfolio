import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  return (
    <footer id="SiteFooter">
      <p>&copy; {new Date().getFullYear()} Rodrigo Santos</p>
      <Link href="/privacy">Privacy Policy</Link>
    </footer>
  );
}
