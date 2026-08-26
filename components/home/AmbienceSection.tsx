"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Image as ImageIcon, Building2 } from "lucide-react";

const EXPERIENCES = [
  { number: "01", title: "Pure Vegetarian Dining", desc: "Authentic vegetarian dishes prepared with traditional recipes and fresh ingredients.", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop" },
  { number: "02", title: "Banquets & Celebrations", desc: "Beautiful spaces for weddings, receptions, birthdays and family gatherings.", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop" },
  { number: "03", title: "Special Events", desc: "Celebrate important moments with delicious food, comfortable spaces and warm hospitality.", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop" },
  { number: "04", title: "Family Gatherings", desc: "A welcoming atmosphere designed for memorable meals with family and friends.", image: "https://images.unsplash.com/photo-1543352634-99a5d50ae78e?q=80&w=800&auto=format&fit=crop" },
  { number: "05", title: "Daily Ritual", desc: "Simple, wholesome meals made the same way, every single day.", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop" },
];

export function AmbienceSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [maxSlide, setMaxSlide] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  // Step 1: measure the viewport's real width first
  useEffect(() => {
    const measureViewport = () => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      setViewportWidth(viewport.clientWidth);
    };
    measureViewport();
    window.addEventListener("resize", measureViewport);
    return () => window.removeEventListener("resize", measureViewport);
  }, []);

  // Step 2: only AFTER viewportWidth has been applied to the panels
  // (so track.scrollWidth reflects the final, correct layout),
  // measure how far the track actually needs to slide.
  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport || viewportWidth === 0) return;
    setMaxSlide(Math.max(0, track.scrollWidth - viewport.clientWidth));
  }, [viewportWidth]);

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper || maxSlide === 0) return;
      const rect = wrapper.getBoundingClientRect();
      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / maxSlide));
      setTranslateX(-progress * maxSlide);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [maxSlide]);

  return (
    <div ref={wrapperRef} style={{ height: `calc(100vh + ${maxSlide}px)` }} className="relative w-full">
      <div ref={viewportRef} className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor: "#F5E9D2" }}>
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ transform: `translateX(${translateX}px)`, transition: "transform 0.05s linear" }}
        >
          <div
            style={{ width: viewportWidth ? `${Math.min(viewportWidth * 0.6, 560)}px` : "520px" }}
            className="h-full shrink-0 flex flex-col justify-center px-6 md:px-16"
          >
            <p className="mb-4 font-bold tracking-widest text-sm" style={{ color: "#A83216" }}>OUR EXPERIENCES</p>
            <h2 className="text-[36px] md:text-[52px] font-display font-semibold leading-[1.1] mb-6" style={{ color: "#24130A", fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>
              Made for Every<br /><span style={{ color: "#A83216" }}>Special Moment.</span>
            </h2>
            <div className="w-16 h-[2px] mb-6" style={{ backgroundColor: "#D49A2A" }} />
            <p className="max-w-md text-[15px] leading-[1.7] mb-8" style={{ color: "rgba(36, 19, 10, 0.7)" }}>
              From family dining to memorable celebrations, Gandharva Hotel brings authentic
              vegetarian food, warm hospitality and beautiful spaces together.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-sm transition-all duration-200"
                style={{ backgroundColor: "#A83216", color: "#FFF7E8" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#8F2A12")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#A83216")}>
                <ImageIcon size={16} /> View Gallery
              </Link>
              <Link href="/banquet" className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-sm transition-all duration-200"
                style={{ border: "1.5px solid #A83216", color: "#A83216", backgroundColor: "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(168, 50, 22, 0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                <Building2 size={16} /> Explore Banquet Hall
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#A83216" }}>
              SCROLL TO EXPLORE <ArrowRight size={16} />
            </div>
          </div>

          {EXPERIENCES.map((exp) => (
            <div key={exp.number} className="w-[300px] md:w-[340px] h-full shrink-0 flex flex-col justify-center px-4">
              <div className="w-full aspect-[4/5] rounded-md overflow-hidden relative shadow-md"
                style={{ backgroundColor: "rgba(36, 19, 10, 0.05)", border: "1px solid rgba(36, 19, 10, 0.1)" }}>
                <Image src={exp.image} alt={exp.title} fill className="object-cover"
                  onError={(e) => { e.currentTarget.style.display = "none"; }} />
              </div>
              <div className="mt-5">
                <p className="text-[20px] font-display font-bold mb-1" style={{ color: "#A83216" }}>{exp.number}</p>
                <div className="w-7 h-[2px] mb-3" style={{ backgroundColor: "#D49A2A" }} />
                <h3 className="text-[15px] font-bold tracking-wide mb-2" style={{ color: "#24130A" }}>{exp.title.toUpperCase()}</h3>
                <p className="text-[13px] leading-[1.6] max-w-sm" style={{ color: "rgba(36, 19, 10, 0.65)" }}>{exp.desc}</p>
              </div>
            </div>
          ))}

          <div
            style={{ width: viewportWidth ? `${viewportWidth}px` : "100%", backgroundColor: "#A83216" }}
            className="h-full shrink-0 flex flex-col justify-center items-start px-6 md:px-16"
          >
            <p className="text-[13px] font-bold mb-2" style={{ color: "#D49A2A" }}></p>
            <h3 className="text-[32px] font-display font-semibold mb-3" style={{ color: "#FFF7E8" }}>Your Turn.</h3>
            <p className="mb-8 text-[15px]" style={{ color: "rgba(255, 247, 232, 0.8)" }}>Come taste the tradition for yourself.</p>
            <Link href="/menu" className="inline-flex items-center gap-2 text-sm font-bold px-8 py-4 rounded-full transition-all duration-200"
              style={{ backgroundColor: "#FFF7E8", color: "#A83216" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EFE8DA")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFF7E8")}>
              View Full Menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}