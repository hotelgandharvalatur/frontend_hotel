import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Soup, Users, Award, Calendar, ArrowRight } from "lucide-react";
import { HomeScrollAnimations } from "../HomeScrollAnimations";

export const metadata: Metadata = {
  title: "About Us | Gandharva Hotel",
  description: "A Tradition Of Taste & Trust",
};

export default function AboutPage() {
  return (
    <main className="bg-[#F3E7D3] text-[#24130A] min-h-screen pt-[80px]">
      <HomeScrollAnimations />

      {/* 1. Hero Section */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-[#F3E7D3] -mt-[80px] pt-[80px]">
        {/* Background Image on the right - explicit top/right/bottom positioning
            instead of flex sizing, so it always fills the section's full height
            with no gap at the top */}
        <div className="absolute top-0 right-0 bottom-0 left-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[65%]">
            <Image
              src="/images/about/IMG_8855.png"
              alt="Gandharva Hotel Interior"
              fill
              className="object-cover object-center"
              priority
              unoptimized
            />
            {/* Gradient Mask - fade starts sooner (further left) and stretches
                all the way to the right edge for a slower, more gradual reveal */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, #F3E7D3 0%, #F3E7D3 25%, rgba(243, 231, 211, 0.92) 38%, rgba(243, 231, 211, 0.75) 52%, rgba(243, 231, 211, 0.5) 65%, rgba(243, 231, 211, 0.25) 78%, rgba(243, 231, 211, 0.08) 92%, transparent 100%)",
              }}
            ></div>
          </div>
        </div>

        <div className="container-wide mx-auto relative z-10 py-16 px-6 lg:px-12 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6 reveal">
              <div className="w-8 h-[1px] bg-[#A83216] relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:rotate-45 after:bg-[#A83216]"></div>
              <p className="font-bold tracking-widest text-xs text-[#A83216] uppercase">
                ABOUT US
              </p>
            </div>

            <h1 className="text-[3.15rem] md:text-[4.5rem] lg:text-[4.95rem] leading-[1.05] font-display mb-8 reveal stagger-1">
              A Tradition <br />
              Of <span className="text-[#A83216]">Taste & Trust</span>
            </h1>

            <div className="flex items-center gap-3 mb-8 reveal stagger-2">
              <div className="w-1.5 h-1.5 rotate-45 bg-[#D49A2A]"></div>
              <div className="w-24 h-[1px] bg-[#D49A2A]"></div>
            </div>

            <p className="text-[1.1rem] md:text-lg leading-[1.8] text-[rgba(36,19,10,0.85)] max-w-[500px] reveal stagger-3">
              At Gandharva Hotel, we believe good food brings people together. For years, we have been serving authentic vegetarian cuisine with warmth, care and a commitment to quality.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Our Story Section - sized down ~15%, then another 10% */}
      <section className="py-[74px] px-6 lg:px-12 bg-[#FAF5E9]">
        <div className="container-wide mx-auto flex flex-col lg:flex-row gap-[49px] lg:gap-[74px] items-center">

          {/* Left: Exterior Image */}
          <div className="w-full lg:w-1/2 relative reveal">
            <div className="aspect-[4/3] lg:aspect-[1.1/1] relative rounded-2xl overflow-hidden shadow-2xl max-w-[65%] lg:max-w-[85%] mx-auto">
              <Image
                src="/images/about/image.png"
                alt="Gandharva Hotel Exterior"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="w-full lg:w-1/2 relative reveal stagger-1">
            <div className="flex items-center gap-4 mb-[18px]">
              <div className="w-8 h-[1px] bg-[#A83216] relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:rotate-45 after:bg-[#A83216]"></div>
              <p className="font-bold tracking-widest text-[13.2px] text-[#A83216] uppercase">
                OUR STORY
              </p>
            </div>

            <h2 className="text-[2.52rem] md:text-[3.37rem] leading-[1.1] font-display mb-[25px] text-[#24130A]">
              Rooted in <span className="text-[#A83216]">Culture,</span><br />
              Driven by <span className="text-[#A83216]">Passion.</span>
            </h2>

            <div className="w-24 h-[1px] bg-[#D49A2A] mb-[25px]"></div>

            <p className="text-[14.9px] leading-[1.65] text-[rgba(36,19,10,0.8)] mb-[29px] max-w-lg">
              From our humble beginnings to becoming a beloved destination for families and food lovers, our journey is built on passion, tradition and the joy of serving delicious pure vegetarian food.
            </p>

            <Link
              href="/menu"
              className="inline-flex items-center gap-3 px-[25px] py-[11px] border border-[#A83216] text-[13.2px] font-semibold rounded hover:bg-[#A83216] hover:text-white transition-all duration-300 relative z-10 group text-[#A83216]"
            >
              <Calendar size={17} />
              View Menu
              <ArrowRight size={17} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Our Values Section */}
      <section className="py-24 px-6 lg:px-12 bg-[#F3E7D3]">
        <div className="container-wide mx-auto">

          <div className="flex flex-col items-center text-center mb-20 reveal">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-[#D49A2A]"></div>
              <p className="font-bold tracking-widest text-xs text-[#A83216] uppercase">
                OUR VALUES
              </p>
              <div className="w-8 h-[1px] bg-[#D49A2A]"></div>
            </div>
            <h2 className="text-[3rem] font-display text-[#24130A]">What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative reveal stagger-2">
            {/* Divider lines for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-[25%] -translate-y-1/2 w-[1px] h-32 bg-[#D49A2A]/20"></div>
            <div className="hidden lg:block absolute top-1/2 left-[50%] -translate-y-1/2 w-[1px] h-32 bg-[#D49A2A]/20"></div>
            <div className="hidden lg:block absolute top-1/2 left-[75%] -translate-y-1/2 w-[1px] h-32 bg-[#D49A2A]/20"></div>

            {/* Value 1 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-[85px] h-[85px] rounded-full flex items-center justify-center mb-6" style={{ border: "1px solid rgba(212, 154, 42, 0.4)" }}>
                <Leaf size={34} style={{ color: "#A83216" }} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-[#A83216]">Pure Vegetarian</h3>
              <p className="text-[15px] text-[rgba(36,19,10,0.7)] leading-relaxed max-w-[240px]">
                100% pure vegetarian food prepared with the freshest ingredients.
              </p>
            </div>

            {/* Value 2 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-[85px] h-[85px] rounded-full flex items-center justify-center mb-6" style={{ border: "1px solid rgba(212, 154, 42, 0.4)" }}>
                <Soup size={34} style={{ color: "#A83216" }} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-[#A83216]">Authentic Taste</h3>
              <p className="text-[15px] text-[rgba(36,19,10,0.7)] leading-relaxed max-w-[240px]">
                Traditional recipes and timeless flavors that bring you back for more.
              </p>
            </div>

            {/* Value 3 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-[85px] h-[85px] rounded-full flex items-center justify-center mb-6" style={{ border: "1px solid rgba(212, 154, 42, 0.4)" }}>
                <Users size={34} style={{ color: "#A83216" }} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-[#A83216]">Warm Hospitality</h3>
              <p className="text-[15px] text-[rgba(36,19,10,0.7)] leading-relaxed max-w-[240px]">
                We treat every guest like family and serve with a smile.
              </p>
            </div>

            {/* Value 4 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-[85px] h-[85px] rounded-full flex items-center justify-center mb-6" style={{ border: "1px solid rgba(212, 154, 42, 0.4)" }}>
                <Award size={34} style={{ color: "#A83216" }} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-[#A83216]">Quality & Hygiene</h3>
              <p className="text-[15px] text-[rgba(36,19,10,0.7)] leading-relaxed max-w-[240px]">
                High standards of quality, cleanliness and food safety always.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}