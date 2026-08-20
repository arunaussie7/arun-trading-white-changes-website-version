import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';

type Variant = 'hero' | 'subtle' | 'dense';

/**
 * Doomsday command-atmosphere — no grid.
 * Constellation nodes, electric violet flares, market waveforms.
 * Inspired by cinematic war-room tech — no Marvel assets.
 */
export function LabBackground({
  variant = 'subtle',
  className = '',
}: {
  variant?: Variant;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const count = variant === 'dense' ? 58 : variant === 'hero' ? 48 : 22;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let time = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Dot = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      a: number;
      isNode?: boolean;
      violet?: boolean;
    };

    type Candle = {
      o: number;
      h: number;
      l: number;
      c: number;
    };

    let dots: Dot[] = [];
    let candles: Candle[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      w = parent?.clientWidth || window.innerWidth;
      h = parent?.clientHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.4,
        a: Math.random() * 0.32 + 0.08,
        isNode: i % 7 === 0,
        violet: i % 11 === 0,
      }));

      // Seeded-looking walk so candles feel like a real chart, not random noise
      candles = [];
      let price = 0.52;
      const n = Math.max(28, Math.floor(w / 22));
      for (let i = 0; i < n; i++) {
        const drift = Math.sin(i * 0.18) * 0.012 + (Math.random() - 0.48) * 0.035;
        const open = price;
        const close = Math.min(0.92, Math.max(0.12, open + drift));
        const high = Math.max(open, close) + Math.random() * 0.03;
        const low = Math.min(open, close) - Math.random() * 0.03;
        candles.push({ o: open, h: Math.min(0.96, high), l: Math.max(0.06, low), c: close });
        price = close;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.008;

      // Soft candlestick tape — hero only, kept faint so copy stays readable
      if (variant === 'hero' && candles.length) {
        const chartTop = h * 0.22;
        const chartH = h * 0.58;
        const chartW = w * 0.72;
        const gap = 3;
        const slot = chartW / candles.length;
        const bodyW = Math.max(3, Math.min(8, slot - gap));
        const drift = Math.sin(time * 0.35) * 5;

        candles.forEach((c, i) => {
          const t = i / (candles.length - 1);
          const x = i * slot + slot / 2;
          const yO = chartTop + (1 - c.o) * chartH + drift;
          const yC = chartTop + (1 - c.c) * chartH + drift;
          const yH = chartTop + (1 - c.h) * chartH + drift;
          const yL = chartTop + (1 - c.l) * chartH + drift;
          const bull = c.c >= c.o;
          const fade = Math.sin(t * Math.PI) * (1 - t * 0.55);
          const alpha = (isLight ? 0.32 : 0.2) * fade;
          if (alpha < 0.03) return;
          const color = bull
            ? `rgba(18, 140, 72, ${alpha})`
            : `rgba(180, 58, 72, ${alpha})`;

          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, yH);
          ctx.lineTo(x, yL);
          ctx.stroke();

          const top = Math.min(yO, yC);
          const bodyH = Math.max(2, Math.abs(yC - yO));
          ctx.fillStyle = color;
          ctx.fillRect(x - bodyW / 2, top, bodyW, bodyH);
        });
      }

      // Market waveforms only — no grid
      if (variant !== 'subtle') {
        ctx.beginPath();
        ctx.strokeStyle = isLight ? 'rgba(18, 110, 58, 0.16)' : 'rgba(18, 110, 58, 0.08)';
        ctx.lineWidth = 1.4;
        for (let x = 0; x < w; x += 8) {
          const y1 =
            h * 0.38 +
            Math.sin(x * 0.008 + time) * 22 +
            Math.cos(x * 0.015 - time * 0.5) * 10;
          if (x === 0) ctx.moveTo(x, y1);
          else ctx.lineTo(x, y1);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = isLight ? 'rgba(124, 58, 237, 0.12)' : 'rgba(160, 32, 240, 0.05)';
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 10) {
          const y2 =
            h * 0.68 +
            Math.cos(x * 0.006 - time * 0.8) * 28 +
            Math.sin(x * 0.012 + time) * 12;
          if (x === 0) ctx.moveTo(x, y2);
          else ctx.lineTo(x, y2);
        }
        ctx.stroke();
      }

      // Constellation / command network
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;

        ctx.beginPath();
        if (d.isNode) {
          const color = d.violet
            ? `rgba(124, 58, 237, ${d.a * (isLight ? 1.1 : 1.45)})`
            : `rgba(18, 110, 58, ${d.a * (isLight ? 1.15 : 1.5)})`;
          ctx.fillStyle = color;
          ctx.arc(d.x, d.y, d.r * 1.7, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = d.violet
            ? `rgba(124, 58, 237, ${d.a * (isLight ? 0.35 : 0.4)})`
            : `rgba(30, 130, 70, ${d.a * (isLight ? 0.35 : 0.4)})`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r * 3.5, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.fillStyle = isLight
            ? `rgba(20, 20, 24, ${d.a * 0.55})`
            : `rgba(255, 255, 255, ${d.a})`;
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fill();
        }

        for (let j = i + 1; j < dots.length; j++) {
          const o = dots[j];
          const dx = d.x - o.x;
          const dy = d.y - o.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 115) {
            ctx.strokeStyle = `rgba(18, 110, 58, ${(isLight ? 0.14 : 0.09) * (1 - dist / 115)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(o.x, o.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [count, variant, isLight]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* Deep void vignette */}
      <div className="lab-vignette absolute inset-0" />

      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />

      {/* Horizon flare */}
      {variant !== 'subtle' && (
        <>
          <div className="lab-horizon absolute inset-x-0 bottom-0 h-1/2" />
          <div className="absolute -right-24 -top-16 size-[520px] opacity-[0.08] md:right-0 md:size-[600px]">
            <div className="absolute inset-0 rounded-full border border-primary/50 animate-spin-slow" />
            <div className="absolute inset-14 rounded-full border border-violet/35" />
            <div className="absolute inset-28 rounded-full border border-primary/20" />
          </div>
        </>
      )}

      <div
        className="absolute left-0 right-0 h-24 opacity-[0.05]"
        style={{
          background: isLight
            ? 'linear-gradient(180deg, transparent, hsl(277 70% 48% / 0.28), transparent)'
            : 'linear-gradient(180deg, transparent, hsl(148 68% 28% / 0.4), transparent)',
          animation: 'scan 12s linear infinite',
        }}
      />

      <div
        className={`absolute -top-40 left-1/4 size-[480px] rounded-full blur-[130px] animate-pulse-soft ${
          isLight ? 'bg-violet/[0.14] opacity-50' : 'bg-primary/[0.08]'
        }`}
      />
      <div className={`absolute bottom-[-10%] left-[8%] size-[380px] rounded-full bg-violet/[0.12] blur-[110px] ${isLight ? 'opacity-45' : ''}`} />
      <div className={`absolute bottom-[-10%] right-[10%] size-[360px] rounded-full bg-violet-glow/[0.08] blur-[100px] ${isLight ? 'opacity-40' : ''}`} />
    </div>
  );
}
