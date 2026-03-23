'use client';

import { useEffect, useRef } from 'react';
import { useMouse } from '@/hooks/useMouse';

interface Cell {
  x: number;
  y: number;
  w: number;
  h: number;
  intensity: number;
  label: string;
  delay: number;
}

const PROCESS_STEPS = [
  ['Request', 'Validate', 'Route', 'Queue', 'Assign'],
  ['Review', 'Approve', 'Escalate', 'Execute', 'Verify'],
  ['Document', 'Notify', 'Close', 'Archive', 'Report'],
];

export default function ProcessHeatmap() {
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
    let cells: Cell[] = [];
    let animId: number;
    let time = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      initCells();
    };

    const initCells = () => {
      const cols = PROCESS_STEPS[0].length;
      const rows = PROCESS_STEPS.length;
      const pad = 40;
      const gap = 8;
      const cellW = (w - pad * 2 - gap * (cols - 1)) / cols;
      const totalH = rows * cellW * 0.6 + gap * (rows - 1);
      const startY = (h - totalH) / 2;
      const cellH = cellW * 0.6;

      cells = [];
      PROCESS_STEPS.forEach((row, ri) => {
        row.forEach((label, ci) => {
          const bottleneckFactor = (label === 'Queue' || label === 'Approve' || label === 'Escalate') ? 0.85 : Math.random() * 0.5 + 0.1;
          cells.push({
            x: pad + ci * (cellW + gap),
            y: startY + ri * (cellH + gap),
            w: cellW, h: cellH,
            intensity: bottleneckFactor,
            label,
            delay: (ri * cols + ci) * 0.05,
          });
        });
      });
    };

    const getColor = (intensity: number, alpha: number) => {
      if (intensity > 0.7) return `rgba(255,77,109,${alpha})`;
      if (intensity > 0.4) return `rgba(255,176,32,${alpha})`;
      return `rgba(61,220,151,${alpha})`;
    };

    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, w, h);
      const m = mouse.current;

      cells.forEach((cell) => {
        const cx = cell.x + cell.w / 2;
        const cy = cell.y + cell.h / 2;
        const dx = m.x - cx;
        const dy = m.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const hover = m.isInside ? Math.max(0, 1 - dist / 180) : 0;
        const pulse = Math.sin(time * 2 + cell.delay * 10) * 0.05;
        const effectiveIntensity = Math.min(1, cell.intensity + pulse);

        const expand = hover * 4;
        const rx = cell.x - expand;
        const ry = cell.y - expand;
        const rw = cell.w + expand * 2;
        const rh = cell.h + expand * 2;

        ctx.beginPath();
        ctx.roundRect(rx, ry, rw, rh, 8);
        ctx.fillStyle = getColor(effectiveIntensity, 0.06 + hover * 0.12 + effectiveIntensity * 0.06);
        ctx.fill();
        ctx.strokeStyle = getColor(effectiveIntensity, 0.15 + hover * 0.3);
        ctx.lineWidth = 1;
        ctx.stroke();

        const barH = 3;
        const barW = (rw - 16) * effectiveIntensity;
        ctx.beginPath();
        ctx.roundRect(rx + 8, ry + rh - 12, barW, barH, 2);
        ctx.fillStyle = getColor(effectiveIntensity, 0.5 + hover * 0.3);
        ctx.fill();

        ctx.fillStyle = `rgba(255,255,255,${0.4 + hover * 0.5})`;
        ctx.font = `${hover > 0.3 ? 'bold ' : ''}${10 + hover * 2}px "Sora", system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(cell.label, cx, cy - 4);

        if (hover > 0.3) {
          ctx.fillStyle = getColor(effectiveIntensity, 0.9);
          ctx.font = 'bold 9px "Sora", system-ui, sans-serif';
          ctx.fillText(
            effectiveIntensity > 0.7 ? 'HIGH CONSTRAINT' : effectiveIntensity > 0.4 ? 'MODERATE' : 'FLOWING',
            cx, cy + 12,
          );
        }
      });

      if (m.isInside) {
        const scanR = 160;
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, scanR);
        grad.addColorStop(0, 'rgba(91,140,255,0.03)');
        grad.addColorStop(1, 'rgba(91,140,255,0)');
        ctx.beginPath();
        ctx.arc(m.x, m.y, scanR, 0, Math.PI * 2);
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
