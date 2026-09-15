"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface MenuPageCarouselProps {
  images: string[];
  initialIndex?: number;
}

export function MenuPageCarousel({ images, initialIndex = 0 }: MenuPageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Custom drag handler for mobile swipe
  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -100) {
      handleNext();
    } else if (swipe > 100) {
      handlePrev();
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center">
      {/* Carousel Container */}
      <div className="relative w-full h-[450px] md:h-[600px] flex items-center justify-center overflow-hidden py-10">
        <AnimatePresence initial={false}>
          {images.map((img, index) => {
            // Calculate distance from center (0 = center, -1 = left, 1 = right)
            let offset = index - currentIndex;
            if (offset > images.length / 2) offset -= images.length;
            if (offset < -images.length / 2) offset += images.length;

            const absOffset = Math.abs(offset);

            // If it's more than 2 away on desktop, hide it
            if (absOffset > 2) return null;

            // Positioning logic
            let x = 0;
            let scale = 1;
            let zIndex = 10 - absOffset;
            let opacity = 1;

            if (isMobile) {
              x = offset * 260;
              scale = absOffset === 0 ? 1 : 0.85;
              opacity = absOffset === 0 ? 1 : 0.5;
            } else {
              x = offset * 300;
              scale = absOffset === 0 ? 1 : absOffset === 1 ? 0.85 : 0.7;
              opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.8 : 0.4;
            }

            return (
              <motion.div
                key={`${img}-${index}`}
                className="absolute w-[260px] md:w-[380px] aspect-[1/1.414] bg-[#FCF8F3] rounded-md shadow-2xl overflow-hidden cursor-pointer border-2 border-[#D49A2A]/20"
                animate={{
                  x,
                  scale,
                  zIndex,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                drag={isMobile ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                onClick={() => handleDotClick(index)}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`Menu Page ${index + 1}`}
                    fill
                    unoptimized={true}
                    className="object-cover"
                    sizes="(max-width: 768px) 260px, 380px"
                  />
                  {/* Subtle overlay for inactive cards */}
                  {absOffset !== 0 && (
                    <div className="absolute inset-0 bg-[#24130A]/20 transition-opacity" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-8 z-20 w-12 h-12 bg-[#59160a] rounded-full flex items-center justify-center text-[#FFF7E8] hover:bg-[#8F2A12] transition-colors shadow-xl"
          aria-label="Previous menu page"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 md:right-8 z-20 w-12 h-12 bg-[#59160a] rounded-full flex items-center justify-center text-[#FFF7E8] hover:bg-[#8F2A12] transition-colors shadow-xl"
          aria-label="Next menu page"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-3 mt-2 mb-8">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex
                ? "bg-[#8F2A12] scale-125"
                : "bg-transparent border border-[#8F2A12]/50 hover:border-[#8F2A12]"
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
