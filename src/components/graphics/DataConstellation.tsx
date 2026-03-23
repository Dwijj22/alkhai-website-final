'use client';

import { useEffect, useRef } from 'react';
import { useMouse } from '@/hooks/useMouse';

interface DataPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  label: string;
  value: string;
  r: number;
  color: string;
  angle: number;
  orbitR: number;
  orbitSpeed: number;
}

const DATA_ITEMS = [
  { label: 'Cycle Time', value: '12.3d', color: 'rgba(91,140,255,' },
  { label: 'Queue Depth', value: '847', color: 'rgba(255,176,32,' },
  { label: 'Rework Rate', value: '18%', color: 'rgba(255,77,109,' },
  { label: 'Throughput', value: '+14%', color: 'rgba(61,220,151,' },
  { label: 'SLA Breach', value: '24.7%', color: 'rgba(255,77,109,' },
  { label: 'Wait State', value: '4.6d', color: 'rgba(255,176,32,' },
  { label: 'Variants', value: '23', color: 'rgba(91,140,255,' },
  { label: 'Handoffs', value: '8.2', color: 'rgba(125,166,255,' },
  { label: 'Approval', value: '2.1d', color: 'rgba(255,176,32,' },
  { label: 'Resolution', value: '89%', color: 'rgba(61,220,151,' },
  { label: 'Escalation', value: '12%', color: 'rgba(255,77,109,' },
  { label: 'Backlog', value: '156', color: 'rgba(91,140,255,' },
];

export default function DataConstellation() {
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
    let points: DataPoint[] = [];
    let animId: number;
    let bgDots: { x: number; y: number; size: number; opacity: number }[] = [];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      initPoints();
    };

    const initPoints = () => {
      const cx = w / 2, cy = h / 2;
      points = DATA_ITEMS.map((item, i) => {
        const angle = (i / DATA_ITEMS.length) * Math.PI * 2;
        const orbitR = 80 + Math.random() * Math.min(w, h) * 0.25;
        const x = cx + Math.cos(angle) * orbitR;
        const y = cy + Math.sin(angle) * orbitR;
        return {
          x, y, baseX: x, baseY: y,
          vx: 0, vy: 0,
          label: item.label, value: item.value,
          r: 4 + Math.random() * 3,
          color: item.color,
          angle,
          orbitR,
          orbitSpeed: 0.0003 + Math.random() * 0.0005,
        };
      });

      bgDots = Array.from({ length: 60 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 0.5 + Math.random() * 1.5,
        opacity: 0.05 + Math.random() * 0.1,
      }));
    };

    let time = 0;
    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, w, h);
      const m = mouse.current;
      const cx = w / 2, cy = h / 2;

      bgDots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(91,140,255,${d.opacity})`;
        ctx.fill();
      });

      points.forEach((p) => {
        p.angle += p.orbitSpeed;
        p.baseX = cx + Math.cos(p.angle) * p.orbitR;
        p.baseY = cy + Math.sin(p.angle) * p.orbitR;

        const dx = m.x - p.baseX;
        const dy = m.y - p.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const attract = m.isInside ? Math.max(0, 1 - dist / 250) : 0;

        p.x += (p.baseX + dx * attract * 0.35 - p.x) * 0.06;
        p.y += (p.baseY + dy * attract * 0.35 - p.y) * 0.06;
      });

      points.forEach((p, i) => {
        for (let j = i + 1; j < points.length; j++) {
          const other = points[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(91,140,255,${(0.06 * (1 - dist / 150)).toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      points.forEach((p) => {
        const dx = m.x - p.x;
        const dy = m.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const hover = m.isInside ? Math.max(0, 1 - dist / 120) : 0;
        const r = p.r + hover * 6;

        if (hover > 0.1) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
          glow.addColorStop(0, `${p.color}${(0.12 + hover * 0.1).toFixed(2)})`);
          glow.addColorStop(1, `${p.color}0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${(0.6 + hover * 0.4).toFixed(2)})`;
        ctx.fill();

        if (hover > 0.2) {
          ctx.fillStyle = `rgba(255,255,255,${(hover * 0.9).toFixed(2)})`;
          ctx.font = 'bold 11px "Sora", system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(p.value, p.x, p.y - r - 10);
          ctx.fillStyle = `rgba(199,206,217,${(hover * 0.7).toFixed(2)})`;
          ctx.font = '9px "Sora", system-ui, sans-serif';
          ctx.fillText(p.label, p.x, p.y - r - 22);
        }
      });

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
