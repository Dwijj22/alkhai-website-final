'use client';

import { useEffect, useRef } from 'react';
import { useMouse } from '@/hooks/useMouse';

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  r: number;
  label: string;
  isBottleneck: boolean;
  color: string;
  glowColor: string;
  pulse: number;
}

interface Particle {
  progress: number;
  speed: number;
  edgeIdx: number;
  size: number;
  opacity: number;
}

const LABELS = ['Ingest', 'Triage', 'Assign', 'Approve', 'Execute', 'Resolve', 'Close'];
const BOTTLENECK_IDX = 3;

export default function FlowNetwork() {
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
    let nodes: Node[] = [];
    let edges: [number, number][] = [];
    let particles: Particle[] = [];
    let animId: number;
    let time = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      initNodes();
    };

    const initNodes = () => {
      const padX = w * 0.08;
      const spacingX = (w - padX * 2) / (LABELS.length - 1);
      const centerY = h * 0.5;

      nodes = LABELS.map((label, i) => {
        const offsetY = Math.sin(i * 1.2) * h * 0.12;
        const x = padX + i * spacingX;
        const y = centerY + offsetY;
        const isBottleneck = i === BOTTLENECK_IDX;
        return {
          x, y, baseX: x, baseY: y,
          r: isBottleneck ? 22 : 16,
          label,
          isBottleneck,
          color: isBottleneck ? 'rgba(255,77,109,0.9)' : i === LABELS.length - 1 ? 'rgba(61,220,151,0.9)' : 'rgba(91,140,255,0.8)',
          glowColor: isBottleneck ? 'rgba(255,77,109,' : i === LABELS.length - 1 ? 'rgba(61,220,151,' : 'rgba(91,140,255,',
          pulse: 0,
        };
      });

      edges = [];
      for (let i = 0; i < nodes.length - 1; i++) {
        edges.push([i, i + 1]);
      }
      edges.push([1, 3]);
      edges.push([3, 5]);

      particles = [];
      for (let i = 0; i < edges.length * 6; i++) {
        particles.push({
          progress: Math.random(),
          speed: 0.002 + Math.random() * 0.003,
          edgeIdx: Math.floor(Math.random() * edges.length),
          size: 1.5 + Math.random() * 1.5,
          opacity: 0.4 + Math.random() * 0.4,
        });
      }
    };

    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, w, h);
      const m = mouse.current;

      nodes.forEach((node) => {
        const dx = m.x - node.baseX;
        const dy = m.y - node.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = m.isInside ? Math.max(0, 1 - dist / 200) : 0;
        node.x = node.baseX + dx * influence * 0.08;
        node.y = node.baseY + dy * influence * 0.08;
        node.pulse += 0.03;
      });

      edges.forEach(([a, b]) => {
        const na = nodes[a], nb = nodes[b];
        const isBottleneckEdge = na.isBottleneck || nb.isBottleneck;

        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        const cpx = (na.x + nb.x) / 2;
        const cpy = (na.y + nb.y) / 2 - 20;
        ctx.quadraticCurveTo(cpx, cpy, nb.x, nb.y);
        ctx.strokeStyle = isBottleneckEdge ? 'rgba(255,77,109,0.12)' : 'rgba(91,140,255,0.1)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      particles.forEach((p) => {
        const [aIdx, bIdx] = edges[p.edgeIdx];
        const na = nodes[aIdx], nb = nodes[bIdx];
        const nearBottleneck = na.isBottleneck || nb.isBottleneck;
        const speedMult = nearBottleneck ? 0.3 : 1;
        p.progress += p.speed * speedMult;
        if (p.progress > 1) {
          p.progress = 0;
          p.edgeIdx = Math.floor(Math.random() * edges.length);
        }

        const t = p.progress;
        const cpx = (na.x + nb.x) / 2;
        const cpy = (na.y + nb.y) / 2 - 20;
        const px = (1 - t) * (1 - t) * na.x + 2 * (1 - t) * t * cpx + t * t * nb.x;
        const py = (1 - t) * (1 - t) * na.y + 2 * (1 - t) * t * cpy + t * t * nb.y;

        const dm = Math.sqrt((m.x - px) ** 2 + (m.y - py) ** 2);
        const cursorBoost = m.isInside ? Math.max(0, 1 - dm / 120) : 0;

        ctx.beginPath();
        ctx.arc(px, py, p.size + cursorBoost * 2, 0, Math.PI * 2);
        const color = nearBottleneck ? `rgba(255,176,32,${(p.opacity + cursorBoost * 0.3).toFixed(2)})` : `rgba(91,140,255,${(p.opacity + cursorBoost * 0.3).toFixed(2)})`;
        ctx.fillStyle = color;
        ctx.fill();
      });

      nodes.forEach((node) => {
        const dx = m.x - node.x;
        const dy = m.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const hover = m.isInside ? Math.max(0, 1 - dist / 150) : 0;
        const r = node.r + hover * 10 + (node.isBottleneck ? Math.sin(node.pulse) * 3 : 0);

        if (hover > 0 || node.isBottleneck) {
          const glow = ctx.createRadialGradient(node.x, node.y, r * 0.5, node.x, node.y, r * 3);
          glow.addColorStop(0, `${node.glowColor}${(0.15 + hover * 0.15).toFixed(2)})`);
          glow.addColorStop(1, `${node.glowColor}0)`);
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${0.1 + hover * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = `rgba(255,255,255,${0.6 + hover * 0.35})`;
        ctx.font = `${10 + hover * 2}px "Sora", system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + r + 18 + hover * 4);

        if (node.isBottleneck && hover > 0.3) {
          ctx.fillStyle = `rgba(255,77,109,${hover * 0.9})`;
          ctx.font = 'bold 11px "Sora", system-ui, sans-serif';
          ctx.fillText('BOTTLENECK', node.x, node.y - r - 12);
          ctx.fillStyle = `rgba(255,176,32,${hover * 0.8})`;
          ctx.font = '10px "Sora", system-ui, sans-serif';
          ctx.fillText('4.6 day avg wait', node.x, node.y - r - 0);
        }
      });

      if (m.isInside) {
        const scanR = 120 + Math.sin(time * 2) * 20;
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, scanR);
        grad.addColorStop(0, 'rgba(91,140,255,0.04)');
        grad.addColorStop(0.7, 'rgba(91,140,255,0.02)');
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
    <div ref={containerRef} className="absolute inset-0 z-0" style={{ cursor: 'crosshair' }}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
