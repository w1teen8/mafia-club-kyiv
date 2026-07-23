"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import reviews from "@/content/reviews.json";

export function Reviews() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  function go(next: number) {
    setDirection(next > index || (index === reviews.length - 1 && next === 0) ? 1 : -1);
    setIndex((next + reviews.length) % reviews.length);
  }

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(id);
  }, [paused]);

  const review = reviews[index];

  return (
    <section id="reviews" className="relative overflow-hidden bg-bg py-28 sm:py-40">
      <div className="container-lux">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <SectionLabel className="justify-center">Відгуки</SectionLabel>
          </Reveal>
          <Reveal delay={0.1} className="mt-6">
            <h2 className="font-display text-4xl leading-[1.1] text-white sm:text-5xl">
              Історії, що
              <span className="text-gradient-gold italic"> залишаються.</span>
            </h2>
          </Reveal>
        </div>

        <div
          className="relative mx-auto mt-16 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="mx-auto mb-6 h-10 w-10 text-gold/40" strokeWidth={1} />

          <div className="relative min-h-[280px] sm:min-h-[240px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={review.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass absolute inset-0 flex flex-col items-center rounded-card p-8 text-center sm:p-12"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-display text-xl italic leading-relaxed text-white sm:text-2xl">
                  &laquo;{review.text}&raquo;
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-gold/40">
                    <Image src={review.photo} alt={review.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="text-left">
                    <p className="font-body text-sm text-white">{review.name}</p>
                    <p className="text-xs text-secondary">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              data-cursor-hover
              onClick={() => go(index - 1)}
              aria-label="Попередній відгук"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-bg"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-2">
              {reviews.map((r, i) => (
                <button
                  key={r.id}
                  data-cursor-hover
                  aria-label={`Відгук ${i + 1}`}
                  onClick={() => go(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-8 bg-gold" : "w-1.5 bg-white/20 hover:bg-white/40",
                  )}
                />
              ))}
            </div>

            <button
              data-cursor-hover
              onClick={() => go(index + 1)}
              aria-label="Наступний відгук"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-bg"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
