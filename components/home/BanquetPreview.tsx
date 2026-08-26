"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const EVENTS_LIST = [
  "Weddings",
  "Receptions",
  "Birthdays",
  "Corporate Events",
  "Family Gatherings"
];

export function BanquetPreview() {
  return (
    <section className="py-[46px] px-4" style={{ backgroundColor: "#24130A" }}>
      <div className="max-w-[1120px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[38px] lg:gap-[64px] items-center">

        {/* Image Container - Ready for real photo */}
        <div className="w-full">
          <div
            className="w-full aspect-[4/3] rounded-sm overflow-hidden relative shadow-xl"
            style={{ backgroundColor: "rgba(255, 247, 232, 0.05)", border: "1px solid rgba(212, 154, 42, 0.2)" }}
          >
            <Image
              src="/images/banquet/banquet-main.jpg"
              alt="Banquet Hall"
              fill
              className="object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Fallback text behind image */}
            <div className="absolute inset-0 flex items-center justify-center text-sm font-medium" style={{ color: "rgba(255, 247, 232, 0.4)", zIndex: -1 }}>
              [ Banquet Hall Image Placeholder ]
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="mb-[10px] font-bold tracking-widest text-xs" style={{ color: "#D49A2A" }}>
            BANQUETS & EVENTS
          </p>
          <h2 className="text-[24px] lg:text-[30px] font-display font-semibold mb-[19px]" style={{ color: "#FFF7E8", lineHeight: 1.2 }}>
            Celebrate Your<br />Special Moments
          </h2>
          <div className="w-[51px] h-[3px] mb-[26px]" style={{ backgroundColor: "#D49A2A" }} />

          <ul className="space-y-[13px] mb-[32px] text-left w-full max-w-sm">
            {EVENTS_LIST.map((event, idx) => (
              <li key={idx} className="flex items-center gap-[10px]">
                <CheckCircle2 size={16} style={{ color: "#D49A2A" }} />
                <span className="text-[14px]" style={{ color: "rgba(255, 247, 232, 0.85)" }}>
                  {event}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/banquet"
            className="inline-flex items-center text-[13px] font-bold px-[26px] py-[13px] rounded-sm transition-all duration-200"
            style={{
              backgroundColor: "#A83216",
              color: "#FFF7E8"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#8F2A12")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#A83216")}
          >
            Explore Banquet Hall
          </Link>
        </div>

      </div>
    </section>
  );
}