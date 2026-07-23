"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { RevealLines, Reveal } from "@/components/ui/Reveal";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { Spotlight } from "@/components/ui/Spotlight";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import settings from "@/content/settings.json";

const HEADLINE_LINES = ["Психологічна", "битва,", "де кожен", "приховує", "свою роль."];

const TAGS = ["Private Events", "Корпоративи", "Birthday Party"];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.3]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-bg"
    >
      <motion.div className="absolute inset-0" style={{ scale: imgScale, y: imgY }}>
        <Image
          src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=2400&auto=format&fit=crop"
          alt="Атмосфера Mafia Club Kyiv"
          fill
          priority
          className="object-cover object-center opacity-[0.55]"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/70 to-bg" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-bg/60" />

      <AmbientBackground />
      <Spotlight size={800} opacity={0.1} />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="container-lux relative z-10 pb-16 pt-40 sm:pb-20"
      >
        <Reveal delay={0.1}>
          <p className="mb-6 font-display text-xl italic text-secondary sm:text-2xl">
            Не просто гра.
          </p>
        </Reveal>

        <h1 className="font-display text-[15vw] font-medium leading-[0.98] tracking-tight text-white sm:text-[9vw] lg:text-[7.2vw]">
          <RevealLines lines={HEADLINE_LINES} delay={0.25} stagger={0.09} />
        </h1>

        <Reveal delay={0.9} className="mt-8 max-w-xl">
          <p className="text-base leading-relaxed text-secondary sm:text-lg">
            <span className="text-gold">MAFIA CLUB KYIV</span> — місце, де знайомляться,
            сперечаються, сміються та переживають найемоційніші вечори.
          </p>
        </Reveal>

        <Reveal delay={1.05} className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="#booking" variant="primary">
            Забронювати гру
          </Button>
          <Button href="#calendar" variant="outline" icon={false}>
            Дивитися афішу
          </Button>
        </Reveal>

        <Reveal delay={1.2} className="mt-14 flex flex-wrap items-end gap-x-12 gap-y-8 border-t border-white/10 pt-10">
          {settings.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-4xl text-gradient-gold sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 font-body text-xs uppercase tracking-[0.25em] text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
          <div className="ml-auto hidden flex-wrap gap-2 sm:flex">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="glass rounded-full px-4 py-2 font-body text-[11px] uppercase tracking-[0.15em] text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-body text-[10px] uppercase tracking-[0.4em] text-secondary">
            Scroll
          </span>
          <div className="relative h-12 w-px overflow-hidden bg-white/15">
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-gold to-transparent"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
