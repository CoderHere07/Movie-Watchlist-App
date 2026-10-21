import { useEffect, useRef } from "react";

const LINES = 12;

export default function ThreadsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let t = 0;
    let raf;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.3;
      ctx.shadowColor = "#ff1f8e";
      ctx.shadowBlur = 6;

      for (let i = 0; i < LINES; i++) {
        const p = i / (LINES - 1);
        ctx.beginPath();

        for (let x = 0; x <= w + 8; x += 8) {
          const y =
            h * (0.1 + 0.8 * p) +
            Math.sin(x * 0.004 + t * 0.7 + i * 0.55) * 70 +
            Math.sin(x * 0.011 - t * 0.5 + i) * 26;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // har thread ki opacity halki si pulse karti hai
        const alpha = 0.18 + 0.28 * (0.5 + 0.5 * Math.sin(t * 0.8 + i));
        ctx.strokeStyle = `rgba(255, 31, 142, ${alpha})`;
        ctx.stroke();
      }

      if (!reduceMotion) {
        t += 0.012;
        raf = requestAnimationFrame(draw);
      }
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="threads-bg" aria-hidden="true" />;
}