"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export function Spotlight({
  className,
  color = "200,168,107",
  size = 650,
  opacity = 0.14,
}: {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}% ${y}%, rgba(${color},${opacity}), transparent 70%)`;

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const prevPosition = getComputedStyle(el).position;
    if (prevPosition === "static") el.style.position = "relative";

    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      x.set(((e.clientX - rect.left) / rect.width) * 100);
      y.set(((e.clientY - rect.top) / rect.height) * 100);
    };
    el.addEventListener("mousemove", handle);
    return () => el.removeEventListener("mousemove", handle);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ background }}
    />
  );
}
