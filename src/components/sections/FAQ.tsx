"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import faq from "@/content/faq.json";

export function FAQ() {
  const [open, setOpen] = useState<string | null>(faq[0]?.id ?? null);

  return (
    <section id="faq" className="relative bg-bg-secondary py-28 sm:py-40">
      <div className="container-lux grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <SectionLabel>FAQ</SectionLabel>
            </Reveal>
            <Reveal delay={0.1} className="mt-6">
              <h2 className="font-display text-4xl leading-[1.1] text-white sm:text-5xl">
                Питання,
                <br />
                що <span className="text-gradient-gold italic">хвилюють.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="mt-6 max-w-sm text-secondary">
              Не знайшли відповіді? Напишіть нам напряму в Instagram або Telegram.
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {faq.map((item, i) => {
            const isOpen = open === item.id;
            return (
              <Reveal key={item.id} delay={i * 0.04} y={16}>
                <div className="border-b border-white/10">
                  <button
                    data-cursor-hover
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={cn(
                        "font-display text-lg transition-colors duration-300 sm:text-xl",
                        isOpen ? "text-gold" : "text-white",
                      )}
                    >
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold"
                    >
                      <Plus size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-6 leading-relaxed text-secondary">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
