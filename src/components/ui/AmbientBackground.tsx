"use client";

import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: (i * 37) % 100,
  size: 2 + ((i * 13) % 4),
  duration: 10 + ((i * 7) % 12),
  delay: (i % 6) * 1.3,
}));

export function AmbientBackground({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="absolute left-[8%] top-[12%] h-[420px] w-[420px] rounded-full bg-gold/[0.07] blur-[120px]"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[6%] top-[35%] h-[360px] w-[360px] rounded-full bg-red/[0.09] blur-[130px]"
        animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.18, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[35%] h-[300px] w-[300px] rounded-full bg-gold-dark/[0.1] blur-[110px]"
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gold/40"
          style={{
            left: `${p.left}%`,
            bottom: "-5%",
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["0%", "-115vh"],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
