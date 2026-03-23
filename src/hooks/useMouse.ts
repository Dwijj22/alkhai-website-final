'use client';

import { useEffect, useRef, useCallback } from 'react';

export interface MousePos {
  x: number;
  y: number;
  relX: number;
  relY: number;
  isInside: boolean;
}

export function useMouse(containerRef: React.RefObject<HTMLElement | null>) {
  const pos = useRef<MousePos>({ x: 0, y: 0, relX: 0.5, relY: 0.5, isInside: false });

  const handleMove = useCallback((e: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pos.current = {
      x,
      y,
      relX: x / rect.width,
      relY: y / rect.height,
      isInside: x >= 0 && x <= rect.width && y >= 0 && y <= rect.height,
    };
  }, [containerRef]);

  const handleLeave = useCallback(() => {
    pos.current = { ...pos.current, isInside: false };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMove, { passive: true });
    el.addEventListener('mouseleave', handleLeave, { passive: true });
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [containerRef, handleMove, handleLeave]);

  return pos;
}
