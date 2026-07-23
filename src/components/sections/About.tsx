"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["6%", "-10%"]);

  return (
    <section id="about" className="relative bg-bg py-28 sm:py-40">
      <div className="container-lux grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel>Про гру</SectionLabel>
          </Reveal>
          <Reveal delay={0.1} className="mt-6">
            <h2 className="font-display text-4xl leading-[1.1] text-white sm:text-5xl lg:text-[3.2rem]">
              Більше, ніж гра.
              <br />
              <span className="text-gradient-gold italic">Психологічний театр.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 max-w-md space-y-5 text-secondary">
            <p className="text-lg leading-relaxed">
              <span className="text-white">MAFIA CLUB KYIV</span> — це більше, ніж гра.
            </p>
            <p className="leading-relaxed">
              Це вечір, де кожна людина стає частиною історії, знайомиться з новими людьми
              та проживає справжній психологічний трилер.
            </p>
            <p className="leading-relaxed">
              Приглушене світло, атмосфера закритого клубу, гра емоцій та інтуїції — кожна
              зустріч перетворюється на власну маленьку легенду.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 hairline w-24" />
          <Reveal delay={0.35} className="mt-10 grid grid-cols-2 gap-8">
            <div>
              <p className="font-display text-3xl text-gold">18+</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-secondary">
                Формат для дорослих
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-gold">3 год</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-secondary">
                Середня тривалість вечора
              </p>
            </div>
          </Reveal>
        </div>

        <div ref={ref} className="relative lg:col-span-7">
          <div className="relative grid grid-cols-12 gap-4 sm:gap-6">
            <motion.div
              style={{ y: y1 }}
              className="relative col-span-8 col-start-1 row-start-1 aspect-[4/5] overflow-hidden rounded-card"
            >
              <div className="absolute inset-0 z-10 rounded-card ring-1 ring-inset ring-gold/20" />
              <Image
                src="https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1400&auto=format&fit=crop"
                alt="Атмосфера вечора в Mafia Club"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 80vw"
              />
            </motion.div>

            <motion.div
              style={{ y: y2 }}
              className="relative col-span-7 col-start-6 row-start-1 mt-24 aspect-[3/4] overflow-hidden rounded-card sm:mt-36"
            >
              <div className="absolute inset-0 z-10 rounded-card ring-1 ring-inset ring-gold/20" />
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop"
                alt="Гравці обговорюють гру"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 35vw, 60vw"
              />
            </motion.div>

            <div className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 border-l border-t border-gold/30 sm:h-32 sm:w-32" />
            <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 border-b border-r border-gold/30 sm:h-32 sm:w-32" />
          </div>
        </div>
      </div>
    </section>
  );
}
