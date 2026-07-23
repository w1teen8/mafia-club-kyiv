"use client";

import { Phone } from "lucide-react";
import { InstagramIcon, TelegramIcon } from "@/components/ui/SocialIcons";
import { scrollToTarget } from "@/lib/lenis-singleton";
import settings from "@/content/settings.json";

const LINKS = [
  { label: "Головна", href: "#hero" },
  { label: "Про гру", href: "#about" },
  { label: "Формати", href: "#modes" },
  { label: "Афіша", href: "#calendar" },
  { label: "Відгуки", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакти", href: "#contacts" },
];

export function Footer() {
  function handleNav(e: React.MouseEvent, href: string) {
    e.preventDefault();
    scrollToTarget(href, -80);
  }

  return (
    <footer className="relative border-t border-white/10 bg-bg pt-20">
      <div className="container-lux">
        <div className="grid grid-cols-1 gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <a
              href="#hero"
              onClick={(e) => handleNav(e, "#hero")}
              data-cursor-hover
              className="font-display text-2xl tracking-[0.15em] text-white"
            >
              MAFIA <span className="text-gold">CLUB</span> KYIV
            </a>
            <p className="mt-4 max-w-sm text-secondary">
              {settings.brand.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={settings.contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-bg"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href={settings.contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label="Telegram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-bg"
              >
                <TelegramIcon size={17} />
              </a>
              <a
                href={settings.contacts.phoneHref}
                data-cursor-hover
                aria-label="Телефон"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-bg"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-[0.25em] text-secondary">
              Навігація
            </p>
            <ul className="mt-5 space-y-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    data-cursor-hover
                    className="text-white/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-[0.25em] text-secondary">
              Контакти
            </p>
            <ul className="mt-5 space-y-3 text-white/80">
              <li>{settings.contacts.address}</li>
              <li>
                <a href={settings.contacts.phoneHref} data-cursor-hover className="hover:text-gold">
                  {settings.contacts.phone}
                </a>
              </li>
              <li>
                <a href="#booking" onClick={(e) => handleNav(e, "#booking")} data-cursor-hover className="text-gold hover:underline">
                  Забронювати гру →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline" />

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-secondary sm:flex-row">
          <p>© {new Date().getFullYear()} Mafia Club Kyiv. Усі права захищено.</p>
          <p className="font-display italic text-secondary/80">
            Не просто гра. Психологічна битва.
          </p>
        </div>
      </div>
    </footer>
  );
}
