"use client";

import { motion, type Variants } from "framer-motion";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  once = true,
  duration = 0.9,
}: {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.12,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  // The whileInView trigger lives on this untransformed outer element rather
  // than on the translated children below, so ancestor overflow-hidden masks
  // never clip the observed element out of the intersection rect.
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const line: Variants = {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {lines.map((text, i) => (
        <span key={i} className="reveal-mask block">
          <motion.span variants={line} className={lineClassName ?? "block"}>
            {text}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
