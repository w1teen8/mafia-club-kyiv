"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { Spotlight } from "@/components/ui/Spotlight";
import { PlayingCard } from "@/components/ui/PlayingCard";

const LINES = ["Чи готовий", "ти дізнатися,", "кому можна", "довіряти?"];

export function FinalCTA() {
  return (
    <section id="final" className="relative overflow-hidden bg-bg py-32 sm:py-48">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2000&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/90 to-bg" />
      <AmbientBackground />
      <Spotlight size={900} opacity={0.12} />

      <motion.div
        initial={{ opacity: 0, rotate: -18, x: -40 }}
        whileInView={{ opacity: 0.9, rotate: -14, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute -left-10 top-1/2 hidden w-40 -translate-y-1/2 lg:block xl:-left-4 xl:w-48"
      >
        <PlayingCard suit="spade" rank="A" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: 18, x: 40 }}
        whileInView={{ opacity: 0.9, rotate: 14, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute -right-10 top-1/2 hidden w-40 -translate-y-1/2 lg:block xl:-right-4 xl:w-48"
      >
        <PlayingCard suit="heart" rank="K" />
      </motion.div>

      <div className="container-lux relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <p className="mb-6 font-body text-xs uppercase tracking-[0.5em] text-gold">
            Mafia Club Kyiv
          </p>
        </Reveal>

        <h2 className="font-display text-[clamp(2.5rem,7.5vw,5.75rem)] font-medium leading-[0.98] text-white">
          <RevealLines lines={LINES} delay={0.15} stagger={0.1} />
        </h2>

        <Reveal delay={0.7} className="mt-12">
          <Button href="#booking" className="!px-10 !py-5 !text-base">
            Забронювати гру
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
