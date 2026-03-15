import NavBar from '@/components/Navbar/Navbar'
import About from '@/sections/About/About'
import Contact from '@/sections/Contact/Contact'
import Experience from '@/sections/Experience/Experience'
import Projects from '@/sections/Projects/Projects'
import HomeClientShell from '@/app/HomeClientShell'

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
      <HomeClientShell />
    </>
  )
}