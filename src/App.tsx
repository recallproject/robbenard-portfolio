import { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./lib/motion";
import { useCoarsePointer, usePrefersReducedMotion } from "./hooks/useMedia";
import Nav from "./components/Nav";
import Hook from "./components/Hook";
import Thesis from "./components/Thesis";
import Bedside from "./components/Bedside";
import Build from "./components/Build";
import Oversight from "./components/Oversight";
import Experiments from "./components/Experiments";
import Life from "./components/Life";

export default function App() {
  const reduced = usePrefersReducedMotion();
  const coarse = useCoarsePointer();
  const [active, setActive] = useState("hook");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced || coarse) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, [reduced, coarse]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reel]"));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target instanceof HTMLElement ? visible.target.dataset.reel : undefined;
        if (id) setActive(id);
      },
      { threshold: [0.2, 0.45] }
    );
    nodes.forEach((n) => io.observe(n));
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <a className="skip" href="#oversight">
        Skip to Oversight
      </a>
      <Nav active={active} progress={progress} />
      <main>
        <Hook />
        <Thesis />
        <Bedside />
        <Build />
        <Oversight />
        <Experiments />
        <Life />
      </main>
    </>
  );
}
