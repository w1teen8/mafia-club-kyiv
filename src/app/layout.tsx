import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Loader } from "@/components/ui/Loader";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import settings from "@/content/settings.json";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const siteUrl = "https://w1teen8.github.io/mafia-club-kyiv";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MAFIA CLUB KYIV — Психологічна гра Мафія у Києві",
    template: "%s — MAFIA CLUB KYIV",
  },
  description:
    "MAFIA CLUB KYIV — закриті ігрові вечори, психологічна гра Мафія, корпоративи, Birthday Party та Private Events у Києві. Емоції, інтриги, нові знайомства.",
  keywords: [
    "Мафія Київ",
    "гра Мафія Київ",
    "мафія клуб Київ",
    "корпоратив Мафія",
    "birthday mafia party",
    "team building Київ",
  ],
  authors: [{ name: "MAFIA CLUB KYIV" }],
  openGraph: {
    title: "MAFIA CLUB KYIV — Психологічна гра Мафія у Києві",
    description:
      "Закриті ігрові вечори, психологічна гра Мафія, корпоративи та приватні події у Києві.",
    url: siteUrl,
    siteName: "MAFIA CLUB KYIV",
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAFIA CLUB KYIV — Психологічна гра Мафія у Києві",
    description:
      "Закриті ігрові вечори, психологічна гра Мафія, корпоративи та приватні події у Києві.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    name: "MAFIA CLUB KYIV",
    description:
      "Психологічна гра Мафія, закриті ігрові вечори, корпоративи, Birthday Party та Private Events у Києві.",
    url: siteUrl,
    telephone: settings.contacts.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Київ",
      addressCountry: "UA",
    },
    sameAs: [settings.contacts.instagram, settings.contacts.telegram],
  };

  return (
    <html
      lang="uk"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-white selection:bg-gold/30 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Loader />
        <GrainOverlay />
        <CustomCursor />
        <ScrollProgress />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
