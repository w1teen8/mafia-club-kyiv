"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Реєстрація",
    text: "Оберіть подію, забронюйте місце та отримайте підтвердження участі.",
  },
  {
    n: "02",
    title: "Отримання ролі",
    text: "Кожен гравець таємно дізнається свою роль: мирний житель чи член мафії.",
  },
  {
    n: "03",
    title: "Денне обговорення",
    text: "Гравці аналізують поведінку одне одного, сперечаються та голосують.",
  },
  {
    n: "04",
    title: "Нічні дії",
    text: "Мафія діє таємно — рішення, прийняті вночі, змінюють хід усієї гри.",
  },
  {
    n: "05",
    title: "Перемога мирних або мафії",
    text: "Гра завершується, коли одна зі сторін здобуває остаточну перевагу.",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how" className="relative bg-bg-secondary py-28 sm:py-40">
      <div className="container-lux grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <SectionLabel>Як проходить гра</SectionLabel>
            </Reveal>
            <Reveal delay={0.1} className="mt-6">
              <h2 className="font-display text-4xl leading-[1.1] text-white sm:text-5xl">
                П&rsquo;ять кроків
                <br />
                до <span className="text-gradient-gold italic">розкриття</span> ролей.
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="mt-6 max-w-sm text-secondary">
              Кожна гра — окрема історія. Ведучий тримає темп, а результат вирішують лише
              ваші рішення.
            </Reveal>
          </div>
        </div>

        <div ref={ref} className="relative lg:col-span-7 lg:col-start-6">
          <div className="absolute left-[27px] top-2 bottom-2 w-px bg-white/10 sm:left-[31px]" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[27px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-gold via-gold-dark to-transparent sm:left-[31px]"
          />

          <ul className="space-y-14 sm:space-y-16">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.05} y={30}>
                <li className="relative flex gap-6 pl-0 sm:gap-8">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-bg-secondary font-display text-lg text-gold sm:h-16 sm:w-16 sm:text-xl">
                    {step.n}
                  </span>
                  <div className="pt-2">
                    <h3 className="font-display text-2xl text-white sm:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-md text-secondary">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
