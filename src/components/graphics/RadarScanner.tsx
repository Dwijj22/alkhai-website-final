'use client';

import { useEffect, useRef } from 'react';
import { useMouse } from '@/hooks/useMouse';

interface HiddenNode {
  x: number;
  y: number;
  r: number;
  label: string;
  severity: 'high' | 'medium' | 'low';
  revealed: number;
  baseX: number;
  baseY: number;
}

export default function RadarScanner() {
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
    let nodes: HiddenNode[] = [];
    let animId: number;
    let time = 0;
    let sweepAngle = 0;

    const BOTTLENECKS = [
      { label: 'Approval Queue', severity: 'high' as const },
      { label: 'Rework Loop', severity: 'high' as const },
      { label: 'Handoff Delay', severity: 'medium' as const },
      { label: 'Backlog Growth', severity: 'medium' as const },
      { label: 'Escalation Gap', severity: 'medium' as const },
      { label: 'Wait State', severity: 'low' as const },
      { label: 'SLA Risk', severity: 'high' as const },
      { label: 'Capacity Leak', severity: 'low' as const },
      { label: 'Queue Overflow', severity: 'medium' as const },
      { label: 'Data Latency', severity: 'low' as const },
    ];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      initNodes();
    };

    const initNodes = () => {
      nodes = BOTTLENECKS.map((b) => {
        const x = Math.random() * (w - 100) + 50;
        const y = Math.random() * (h - 80) + 40;
        return {
          x, y, baseX: x, baseY: y,
          r: b.severity === 'high' ? 8 : b.severity === 'medium' ? 6 : 4,
          label: b.label,
          severity: b.severity,
          revealed: 0,
        };
      });
    };

    const sevColor = (sev: string) =>
      sev === 'high' ? 'rgba(255,77,109,' : sev === 'medium' ? 'rgba(255,176,32,' : 'rgba(91,140,255,';

    const draw = () => {
      time += 0.016;
      sweepAngle += 0.015;
      ctx.clearRect(0, 0, w, h);
      const m = mouse.current;
      const cx = m.isInside ? m.x : w / 2;
      const cy = m.isInside ? m.y : h / 2;
      const maxR = Math.max(w, h) * 0.45;

      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, maxR * (i / 4), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(91,140,255,${0.04 + (m.isInside ? 0.02 : 0)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, sweepAngle, sweepAngle + 0.5);
      ctx.closePath();
      const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      sweepGrad.addColorStop(0, 'rgba(91,140,255,0.08)');
      sweepGrad.addColorStop(0.6, 'rgba(91,140,255,0.04)');
      sweepGrad.addColorStop(1, 'rgba(91,140,255,0)');
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      const sweepEndX = cx + Math.cos(sweepAngle) * maxR;
      const sweepEndY = cy + Math.sin(sweepAngle) * maxR;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sweepEndX, sweepEndY);
      ctx.strokeStyle = 'rgba(91,140,255,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      nodes.forEach((node) => {
        const dx = node.baseX - cx;
        const dy = node.baseY - cy;
        const nodeAngle = Math.atan2(dy, dx);
        let angleDiff = sweepAngle - nodeAngle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

        if (Math.abs(angleDiff) < 0.3) {
          node.revealed = Math.min(1, node.revealed + 0.02);
        } else {
          node.revealed = Math.max(0, node.revealed - 0.003);
        }

        const mdx = m.x - node.baseX;
        const mdy = m.y - node.baseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const cursorReveal = m.isInside ? Math.max(0, 1 - mDist / 160) : 0;

        if (cursorReveal > 0) {
          node.revealed = Math.min(1, node.revealed + cursorReveal * 0.05);
        }

        const alpha = node.revealed;
        if (alpha < 0.01) return;

        const col = sevColor(node.severity);
        const r = node.r + cursorReveal * 5;

        if (alpha > 0.3) {
          const glow = ctx.createRadialGradient(node.baseX, node.baseY, 0, node.baseX, node.baseY, r * 4);
          glow.addColorStop(0, `${col}${(alpha * 0.15).toFixed(2)})`);
          glow.addColorStop(1, `${col}0)`);
          ctx.beginPath();
          ctx.arc(node.baseX, node.baseY, r * 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.baseX, node.baseY, r, 0, Math.PI * 2);
        ctx.fillStyle = `${col}${(alpha * 0.9).toFixed(2)})`;
        ctx.fill();

        if (alpha > 0.4) {
          ctx.beginPath();
          ctx.arc(node.baseX, node.baseY, r + 4 + Math.sin(time * 3) * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `${col}${(alpha * 0.3).toFixed(2)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        if (alpha > 0.5 || cursorReveal > 0.3) {
          const textAlpha = Math.max(alpha, cursorReveal);
          ctx.fillStyle = `rgba(255,255,255,${(textAlpha * 0.85).toFixed(2)})`;
          ctx.font = `${cursorReveal > 0.3 ? 'bold ' : ''}10px "Sora", system-ui, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.baseX, node.baseY - r - 8);

          if (cursorReveal > 0.4) {
            ctx.fillStyle = `${col}${(cursorReveal * 0.9).toFixed(2)})`;
            ctx.font = 'bold 9px "Sora", system-ui, sans-serif';
            ctx.fillText(
              node.severity === 'high' ? 'CRITICAL' : node.severity === 'medium' ? 'WARNING' : 'MONITOR',
              node.baseX, node.baseY + r + 14,
            );
          }
        }
      });

      if (m.isInside) {
        ctx.beginPath();
        ctx.arc(m.x, m.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(91,140,255,0.6)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(m.x, m.y, 8 + Math.sin(time * 4) * 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(91,140,255,0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
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
    <div ref={containerRef} className="absolute inset-0 z-0" style={{ cursor: 'crosshair' }}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
