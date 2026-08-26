import type { Metadata } from "next";
import { HomeScrollAnimations } from "./HomeScrollAnimations";

// Home Components
import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { MenuHighlights } from "@/components/home/MenuHighlights";
import { AmbienceSection } from "@/components/home/AmbienceSection";

import { ReviewsPreview } from "@/components/home/ReviewsPreview";
import { ContactPreview } from "@/components/home/ContactPreview";

export const metadata: Metadata = {
  title: "Gandharva Hotel — Pure Veg Restaurant & Banquet",
  description: "Experience the taste of tradition at Gandharva Hotel in Latur.",
};

export default function HomePage() {
  return (
    <>
      <HomeScrollAnimations />
      <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>
        <Hero />
        <AboutPreview />
        <MenuHighlights />
        <AmbienceSection />
        
        <ReviewsPreview />
        <ContactPreview />
      </div>
    </>
  );
}
