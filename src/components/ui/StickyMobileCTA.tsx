"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const bookingEl = document.getElementById("booking");
      const bookingTop = bookingEl ? bookingEl.getBoundingClientRect().top + window.scrollY : Infinity;
      const y = window.scrollY;
      setVisible(y > window.innerHeight * 0.9 && y < bookingTop - 200);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[240] px-4 pb-4 lg:hidden">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto"
          >
            <div className="glass rounded-full p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <Button href="#booking" className="w-full justify-center !py-3.5">
                Забронювати гру
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
