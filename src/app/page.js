import NavBar from "@/components/navbar/index";
import About from "./about/page";
import Contact from "./contact/page";
import Experience from "./experience/page";
import Projects from "./projects/page";
import Footer from "@/components/footer/index";

export default function Home() {
  return (
    <>
      <main>
        <NavBar />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
