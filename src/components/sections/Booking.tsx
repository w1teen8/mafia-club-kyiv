"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Phone } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { InstagramIcon, TelegramIcon } from "@/components/ui/SocialIcons";
import { InlineCalendar } from "@/components/ui/InlineCalendar";
import { cn } from "@/lib/utils";
import settings from "@/content/settings.json";

const EVENT_TYPES = [
  "Класична гра",
  "Fast Mafia",
  "VIP вечір",
  "Корпоратив",
  "Birthday Party",
  "Private Event",
  "Team Building",
];

const TIME_SLOTS = [
  "10:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00",
  "19:00",
  "19:30",
  "20:00",
  "21:00",
];

type Status = "idle" | "loading" | "success";

function formatDate(date: Date) {
  return date.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });
}

export function Booking() {
  const [status, setStatus] = useState<Status>("idle");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [scheduleError, setScheduleError] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setScheduleError(true);
      return;
    }
    setScheduleError(false);
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1400);
  }

  return (
    <section id="booking" className="relative overflow-hidden bg-bg-secondary py-28 sm:py-40">
      <div className="container-lux grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <SectionLabel>Бронювання</SectionLabel>
            </Reveal>
            <Reveal delay={0.1} className="mt-6">
              <h2 className="font-display text-4xl leading-[1.1] text-white sm:text-5xl">
                Займіть
                <br />
                <span className="text-gradient-gold italic">своє місце.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="mt-6 max-w-sm text-secondary">
              Заповніть форму, і наш менеджер зв&rsquo;яжеться з вами протягом кількох годин
              для підтвердження бронювання.
            </Reveal>

            <Reveal delay={0.3} className="mt-10 space-y-4">
              <a
                href={settings.contacts.phoneHref}
                data-cursor-hover
                className="flex items-center gap-3 text-white transition-colors hover:text-gold"
              >
                <Phone size={16} className="text-gold" /> {settings.contacts.phone}
              </a>
              <a
                href={settings.contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="flex items-center gap-3 text-white transition-colors hover:text-gold"
              >
                <InstagramIcon size={16} className="text-gold" /> {settings.contacts.instagramHandle}
              </a>
              <a
                href={settings.contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="flex items-center gap-3 text-white transition-colors hover:text-gold"
              >
                <TelegramIcon size={16} className="text-gold" /> {settings.contacts.telegramHandle}
              </a>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal className="glass relative overflow-hidden rounded-card p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle2 className="mb-5 h-14 w-14 text-gold" strokeWidth={1.2} />
                  <h3 className="font-display text-2xl text-white sm:text-3xl">
                    Заявку надіслано
                  </h3>
                  <p className="mt-3 max-w-sm text-secondary">
                    Дякуємо! Ми зв&rsquo;яжемось з вами найближчим часом для підтвердження
                    бронювання.
                  </p>
                  <button
                    data-cursor-hover
                    onClick={() => {
                      setStatus("idle");
                      setSelectedDate(null);
                      setSelectedTime(null);
                    }}
                    className="mt-8 font-body text-xs uppercase tracking-[0.2em] text-gold underline underline-offset-4"
                  >
                    Надіслати ще одну заявку
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >
                  <Field label="Ім'я" name="name" placeholder="Ваше ім'я" required />
                  <Field label="Телефон" name="phone" type="tel" placeholder="+380 __ ___ __ __" required />
                  <Field label="Telegram" name="telegram" placeholder="@username" />
                  <Field label="Instagram" name="instagram" placeholder="@username" />

                  <label className="flex flex-col gap-2">
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-secondary">
                      Кількість гостей
                    </span>
                    <input
                      type="number"
                      name="guests"
                      min={1}
                      placeholder="Наприклад, 6"
                      className="rounded-xl border border-border bg-white/[0.03] px-4 py-3.5 text-white outline-none transition-colors placeholder:text-secondary/50 focus:border-gold"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-secondary">
                      Тип події
                      <span className="text-gold"> *</span>
                    </span>
                    <select
                      name="eventType"
                      required
                      defaultValue=""
                      className="rounded-xl border border-border bg-white/[0.03] px-4 py-3.5 text-white outline-none transition-colors focus:border-gold [&>option]:bg-bg-secondary"
                    >
                      <option value="" disabled>
                        Оберіть формат
                      </option>
                      {EVENT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-secondary">
                      Оберіть дату
                      <span className="text-gold"> *</span>
                    </span>
                    <InlineCalendar
                      selected={selectedDate}
                      onSelect={(d) => {
                        setSelectedDate(d);
                        setScheduleError(false);
                      }}
                    />
                    <input
                      type="hidden"
                      name="date"
                      value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ""}
                    />
                    {selectedDate && (
                      <p className="pt-1 font-body text-xs capitalize text-gold">
                        {formatDate(selectedDate)}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-secondary">
                      Оберіть час
                      <span className="text-gold"> *</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          data-cursor-hover
                          onClick={() => {
                            setSelectedTime(slot);
                            setScheduleError(false);
                          }}
                          className={cn(
                            "rounded-full border px-4 py-2 font-body text-sm transition-colors duration-200",
                            selectedTime === slot
                              ? "border-gold bg-gold text-bg"
                              : "border-border text-white/80 hover:border-gold/50 hover:text-gold",
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="time" value={selectedTime ?? ""} />
                    {scheduleError && (
                      <p className="pt-1 font-body text-xs text-red">
                        Оберіть дату та час гри
                      </p>
                    )}
                  </div>

                  <label className="flex flex-col gap-2 sm:col-span-2">
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-secondary">
                      Коментар
                    </span>
                    <textarea
                      name="comment"
                      rows={4}
                      placeholder="Побажання щодо вечора..."
                      className="resize-none rounded-xl border border-border bg-white/[0.03] px-4 py-3.5 text-white outline-none transition-colors placeholder:text-secondary/50 focus:border-gold"
                    />
                  </label>

                  <div className="sm:col-span-2">
                    <Button type="submit" className="w-full justify-center" icon={status !== "loading"}>
                      {status === "loading" ? (
                        <span className="flex items-center gap-2">
                          <Loader2 size={16} className="animate-spin" /> Надсилаємо...
                        </span>
                      ) : (
                        "Забронювати гру"
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-body text-xs uppercase tracking-[0.2em] text-secondary">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        min={min}
        className="rounded-xl border border-border bg-white/[0.03] px-4 py-3.5 text-white outline-none transition-colors placeholder:text-secondary/50 focus:border-gold"
      />
    </label>
  );
}
