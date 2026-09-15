"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const REVIEWS = [
  { text: "The food is simply amazing! Authentic taste, great service and beautiful ambiance.", name: "Pratik Kulkarni", role: "2 months ago" },
  { text: "Best pure veg restaurant in Latur. Perfect place for family dining. The paneer dishes are fantastic.", name: "Swati Deshmukh", role: "3 months ago" },
  { text: "We hosted a birthday party here and everything was perfect! The banquet hall is spacious and well-lit.", name: "Rahul Jadhav", role: "5 months ago" },
];

export function ReviewsPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section className="py-[120px] bg-[#24130A] text-[#FFF7E8] overflow-hidden">
      <div className="container-wide mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Side: Large Quote Mark & Controls */}
        <div className="lg:w-[25%] flex flex-col justify-between self-stretch">
          <div className="font-display text-[150px] md:text-[200px] leading-[0.5] text-[#D49A2A]/40 mb-12 lg:mb-0 reveal">
            &ldquo;
          </div>
          
          <div className="hidden lg:flex items-center gap-6 reveal stagger-2">
            <button 
              onClick={prevReview}
              className="w-12 h-12 rounded-full border border-[#FFF7E8]/20 flex items-center justify-center hover:bg-[#FFF7E8] hover:text-[#24130A] transition-colors duration-300"
              aria-label="Previous review"
            >
              <ArrowLeft size={18} />
            </button>
            <button 
              onClick={nextReview}
              className="w-12 h-12 rounded-full border border-[#FFF7E8]/20 flex items-center justify-center hover:bg-[#FFF7E8] hover:text-[#24130A] transition-colors duration-300"
              aria-label="Next review"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Side: The Review */}
        <div className="lg:w-[75%] min-h-[300px] flex flex-col justify-center reveal stagger-1">
          <div className="relative">
            {REVIEWS.map((review, idx) => (
              <div 
                key={idx}
                className={`transition-all duration-1000 ease-in-out ${idx === currentIndex ? "opacity-100 translate-y-0 relative z-10" : "opacity-0 absolute inset-0 pointer-events-none translate-y-8"}`}
              >
                <h3 className="font-display font-light text-[32px] md:text-[48px] lg:text-[56px] leading-[1.2] mb-12 tracking-tight">
                  {review.text}
                </h3>
                <div className="flex items-center gap-6">
                  <div className="w-[40px] h-[1px] bg-[#D49A2A]"></div>
                  <div>
                    <p className="font-display text-[20px] mb-1">{review.name}</p>
                    <p className="text-[12px] tracking-[0.15em] uppercase text-[#FFF7E8]/50">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-6 mt-12">
            <button 
              onClick={prevReview}
              className="w-12 h-12 rounded-full border border-[#FFF7E8]/20 flex items-center justify-center hover:bg-[#FFF7E8] hover:text-[#24130A] transition-colors duration-300"
            >
              <ArrowLeft size={18} />
            </button>
            <button 
              onClick={nextReview}
              className="w-12 h-12 rounded-full border border-[#FFF7E8]/20 flex items-center justify-center hover:bg-[#FFF7E8] hover:text-[#24130A] transition-colors duration-300"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}