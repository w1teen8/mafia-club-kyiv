"use client";

import { Briefcase, Cake, Gem, Lock, Spade, Users, Zap, type LucideIcon } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import prices from "@/content/prices.json";

const ICONS: Record<string, LucideIcon> = {
  spade: Spade,
  zap: Zap,
  gem: Gem,
  briefcase: Briefcase,
  lock: Lock,
  cake: Cake,
  users: Users,
};

export function GameModes() {
  return (
    <section id="modes" className="relative bg-bg py-28 sm:py-40">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <SectionLabel>Формати</SectionLabel>
            </Reveal>
            <Reveal delay={0.1} className="mt-6 max-w-xl">
              <h2 className="font-display text-4xl leading-[1.1] text-white sm:text-5xl">
                Оберіть свій формат
                <br />
                <span className="text-gradient-gold italic">вечора.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="max-w-sm text-secondary">
            Від класичної гри до закритого VIP-вечора — кожен формат має власний ритм та
            рівень інтриги.
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {prices.map((mode, i) => {
            const Icon = ICONS[mode.icon] ?? Spade;
            return (
              <Reveal key={mode.id} delay={(i % 3) * 0.08}>
                <article
                  data-cursor-hover
                  className="group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:bg-white/[0.06]"
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/0 blur-3xl transition-all duration-500 group-hover:bg-gold/10"
                    aria-hidden
                  />
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-bg">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  <h3 className="font-display text-2xl text-white">{mode.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-secondary">
                    {mode.description}
                  </p>

                  <div className="mt-8 space-y-2 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.15em] text-secondary">
                    <div className="flex items-center justify-between">
                      <span>Тривалість</span>
                      <span className="text-white">{mode.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Учасники</span>
                      <span className="text-white">{mode.participants}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Вартість</span>
                      <span className="text-gold">{mode.price}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.3} className="mt-14 flex justify-center">
          <Button href="#booking">Забронювати гру</Button>
        </Reveal>
      </div>
    </section>
  );
}
