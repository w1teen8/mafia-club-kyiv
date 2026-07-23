"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotSpring = { damping: 30, stiffness: 500, mass: 0.4 };
  const ringSpring = { damping: 22, stiffness: 200, mass: 0.6 };
  const dotX = useSpring(x, dotSpring);
  const dotY = useSpring(y, dotSpring);
  const ringX = useSpring(x, ringSpring);
  const ringY = useSpring(y, ringSpring);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className={hidden ? "opacity-0" : "opacity-100"} style={{ transition: "opacity 0.3s" }}>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-gold"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: clicking ? 6 : 7,
          height: clicking ? 6 : 7,
          opacity: hovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-gold/70"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: hovering
            ? "0 0 30px 6px rgba(200,168,107,0.35)"
            : "0 0 14px 2px rgba(200,168,107,0.18)",
        }}
        animate={{
          width: hovering ? 56 : clicking ? 26 : 34,
          height: hovering ? 56 : clicking ? 26 : 34,
          borderColor: hovering ? "rgba(200,168,107,0.9)" : "rgba(200,168,107,0.5)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
      />
    </div>
  );
}
