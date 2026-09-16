import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import OversightCase from "./components/OversightCase";
import WorkIndex from "./components/WorkIndex";
import Life from "./components/Life";
import About from "./components/About";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <OversightCase />
        <WorkIndex />
        <Life />
        <About />
        <Contact />
      </main>
    </>
  );
}
