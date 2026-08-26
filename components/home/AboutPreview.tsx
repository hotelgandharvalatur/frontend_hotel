"use client";

import Link from "next/link";
import { Leaf, ChefHat, HeartHandshake, GlassWater, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: <Leaf size={29} style={{ color: "#D49A2A" }} />,
    title: "Pure Vegetarian",
    desc: "100% pure veg ingredients and hygienic cooking.",
  },
  {
    icon: <ChefHat size={29} style={{ color: "#D49A2A" }} />,
    title: "Authentic Recipes",
    desc: "Traditional recipes with rich flavors and aroma.",
  },
  {
    icon: <HeartHandshake size={29} style={{ color: "#D49A2A" }} />,
    title: "Warm Hospitality",
    desc: "Because for us, you are family.",
  },
  {
    icon: <GlassWater size={29} style={{ color: "#D49A2A" }} />,
    title: "Perfect for Every Occasion",
    desc: "Dining, parties, banquets & more.",
  },
];

export function AboutPreview() {
  return (
    <section className="py-[90px] lg:py-[70px]" style={{ backgroundColor: "#F5E9D2" }}>
      <div className="container-wide mx-auto flex flex-col lg:flex-row gap-14 lg:gap-20 items-center">

        {/* Left Column - Text */}
        <div className="lg:w-[38%] flex flex-col justify-center">
          <p className="mb-3 font-bold tracking-widest text-xs reveal" style={{ color: "#A83216" }}>
            ABOUT US
          </p>
          <h2 className="text-[28px] lg:text-[32px] font-display font-semibold leading-[1.25] mb-4 reveal stagger-1" style={{ color: "#24130A", fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>
            A Tradition of Taste and Togetherness
          </h2>
          <div className="w-14 h-[3px] mb-5 reveal stagger-2" style={{ backgroundColor: "#D49A2A" }} />
          <p className="text-[14px] leading-[1.7] mb-6 reveal stagger-3" style={{ color: "rgba(36, 19, 10, 0.7)" }}>
            Gandharva Hotel is a pure veg restaurant in Latur serving authentic Maharashtrian, North Indian,
            Chinese and South Indian cuisines.
          </p>
          <p className="text-[14px] leading-[1.7] mb-8 reveal stagger-3" style={{ color: "rgba(36, 19, 10, 0.7)" }}>
            From everyday dining to life&apos;s biggest celebrations, we bring people together with delicious food,
            warmth and unforgettable experiences.
          </p>
          <Link
            href="/about"
            className="self-start inline-flex items-center gap-2 text-[15px] font-semibold px-8 py-[14px] rounded-[7px] transition-all duration-200 reveal stagger-4"
            style={{ backgroundColor: "#A83216", color: "#FFF7E8" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#8F2A12";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#A83216";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Know More About Us
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Right Column - Features in a row, divided by thin lines */}
        <div className="lg:w-[62%] grid grid-cols-2 sm:grid-cols-4 gap-y-10 reveal stagger-3">
          {FEATURES.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center px-6 py-4"
              style={{
                borderLeft: idx !== 0 ? "1px solid rgba(36, 19, 10, 0.12)" : "none",
              }}
            >
              <div
                className="w-[70px] h-[70px] rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(212, 154, 42, 0.12)" }}
              >
                {item.icon}
              </div>
              <h3 className="text-[16.5px] font-display font-semibold mb-2 leading-snug" style={{ color: "#24130A" }}>
                {item.title}
              </h3>
              <p className="text-[14.5px] leading-[1.6]" style={{ color: "rgba(36, 19, 10, 0.65)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}