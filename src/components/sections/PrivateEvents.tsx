"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { scrollToTarget } from "@/lib/lenis-singleton";

const CATEGORIES = [
  {
    id: "corporate",
    title: "Корпоративи",
    text: "Формат, що зближує команду сильніше за будь-який тренінг.",
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "birthday",
    title: "Birthday Party",
    text: "Святкування, яке гості будуть згадувати ще довго після вечірки.",
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "teambuilding",
    title: "Team Building",
    text: "Довіра, комунікація та лідерство — через живу гру, а не презентації.",
    image: "https://images.unsplash.com/photo-1541278107931-e006523892df?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "vip",
    title: "VIP Events",
    text: "Повністю закритий вечір лише для вас та ваших гостей.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop",
  },
];

export function PrivateEvents() {
  return (
    <section id="private" className="relative bg-bg py-28 sm:py-40">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <SectionLabel>Private Events</SectionLabel>
            </Reveal>
            <Reveal delay={0.1} className="mt-6 max-w-xl">
              <h2 className="font-display text-4xl leading-[1.1] text-white sm:text-5xl">
                Ваша подія.
                <br />
                <span className="text-gradient-gold italic">Наші правила гри.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="max-w-sm text-secondary">
            Повністю закриті події під ваш формат: локація, сценарій та атмосфера — за
            вашим запитом.
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.id} delay={(i % 2) * 0.1}>
              <button
                data-cursor-hover
                onClick={() => scrollToTarget("#booking", -80)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-card text-left sm:aspect-[16/11]"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent transition-opacity duration-500 group-hover:from-bg/95" />
                <div className="absolute inset-0 rounded-card ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-gold/40" />

                <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-2xl text-white sm:text-3xl">
                      {cat.title}
                    </h3>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:rotate-45 group-hover:bg-gold group-hover:text-bg">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                  <p className="mt-2 max-w-xs translate-y-1 text-sm text-secondary opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:max-w-sm">
                    {cat.text}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
