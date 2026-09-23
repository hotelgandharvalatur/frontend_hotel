"use client";

import Link from "next/link";
import Image from "next/image";
import { UtensilsCrossed, CalendarDays } from "lucide-react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100dvh-64px)] flex flex-col justify-center items-start overflow-hidden pt-[80px] pb-[70px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={getCloudinaryUrl("hotel-gandharva/hero/IMG_2740")}
          alt="Gandharva Hotel Interior"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>

      {/* Overlay to ensure text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(36, 19, 10, 0.85) 0%, rgba(36, 19, 10, 0.45) 50%, rgba(36, 19, 10, 0.05) 100%)",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 px-6 md:px-12 container-wide w-full">
        <div className="max-w-[560px]">
          {/* Main Heading */}
          <h1
            className="mb-0 font-display font-medium text-[36px] md:text-[46px] lg:text-[56px] reveal stagger-1"
            style={{ color: "#FFF7E8", lineHeight: 1.15, letterSpacing: "0.01em" }}
          >
            मन तृप्त<br />
            <span style={{ color: "#D49A2A" }}>करणारी चव</span>
          </h1>

          {/* Decorative Gold Divider */}
          <div className="flex items-center gap-2 reveal stagger-2" style={{ marginTop: "20px" }}>
            <div className="h-[2px] w-[54px]" style={{ backgroundColor: "#D49A2A" }}></div>
            <div className="w-2 h-2 rotate-45" style={{ backgroundColor: "#D49A2A" }}></div>
            <div className="h-[2px] w-[54px]" style={{ backgroundColor: "#D49A2A" }}></div>
          </div>

          {/* Description */}
          <p className="max-w-[500px] text-[15px] md:text-[17px] leading-[1.6] mb-0 reveal stagger-3" style={{ color: "rgba(255, 247, 232, 0.9)", marginTop: "30px" }}>
            Pure vegetarian delights crafted with love, authentic recipes and the finest ingredients.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-3.5 reveal stagger-4" style={{ marginTop: "15px" }}>
            <Link
              href="/menu"
              className="group flex items-center justify-center font-semibold transition-all duration-200 w-full sm:w-auto"
              style={{
                backgroundColor: "#A83216",
                color: "#FFF7E8",
                width: "180px",
                height: "52px",
                borderRadius: "7px",
                fontSize: "15px",
                fontWeight: 600,
                gap: "8px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#8F2A12";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#A83216";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <UtensilsCrossed size={17} style={{ color: "#FFF7E8" }} />
              Explore Menu
            </Link>

            <Link
              href="/contact"
              className="group flex items-center justify-center font-semibold transition-all duration-200 w-full sm:w-auto"
              style={{
                border: "1.5px solid #D49A2A",
                color: "#D49A2A",
                backgroundColor: "transparent",
                width: "180px",
                height: "52px",
                borderRadius: "7px",
                fontSize: "15px",
                fontWeight: 600,
                gap: "8px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#D49A2A";
                e.currentTarget.style.color = "#24130A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#D49A2A";
              }}
            >
              <CalendarDays size={17} color="currentColor" />
              Book a Table
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}