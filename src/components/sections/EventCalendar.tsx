"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import events from "@/content/events.json";

function formatDay(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString("uk-UA", { day: "2-digit" }),
    month: d.toLocaleDateString("uk-UA", { month: "short" }).replace(".", ""),
    weekday: d.toLocaleDateString("uk-UA", { weekday: "short" }),
    full: d.toLocaleDateString("uk-UA", { day: "numeric", month: "long" }),
  };
}

export function EventCalendar() {
  const [filter, setFilter] = useState<string>("all");

  const formats = useMemo(
    () => ["all", ...Array.from(new Set(events.map((e) => e.format)))],
    [],
  );

  const filtered = useMemo(
    () => (filter === "all" ? events : events.filter((e) => e.format === filter)),
    [filter],
  );

  return (
    <section id="calendar" className="relative bg-bg py-28 sm:py-40">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <SectionLabel>Афіша</SectionLabel>
            </Reveal>
            <Reveal delay={0.1} className="mt-6 max-w-xl">
              <h2 className="font-display text-4xl leading-[1.1] text-white sm:text-5xl">
                Найближчі
                <br />
                <span className="text-gradient-gold italic">ігрові вечори.</span>
              </h2>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
          {formats.map((f) => (
            <button
              key={f}
              data-cursor-hover
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-5 py-2.5 font-body text-xs uppercase tracking-[0.15em] transition-colors duration-300",
                filter === f
                  ? "border-gold bg-gold text-bg"
                  : "border-border text-secondary hover:border-gold/50 hover:text-white",
              )}
            >
              {f === "all" ? "Усі формати" : f}
            </button>
          ))}
        </Reveal>

        <div className="mt-10 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((event) => {
              const d = formatDay(event.date);
              const seatsLeft = event.seatsTotal - event.seatsTaken;
              const isFull = seatsLeft <= 0;
              const isAlmostFull = !isFull && seatsLeft <= 3;
              const pct = Math.min(100, Math.round((event.seatsTaken / event.seatsTotal) * 100));

              return (
                <motion.article
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="glass group flex flex-col gap-6 rounded-card p-6 transition-colors duration-300 hover:border-gold/30 sm:flex-row sm:items-center sm:p-7"
                >
                  <div className="flex shrink-0 items-center gap-5 sm:w-40">
                    <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl border border-gold/30 bg-bg-secondary">
                      <span className="font-display text-xl text-gold">{d.day}</span>
                      <span className="text-[10px] uppercase tracking-widest text-secondary">
                        {d.month}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-2 inline-block rounded-full border border-gold/30 px-3 py-1 font-body text-[10px] uppercase tracking-[0.2em] text-gold">
                      {event.format}
                    </div>
                    <h3 className="font-display text-xl text-white sm:text-2xl">
                      {event.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-secondary">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={14} className="text-gold" /> {d.full}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} className="text-gold" /> {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-gold" /> {event.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-3 sm:w-56 sm:items-end">
                    <div className="flex w-full items-center justify-between gap-2 text-xs text-secondary sm:justify-end">
                      <span className="flex items-center gap-1.5">
                        <Users size={13} />{" "}
                        {isFull ? "Місць немає" : `${seatsLeft} вільних місць`}
                      </span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/10 sm:w-40">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          isFull
                            ? "bg-red"
                            : isAlmostFull
                              ? "bg-gold"
                              : "bg-gradient-to-r from-gold-dark to-gold",
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <Button
                      href={isFull ? undefined : "#booking"}
                      variant={isFull ? "ghost" : "outline"}
                      icon={false}
                      className={cn("!px-5 !py-2.5 !text-[11px]", isFull && "pointer-events-none opacity-40")}
                    >
                      {isFull ? "Немає місць" : "Забронювати"}
                    </Button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
