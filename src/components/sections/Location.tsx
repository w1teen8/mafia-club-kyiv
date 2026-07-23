"use client";

import { MapPin } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import settings from "@/content/settings.json";

export function Location() {
  return (
    <section id="contacts" className="relative bg-bg py-28 sm:py-40">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <SectionLabel>Локація</SectionLabel>
            </Reveal>
            <Reveal delay={0.1} className="mt-6 max-w-xl">
              <h2 className="font-display text-4xl leading-[1.1] text-white sm:text-5xl">
                Знайдіть нас
                <br />
                <span className="text-gradient-gold italic">у центрі Києва.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="flex items-center gap-3 text-secondary">
            <MapPin size={18} className="shrink-0 text-gold" />
            {settings.contacts.address}
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative mt-14 overflow-hidden rounded-card border border-border">
          <div className="aspect-[16/9] w-full sm:aspect-[21/9]">
            <iframe
              src={settings.contacts.mapEmbedUrl}
              title="Карта — Mafia Club Kyiv"
              className="h-full w-full grayscale invert-[0.92] contrast-[1.1]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/10" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="glass rounded-2xl px-5 py-4">
              <p className="font-display text-lg text-white">MAFIA CLUB KYIV</p>
              <p className="text-sm text-secondary">{settings.contacts.address}</p>
            </div>
            <Button href={settings.contacts.mapDirectionsUrl} external icon>
              Прокласти маршрут
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
