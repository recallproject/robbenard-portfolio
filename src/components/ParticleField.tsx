import { useEffect, useRef } from "react";
import { useCoarsePointer, usePrefersReducedMotion } from "../hooks/useMedia";

type Point = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  accent: boolean;
};

type Props = {
  target?: { x: number; y: number };
};

export default function ParticleField({ target }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const coarse = useCoarsePointer();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const parent = canvas.parentElement ?? canvas;
    const pointer = { x: 0.68, y: 0.42, active: false };
    let raf = 0;
    let running = true;
    const dprCap = coarse ? 1 : 1.5;

    const count = coarse ? 26 : reduced ? 36 : 70;
    const points: Point[] = Array.from({ length: count }, (_, i) => {
      const ox = 0.12 + Math.random() * 0.76;
      const oy = 0.1 + Math.random() * 0.78;
      return {
        x: ox,
        y: oy,
        ox,
        oy,
        vx: (Math.random() - 0.5) * 0.00025,
        vy: (Math.random() - 0.5) * 0.00025,
        accent: i % 9 === 0,
      };
    });

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      const dpr = Math.min(dprCap, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      if (coarse || reduced) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
      pointer.active = true;
    };

    const onLeave = () => {
      pointer.active = false;
    };

    const draw = () => {
      if (!running) return;
      const { width, height } = parent.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const aimX = pointer.active ? pointer.x : (target?.x ?? 0.68);
      const aimY = pointer.active ? pointer.y : (target?.y ?? 0.42);
      const pull = pointer.active && !reduced ? 0.045 : 0;

      for (const p of points) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          const dx = p.ox - p.x;
          const dy = p.oy - p.y;
          p.vx += dx * 0.002;
          p.vy += dy * 0.002;
          p.vx *= 0.96;
          p.vy *= 0.96;
          if (pull) {
            const px = aimX - p.x;
            const py = aimY - p.y;
            const dist = Math.hypot(px, py) + 0.0001;
            if (dist < 0.28) {
              p.vx += (px / dist) * pull * (0.28 - dist);
              p.vy += (py / dist) * pull * (0.28 - dist);
            }
          }
        }
        p.x = Math.min(0.98, Math.max(0.02, p.x));
        p.y = Math.min(0.98, Math.max(0.02, p.y));
      }

      const linkDist = coarse ? 0.11 : 0.13;
      ctx.lineWidth = 1;

      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.34;
            ctx.strokeStyle = `rgba(16,18,15,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x * width, a.y * height);
            ctx.lineTo(b.x * width, b.y * height);
            ctx.stroke();
          }
        }

        if (pointer.active && !reduced) {
          const d = Math.hypot(a.x - aimX, a.y - aimY);
          if (d < 0.22) {
            ctx.strokeStyle = `rgba(255,78,39,${(1 - d / 0.22) * 0.45})`;
            ctx.beginPath();
            ctx.moveTo(a.x * width, a.y * height);
            ctx.lineTo(aimX * width, aimY * height);
            ctx.stroke();
          }
        }
      }

      for (const p of points) {
        ctx.fillStyle = p.accent ? "#d9ff57" : "rgba(16,18,15,0.7)";
        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, p.accent ? 2.6 : 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      if (pointer.active && !reduced) {
        ctx.strokeStyle = "rgba(255,78,39,0.55)";
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.arc(aimX * width, aimY * height, 10, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduced) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    window.addEventListener("pointermove", onMove, { passive: true });
    parent.addEventListener("pointerleave", onLeave);
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [coarse, reduced, target?.x, target?.y]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  );
}
