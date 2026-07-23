"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SUITS = {
  spade: "♠",
  heart: "♥",
  diamond: "♦",
  club: "♣",
} as const;

export function PlayingCard({
  rank = "A",
  suit = "spade",
  className,
  flipped = false,
}: {
  rank?: string;
  suit?: keyof typeof SUITS;
  className?: string;
  flipped?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const isRed = suit === "heart" || suit === "diamond";

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setRot({ x: py * -16, y: px * 16 });
  }

  function handleLeave() {
    setRot({ x: 0, y: 0 });
  }

  return (
    <div style={{ perspective: 1000 }} className={cn("select-none", className)}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        animate={{
          rotateX: rot.x,
          rotateY: flipped ? 180 + rot.y : rot.y,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className={cn(
          "relative flex aspect-[2/3] w-full items-center justify-center rounded-2xl border border-gold/30 bg-gradient-to-br from-[#151515] to-[#0a0a0a] shadow-[0_20px_60px_rgba(0,0,0,0.55)]",
          isRed ? "text-red" : "text-gold",
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute left-3 top-3 font-display text-lg leading-none">
          <div>{rank}</div>
          <div>{SUITS[suit]}</div>
        </div>
        <div className="text-6xl opacity-90">{SUITS[suit]}</div>
        <div className="absolute bottom-3 right-3 rotate-180 font-display text-lg leading-none">
          <div>{rank}</div>
          <div>{SUITS[suit]}</div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent" />
      </motion.div>
    </div>
  );
}
