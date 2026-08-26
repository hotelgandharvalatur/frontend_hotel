"use client";

import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns-1";

const REVIEWS: Testimonial[] = [
  { text: "The food is simply amazing! Authentic taste, great service and beautiful ambiance.", name: "Pratik Kulkarni", role: "2 months ago" },
  { text: "Best pure veg restaurant in Latur. Perfect place for family dining. The paneer dishes are fantastic.", name: "Swati Deshmukh", role: "3 months ago" },
  { text: "We hosted a birthday party here and everything was perfect! The banquet hall is spacious and well-lit.", name: "Rahul Jadhav", role: "5 months ago" },
  { text: "Warm hospitality and consistent quality every single time. Our go-to place for family dinners.", name: "Anjali Pawar", role: "1 month ago" },
  { text: "Loved the Veg Kolhapuri — bold flavors, fresh ingredients, and quick service even on a busy evening.", name: "Vikram Shinde", role: "4 months ago" },
  { text: "Clean, comfortable, and the staff genuinely cares. Highly recommend for special occasions.", name: "Neha Joshi", role: "6 months ago" },
  { text: "Their thali is unbeatable — generous portions and everything tastes homemade.", name: "Sameer Kale", role: "2 weeks ago" },
  { text: "Booked their banquet hall for a wedding reception. Beautiful decor and flawless coordination.", name: "Pooja More", role: "3 weeks ago" },
  { text: "Every visit feels like a celebration. The Gulab Jamun alone is worth the trip.", name: "Aditya Bhosale", role: "5 months ago" },
];

const firstColumn = REVIEWS.slice(0, 3);
const secondColumn = REVIEWS.slice(3, 6);
const thirdColumn = REVIEWS.slice(6, 9);

export function ReviewsPreview() {
  return (
    <section
      className="overflow-hidden"
      style={{ backgroundColor: "#F5E9D2", paddingTop: "3.2rem", paddingBottom: "3.2rem" }}
    >
      <div className="container-wide mx-auto">
        <div className="text-center mb-16">
          <p className="mb-3 font-bold tracking-widest text-sm" style={{ color: "#A83216" }}>
            WHAT OUR GUESTS SAY
          </p>
          <div className="w-16 h-1 mx-auto" style={{ backgroundColor: "#D49A2A" }} />
        </div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[480px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}