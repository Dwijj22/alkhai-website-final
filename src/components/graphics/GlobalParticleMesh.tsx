'use client';

import { useEffect, useRef } from 'react';

interface Dot {
  x: number; y: number;
  bx: number; by: number;
  vx: number; vy: number;
  size: number;
  layer: number;
}

interface AuroraWave {
  offset: number;
  speed: number;
  amplitude: number;
  wavelength: number;
  color: { r: number; g: number; b: number };
  alpha: number;
  y: number;
}

export default function GlobalParticleMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    let animId: number;
    let mx = -1000, my = -1000;
    let scrollY = 0;
    let pageHeight = 1;
    let time = 0;
    let dots: Dot[] = [];
    let auroras: AuroraWave[] = [];

    const CONTENT_BLOCKERS = [
      'nav',
      'footer',
      'button',
      'a',
      'input',
      'textarea',
      'select',
      'label',
      'form',
      'table',
      '.panel',
      '.card',
      '.metric',
      '.step',
      '.cta-box',
      '.section-head',
      '.hero-copy',
      '.hero-visual',
      '.form',
      '.link-chip',
      '.process-report-btn',
      '.process-report-popup',
      '.marquee-container',
    ].join(', ');

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      pageHeight = Math.max(1, document.documentElement.scrollHeight - h);
      initDots();
      initAuroras();
    };

    const initDots = () => {
      const count = Math.min(Math.floor((w * h) / 5500), 160);
      dots = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const layer = Math.random() < 0.35 ? 0 : 1;
        return {
          x, y, bx: x, by: y,
          vx: (Math.random() - 0.5) * (layer === 0 ? 0.12 : 0.28),
          vy: (Math.random() - 0.5) * (layer === 0 ? 0.12 : 0.28),
          size: layer === 0 ? 0.6 + Math.random() * 0.8 : 1 + Math.random() * 1.5,
          layer,
        };
      });
    };

    const initAuroras = () => {
      auroras = [
        { offset: 0, speed: 0.08, amplitude: 40, wavelength: 600, color: { r: 91, g: 140, b: 255 }, alpha: 0.018, y: h * 0.25 },
        { offset: Math.PI, speed: 0.05, amplitude: 55, wavelength: 800, color: { r: 61, g: 220, b: 151 }, alpha: 0.014, y: h * 0.5 },
        { offset: Math.PI * 0.5, speed: 0.065, amplitude: 35, wavelength: 500, color: { r: 125, g: 166, b: 255 }, alpha: 0.012, y: h * 0.75 },
      ];
    };

    const getScrollColor = (scrollPct: number, proximity: number) => {
      if (proximity > 0.2) return { r: 61, g: 220, b: 151 };
      if (scrollPct < 0.25) return { r: 91, g: 140, b: 255 };
      if (scrollPct < 0.5) {
        const t = (scrollPct - 0.25) / 0.25;
        return { r: Math.round(91 + (61 - 91) * t), g: Math.round(140 + (220 - 140) * t), b: Math.round(255 + (151 - 255) * t) };
      }
      if (scrollPct < 0.75) {
        const t = (scrollPct - 0.5) / 0.25;
        return { r: Math.round(61 + (255 - 61) * t), g: Math.round(220 + (176 - 220) * t), b: Math.round(151 + (32 - 151) * t) };
      }
      const t = (scrollPct - 0.75) / 0.25;
      return { r: Math.round(255 + (91 - 255) * t), g: Math.round(176 + (140 - 176) * t), b: Math.round(32 + (255 - 32) * t) };
    };

    const shouldIgnoreInteraction = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest(CONTENT_BLOCKERS));

    const onMove = (e: MouseEvent) => {
      if (shouldIgnoreInteraction(e.target)) {
        mx = -1000;
        my = -1000;
        return;
      }
      mx = e.clientX;
      my = e.clientY;
    };
    const onLeave = () => { mx = -1000; my = -1000; };

    const onScroll = () => {
      scrollY = window.scrollY;
      pageHeight = Math.max(1, document.documentElement.scrollHeight - h);
    };

    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, w, h);
      const hasMouse = mx > -500;
      const scrollPct = Math.min(1, scrollY / pageHeight);
      const baseColor = getScrollColor(scrollPct, 0);

      // --- Aurora waves ---
      auroras.forEach((wave) => {
        wave.offset += wave.speed * 0.016;
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 4) {
          const yOff = Math.sin((x / wave.wavelength) * Math.PI * 2 + wave.offset) * wave.amplitude
                     + Math.sin((x / (wave.wavelength * 0.6)) * Math.PI * 2 + wave.offset * 1.3) * wave.amplitude * 0.4;
          ctx.lineTo(x, wave.y + yOff);
        }
        ctx.lineTo(w, h);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, wave.y - wave.amplitude * 2, 0, wave.y + wave.amplitude * 3);
        grad.addColorStop(0, `rgba(${wave.color.r},${wave.color.g},${wave.color.b},0)`);
        grad.addColorStop(0.3, `rgba(${wave.color.r},${wave.color.g},${wave.color.b},${wave.alpha})`);
        grad.addColorStop(0.6, `rgba(${wave.color.r},${wave.color.g},${wave.color.b},${wave.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(${wave.color.r},${wave.color.g},${wave.color.b},0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // --- Update dots ---
      dots.forEach((d) => {
        d.bx += d.vx;
        d.by += d.vy;
        if (d.bx < 0 || d.bx > w) d.vx *= -1;
        if (d.by < 0 || d.by > h) d.vy *= -1;
        d.bx = Math.max(0, Math.min(w, d.bx));
        d.by = Math.max(0, Math.min(h, d.by));

        let tx = d.bx, ty = d.by;
        const reactMult = d.layer === 1 ? 1 : 0.3;

        if (hasMouse) {
          const dx = d.bx - mx;
          const dy = d.by - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            const force = (1 - dist / 200) * 55 * reactMult;
            const angle = Math.atan2(dy, dx);
            tx += Math.cos(angle) * force;
            ty += Math.sin(angle) * force;
          }
        }

        d.x += (tx - d.x) * 0.07;
        d.y += (ty - d.y) * 0.07;
      });

      // --- Draw dots by layer ---
      const backDots = dots.filter((d) => d.layer === 0);
      const frontDots = dots.filter((d) => d.layer === 1);

      [backDots, frontDots].forEach((layerDots, layerIdx) => {
        const isBack = layerIdx === 0;
        const connDist = isBack ? 100 : 140;
        const lineAlpha = isBack ? 0.03 : 0.07;

        for (let i = 0; i < layerDots.length; i++) {
          const a = layerDots[i];
          for (let j = i + 1; j < layerDots.length; j++) {
            const b = layerDots[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connDist) {
              const midX = (a.x + b.x) / 2;
              const midY = (a.y + b.y) / 2;
              let lineBoost = 0;
              if (hasMouse) {
                const dm = Math.sqrt((mx - midX) ** 2 + (my - midY) ** 2);
                lineBoost = Math.max(0, 1 - dm / 200);
              }
              const alpha = lineAlpha * (1 - dist / connDist) + lineBoost * 0.04;

              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(${baseColor.r},${baseColor.g},${baseColor.b},${alpha.toFixed(3)})`;
              ctx.lineWidth = isBack ? 0.3 : 0.5 + lineBoost * 0.5;
              ctx.stroke();
            }
          }
        }

        layerDots.forEach((d) => {
          let proximity = 0;
          if (hasMouse) {
            const dx = mx - d.x;
            const dy = my - d.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            proximity = Math.max(0, 1 - dist / 200);
          }
          const r = d.size + proximity * (isBack ? 1.5 : 3);
          const col = getScrollColor(scrollPct, proximity);
          const dotAlpha = isBack
            ? 0.08 + proximity * 0.2
            : 0.18 + proximity * 0.6;

          ctx.beginPath();
          ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${dotAlpha.toFixed(2)})`;
          ctx.fill();
        });
      });

      // --- Cursor glow ---
      if (hasMouse) {
        const glowCol = getScrollColor(scrollPct, 0.5);
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 140);
        grad.addColorStop(0, `rgba(${glowCol.r},${glowCol.g},${glowCol.b},0.025)`);
        grad.addColorStop(1, `rgba(${glowCol.r},${glowCol.g},${glowCol.b},0)`);
        ctx.beginPath();
        ctx.arc(mx, my, 140, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    animId = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
