import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { GameModes } from "@/components/sections/GameModes";
import { WhyUs } from "@/components/sections/WhyUs";
import { EventCalendar } from "@/components/sections/EventCalendar";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { PrivateEvents } from "@/components/sections/PrivateEvents";
import { Booking } from "@/components/sections/Booking";
import { Location } from "@/components/sections/Location";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { StickyMobileCTA } from "@/components/ui/StickyMobileCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <HowItWorks />
        <GameModes />
        <WhyUs />
        <EventCalendar />
        <Reviews />
        <PrivateEvents />
        <FAQ />
        <Booking />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
