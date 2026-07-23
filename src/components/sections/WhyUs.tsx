"use client";

import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const FEATURES = [
  "Професійний ведучий",
  "Атмосферна локація",
  "Нові знайомства",
  "Корпоративні заходи",
  "Закриті VIP вечори",
  "Емоції та інтриги",
  "Сучасний формат",
  "Онлайн бронювання",
];

export function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden bg-bg-secondary py-28 sm:py-40">
      <div className="container-lux grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
        <div className="relative lg:col-span-5">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-card">
            <Image
              src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1400&auto=format&fit=crop"
              alt="VIP атмосфера Mafia Club"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
            <div className="absolute inset-0 rounded-card ring-1 ring-inset ring-gold/20" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-display text-2xl italic text-white sm:text-3xl">
                &laquo;Кожен вечір — новий сюжет&raquo;
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <SectionLabel>Чому обирають нас</SectionLabel>
          </Reveal>
          <Reveal delay={0.1} className="mt-6 max-w-lg">
            <h2 className="font-display text-4xl leading-[1.1] text-white sm:text-5xl">
              Стандарт, який
              <br />
              <span className="text-gradient-gold italic">відчувається.</span>
            </h2>
          </Reveal>

          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {FEATURES.map((feature, i) => (
              <Reveal key={feature} delay={0.05 * i} y={20}>
                <li className="flex items-center gap-4 border-b border-white/[0.06] pb-5">
                  <CircleCheck className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                  <span className="text-white/90">{feature}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
