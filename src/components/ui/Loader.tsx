"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("loading-lock");
    let raf = 0;
    const start = performance.now();
    const duration = 2200;

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setVisible(false);
          document.documentElement.classList.remove("loading-lock");
        }, 450);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-bg"
          exit={{ opacity: 0, filter: "blur(28px)", scale: 1.08 }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-gold/10 blur-[130px]"
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-red/20 blur-[130px]"
            animate={{ opacity: [0.12, 0.35, 0.12], scale: [1, 1.2, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />

          <div className="relative mb-8" style={{ perspective: 800 }}>
            <motion.div
              className="flex h-20 w-14 items-center justify-center rounded-[6px] border border-gold/40 bg-gradient-to-b from-[#141414] to-[#0b0b0b] text-gold shadow-[0_0_40px_rgba(200,168,107,0.18)]"
              animate={{ rotateY: [0, 180, 360] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <SpadeGlyph />
            </motion.div>
          </div>

          <motion.p
            className="font-display text-xs uppercase tracking-[0.55em] text-secondary sm:text-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Mafia Club Kyiv
          </motion.p>

          <div className="mt-10 flex items-center gap-4">
            <span className="text-gradient-gold font-display text-3xl tabular-nums sm:text-4xl">
              {progress}%
            </span>
          </div>

          <div className="mt-6 h-px w-52 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SpadeGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C9 7 3 10.5 3 15a5 5 0 0 0 8.5 3.6c-.4 1.6-1.3 2.8-2.8 3.9h6.6c-1.5-1.1-2.4-2.3-2.8-3.9A5 5 0 0 0 21 15c0-4.5-6-8-9-13Z" />
    </svg>
  );
}
