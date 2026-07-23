"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import galleryData from "@/content/gallery.json";

const CATEGORIES = [
  "all",
  ...Array.from(new Set(galleryData.map((g) => g.category))),
];

const CATEGORY_LABELS: Record<string, string> = {
  all: "Усі",
  ...Object.fromEntries(galleryData.map((g) => [g.category, g.categoryLabel])),
};

const SIZE_CLASS: Record<string, string> = {
  small: "aspect-[4/5]",
  medium: "aspect-[3/4]",
  large: "aspect-[3/4] sm:aspect-[4/6]",
};

export function Gallery() {
  const [category, setCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (category === "all" ? galleryData : galleryData.filter((g) => g.category === category)),
    [category],
  );

  const active = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  useEffect(() => {
    document.documentElement.classList.toggle("loading-lock", lightboxIndex !== null);
    return () => document.documentElement.classList.remove("loading-lock");
  }, [lightboxIndex]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, filtered.length]);

  return (
    <section id="gallery" className="relative bg-bg-secondary py-28 sm:py-40">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <SectionLabel>Галерея</SectionLabel>
            </Reveal>
            <Reveal delay={0.1} className="mt-6 max-w-xl">
              <h2 className="font-display text-4xl leading-[1.1] text-white sm:text-5xl">
                Атмосфера, яку
                <br />
                <span className="text-gradient-gold italic">треба відчути.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                data-cursor-hover
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-4 py-2 font-body text-[11px] uppercase tracking-[0.15em] transition-colors duration-300",
                  category === c
                    ? "border-gold bg-gold text-bg"
                    : "border-border text-secondary hover:border-gold/50 hover:text-white",
                )}
              >
                {CATEGORY_LABELS[c]}
              </button>
            ))}
          </Reveal>
        </div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.button
                key={item.id}
                layout
                data-cursor-hover
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                onClick={() => setLightboxIndex(i)}
                className={cn(
                  "group relative mb-4 block w-full overflow-hidden rounded-card break-inside-avoid",
                  SIZE_CLASS[item.size] ?? "aspect-[4/5]",
                )}
              >
                <Image
                  src={`${item.src}?q=80&w=900&auto=format&fit=crop`}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-4 bottom-4 flex translate-y-3 items-center justify-between opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-body text-[11px] uppercase tracking-[0.15em] text-white">
                    {item.categoryLabel}
                  </span>
                  <Expand size={16} className="text-gold" />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-10"
          >
            <button
              data-cursor-hover
              onClick={() => setLightboxIndex(null)}
              aria-label="Закрити"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
            >
              <X size={18} />
            </button>

            <button
              data-cursor-hover
              onClick={() => setLightboxIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))}
              aria-label="Попереднє фото"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold sm:left-6"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              data-cursor-hover
              onClick={() => setLightboxIndex((i) => (i === null ? i : (i + 1) % filtered.length))}
              aria-label="Наступне фото"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold sm:right-6"
            >
              <ChevronRight size={20} />
            </button>

            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] w-full max-w-2xl overflow-hidden rounded-card sm:aspect-[3/4]"
            >
              <Image
                src={`${active.src}?q=85&w=1400&auto=format&fit=crop`}
                alt={active.alt}
                fill
                className="object-cover"
                sizes="90vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-gold">
                  {active.categoryLabel}
                </p>
                <p className="mt-1 text-white">{active.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
