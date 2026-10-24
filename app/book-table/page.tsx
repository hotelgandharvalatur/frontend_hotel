import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Utensils, Clock, Phone, MapPin, Users, Sparkles, Building2 } from "lucide-react";
import { TableBookingForm } from "./TableBookingForm";
import { HomeScrollAnimations } from "../HomeScrollAnimations";
import { getCloudinaryUrl } from "@/lib/cloudinary";

export const metadata: Metadata = {
  title: "Book a Table | Gandharva Hotel",
  description:
    "Reserve your table at Gandharva Hotel in Latur. Pure vegetarian authentic culinary excellence and warm hospitality.",
};

export default function BookTablePage() {
  return (
    <>
      <HomeScrollAnimations />
      <main className="bg-[#F5E9D2] min-h-screen text-[#24130A] font-sans">
        {/* Hero Section */}
        <section className="relative w-full h-[55dvh] min-h-[420px] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={getCloudinaryUrl("hotel-gandharva/hero/IMG_2740")}
              alt="Gandharva Hotel Restaurant Dining"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Dark brown transparent overlay */}
          <div className="absolute inset-0 bg-[#24130A]/75" />

          <div className="container mx-auto relative z-10 px-6 flex flex-col items-center">
            <div className="flex items-center gap-4 mb-4 reveal">
              <div className="w-8 h-[1px] bg-[#D49A2A]"></div>
              <span className="text-[#D49A2A] text-sm tracking-[0.2em] uppercase font-bold">
                FINE DINING RESERVATION
              </span>
              <div className="w-8 h-[1px] bg-[#D49A2A]"></div>
            </div>

            <h1
              className="text-[2.75rem] md:text-[4rem] lg:text-[4.75rem] leading-[1.05] text-[#FFF7E8] mb-4 reveal stagger-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Book a Table
            </h1>

            <div className="flex items-center justify-center gap-2 mb-4 reveal stagger-2">
              <span className="w-12 h-px bg-[#D49A2A]"></span>
              <div className="w-2 h-2 rotate-45 bg-[#D49A2A]"></div>
              <span className="w-12 h-px bg-[#D49A2A]"></span>
            </div>

            <p className="max-w-xl text-[1.05rem] text-[#FFF7E8]/90 leading-relaxed reveal stagger-3">
              Indulge in authentic pure vegetarian delights with family and friends. Reserve your spot in advance.
            </p>
          </div>
        </section>

        {/* Content Section: Form & Info */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7 reveal">
              <TableBookingForm />
            </div>

            {/* Information & Highlights Column */}
            <div className="lg:col-span-5 flex flex-col gap-6 reveal stagger-1">
              
              {/* Dining Experience Card */}
              <div className="bg-[#EFE8DA] border border-[#D49A2A]/30 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#8F2A12] flex items-center justify-center text-[#FFF7E8]">
                    <Utensils size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#8F2A12]" style={{ fontFamily: "var(--font-display)" }}>
                      The Gandharva Dining Experience
                    </h3>
                    <p className="text-xs text-[#7A6357]">A Tradition Of Taste & Trust</p>
                  </div>
                </div>

                <ul className="space-y-4 text-sm text-[#3A2016]">
                  <li className="flex items-start gap-3">
                    <Sparkles size={16} className="text-[#D49A2A] shrink-0 mt-0.5" />
                    <span><strong>100% Pure Vegetarian:</strong> Traditional recipes prepared with premium, wholesome ingredients.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock size={16} className="text-[#D49A2A] shrink-0 mt-0.5" />
                    <span><strong>Restaurant Hours:</strong> Open daily from 11:00 AM to 11:00 PM for lunch, evening snacks, and dinner.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#D49A2A] shrink-0 mt-0.5" />
                    <span><strong>Convenient Location:</strong> Ausa Road, Near Rajiv Gandhi Chowk, Latur with spacious parking.</span>
                  </li>
                </ul>
              </div>

              {/* Large Groups / Banquet Banner */}
              <div className="bg-[#59160a] border border-[#D49A2A]/40 rounded-2xl p-6 sm:p-8 text-[#FFF7E8]">
                <div className="flex items-center gap-3 mb-3 text-[#D49A2A]">
                  <Building2 size={24} />
                  <span className="text-xs font-bold uppercase tracking-wider">Parties & Celebrations</span>
                </div>
                <h4 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  Hosting More Than 20 Guests?
                </h4>
                <p className="text-sm text-[#FFF7E8]/85 mb-5 leading-relaxed">
                  For larger gatherings, family celebrations, birthdays, or corporate get-togethers, explore our private banquet halls and tailored menus.
                </p>
                <Link
                  href="/banquet/book"
                  className="inline-flex items-center gap-2 border border-[#D49A2A] rounded-lg px-5 py-2.5 bg-transparent hover:bg-[#D49A2A] hover:text-[#24130A] text-[#D49A2A] transition-all font-semibold text-sm"
                >
                  <Users size={16} /> Explore Banquet & Event Booking &rarr;
                </Link>
              </div>

              {/* Direct Call Assistance */}
              <div className="bg-[#FCF8F3] border border-[#D49A2A]/30 rounded-2xl p-6 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-base text-[#24130A]">Need immediate table assistance?</h4>
                  <p className="text-xs text-[#7A6357] mt-0.5">Call our front desk for quick reservations</p>
                </div>
                <a
                  href="tel:+919168163999"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#8F2A12] text-[#FFF7E8] text-xs font-bold hover:bg-[#A83216] transition-colors shrink-0"
                >
                  <Phone size={14} /> +91 91681 63999
                </a>
              </div>

            </div>

          </div>
        </section>
      </main>
    </>
  );
}
