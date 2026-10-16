"use client";

import { useEffect, useRef } from "react";
import { cx, prefersReducedMotion } from "@/lib/utils";

interface Petal {
  x: number;
  y: number;
  z: number; // depth 0.4–1.4 → size, speed, blur feel
  rot: number;
  vr: number;
  sway: number;
  phase: number;
  color: string;
  flip: number;
}

const COLORS = ["#b3263a", "#c93a4b", "#e58a97", "#f2b8bd", "#d9822b", "#e9a83b", "#8e1b2c"];

/**
 * Lightweight canvas of falling rose & marigold petals.
 * Pauses when off-screen or when the tab is hidden; renders nothing for reduced-motion users.
 */
export function PetalCanvas({ density = 1, className, active = true }: { density?: number; className?: string; active?: boolean }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !active || prefersReducedMotion()) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const petals: Petal[] = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.round(Math.min(34, Math.max(8, (w * h) / 42000)) * density);
      while (petals.length < target) petals.push(spawn(true));
      petals.length = target;
    };

    const spawn = (anywhere: boolean): Petal => ({
      x: Math.random() * (w || 400),
      y: anywhere ? Math.random() * (h || 600) : -20,
      z: 0.45 + Math.random() * 0.95,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 1.6,
      sway: 14 + Math.random() * 26,
      phase: Math.random() * Math.PI * 2,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      flip: Math.random() * Math.PI * 2,
    });

    const draw = (p: Petal, t: number) => {
      const s = 5.5 * p.z;
      const x = p.x + Math.sin(t * 0.0006 + p.phase) * p.sway;
      ctx.save();
      ctx.translate(x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, Math.abs(Math.cos(p.flip)) * 0.75 + 0.25);
      ctx.globalAlpha = 0.45 + p.z * 0.35;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, -s * 1.3);
      ctx.bezierCurveTo(s * 1.1, -s * 0.9, s * 1.0, s * 0.8, 0, s * 1.2);
      ctx.bezierCurveTo(-s * 1.0, s * 0.8, -s * 1.1, -s * 0.9, 0, -s * 1.3);
      ctx.fill();
      ctx.globalAlpha *= 0.35;
      ctx.fillStyle = "#fff4e0";
      ctx.beginPath();
      ctx.ellipse(-s * 0.25, -s * 0.3, s * 0.25, s * 0.6, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(48, t - last) / 16.67;
      last = t;
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += (0.45 + p.z * 0.75) * dt;
        p.rot += p.vr * 0.01 * dt;
        p.flip += 0.03 * dt;
        if (p.y > h + 24) petals[i] = spawn(false);
        draw(p, t);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);
    const onVis = () => {
      last = performance.now();
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [density, active]);

  return <canvas ref={ref} className={cx("petals", className)} aria-hidden="true" />;
}
