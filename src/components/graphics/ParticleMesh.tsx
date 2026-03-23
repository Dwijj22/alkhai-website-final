'use client';

import { useEffect, useRef } from 'react';
import { useMouse } from '@/hooks/useMouse';

export default function ParticleMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useMouse(containerRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    let dots: { x: number; y: number; bx: number; by: number; vx: number; vy: number; size: number }[] = [];
    let animId: number;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      initDots();
    };

    const initDots = () => {
      const count = Math.min(Math.floor((w * h) / 8000), 100);
      dots = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x, y, bx: x, by: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 1 + Math.random() * 1.5,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const m = mouse.current;

      dots.forEach((d) => {
        d.bx += d.vx;
        d.by += d.vy;
        if (d.bx < 0 || d.bx > w) d.vx *= -1;
        if (d.by < 0 || d.by > h) d.vy *= -1;
        d.bx = Math.max(0, Math.min(w, d.bx));
        d.by = Math.max(0, Math.min(h, d.by));

        let tx = d.bx, ty = d.by;
        if (m.isInside) {
          const dx = d.bx - m.x;
          const dy = d.by - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (1 - dist / 150) * 40;
            const angle = Math.atan2(dy, dx);
            tx += Math.cos(angle) * force;
            ty += Math.sin(angle) * force;
          }
        }

        d.x += (tx - d.x) * 0.08;
        d.y += (ty - d.y) * 0.08;
      });

      dots.forEach((a, i) => {
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(91,140,255,${(0.08 * (1 - dist / 120)).toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      dots.forEach((d) => {
        const dx = m.x - d.x;
        const dy = m.y - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = m.isInside ? Math.max(0, 1 - dist / 150) : 0;
        const r = d.size + proximity * 2;

        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = proximity > 0.2
          ? `rgba(61,220,151,${(0.3 + proximity * 0.5).toFixed(2)})`
          : `rgba(91,140,255,${(0.2 + proximity * 0.3).toFixed(2)})`;
        ctx.fill();
      });

      if (m.isInside) {
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 100);
        grad.addColorStop(0, 'rgba(61,220,151,0.03)');
        grad.addColorStop(1, 'rgba(61,220,151,0)');
        ctx.beginPath();
        ctx.arc(m.x, m.y, 100, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    animId = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [mouse]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
