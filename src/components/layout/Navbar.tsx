"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { scrollToTarget } from "@/lib/lenis-singleton";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Головна", href: "#hero" },
  { label: "Про гру", href: "#about" },
  { label: "Формати", href: "#modes" },
  { label: "Афіша", href: "#calendar" },
  { label: "Відгуки", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакти", href: "#contacts" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("loading-lock", open);
    return () => document.documentElement.classList.remove("loading-lock");
  }, [open]);

  function handleNav(e: React.MouseEvent, href: string) {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(href, -80);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[250] transition-all duration-500",
        scrolled ? "bg-bg/80 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className={cn("hairline absolute inset-x-0 bottom-0 opacity-0 transition-opacity duration-500", scrolled && "opacity-100")} />
      <nav className="container-lux flex h-20 items-center justify-between sm:h-24">
        <a
          href="#hero"
          onClick={(e) => handleNav(e, "#hero")}
          data-cursor-hover
          className="font-display text-lg tracking-[0.15em] text-white sm:text-xl"
        >
          MAFIA <span className="text-gold">CLUB</span> KYIV
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                data-cursor-hover
                className="font-body text-[13px] uppercase tracking-[0.18em] text-secondary transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="#booking" variant="primary" className="!px-6 !py-3 !text-xs">
            Забронювати
          </Button>
        </div>

        <Magnetic className="lg:hidden">
          <button
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            onClick={() => setOpen((v) => !v)}
            data-cursor-hover
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </Magnetic>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden bg-bg/98 backdrop-blur-2xl lg:hidden"
          >
            <ul className="container-lux flex flex-col gap-2 pt-10">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                  className="border-b border-white/[0.06] py-4"
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="font-display text-3xl text-white transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + LINKS.length * 0.06, duration: 0.5 }}
                className="pt-8"
              >
                <Button href="#booking" onClick={() => setOpen(false)} className="w-full justify-center">
                  Забронювати гру
                </Button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
