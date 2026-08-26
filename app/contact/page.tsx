import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Car, Users, Headset } from "lucide-react";
import { contactService } from "@/services/contact.service";
import { ContactForm } from "./ContactForm";
import { HomeScrollAnimations } from "../HomeScrollAnimations";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Hotel Bee for inquiries, reservations, and more.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const contact = await contactService.getContact();
  
  // Use backend opening hours if available, otherwise default to standard hours as provided in the design
  const openingHours = (contact as any)?.openingHours || "Mon – Sun\n10:00 AM – 11:00 PM";

  return (
    <>
      <HomeScrollAnimations />
      <main className="bg-[#F5E9D2] min-h-screen text-[#24130A] font-sans" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>
        
        {/* Hero Section */}
        <section className="relative w-full h-[70dvh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
              alt="Banquet & Events"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Dark brown transparent overlay */}
          <div className="absolute inset-0 bg-[#24130A]/60" />
          
          <div className="container mx-auto relative z-10 px-6 flex flex-col items-center">
            <div className="flex items-center gap-4 mb-4 reveal">
              <div className="w-8 h-[1px] bg-[#D49A2A]"></div>
              <span className="text-[#D49A2A] text-sm tracking-[0.2em] uppercase font-bold">CONTACT US</span>
              <div className="w-8 h-[1px] bg-[#D49A2A]"></div>
            </div>
            
            <h1 className="text-[3rem] md:text-[4.5rem] lg:text-[5rem] leading-[1.05] text-[#FFF7E8] mb-6 reveal stagger-1" style={{ fontFamily: "var(--font-display)" }}>
              We'd Love to Hear From You
            </h1>
            
            <div className="flex items-center justify-center gap-2 mb-6 reveal stagger-2">
              <span className="w-12 h-px bg-[#D49A2A]"></span>
              <div className="w-2 h-2 rotate-45 bg-[#D49A2A]"></div>
              <span className="w-12 h-px bg-[#D49A2A]"></span>
            </div>
            
            <p className="max-w-2xl text-[1.1rem] text-[#FFF7E8]/90 leading-relaxed reveal stagger-3">
              Whether you have a question, a booking request, or just want to say hello — our team is always ready.
            </p>
          </div>
        </section>

        {/* Two-Column Section */}
        <section className="py-20 px-4 md:px-8 max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column - Reach Us */}
            <div className="flex flex-col gap-8 reveal">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-3xl font-bold text-[#24130A]" style={{ fontFamily: "var(--font-display)" }}>
                  01 <span className="text-[#A83216] mx-2">—</span> Reach Us
                </h2>
              </div>
              
              <div className="flex flex-col gap-4">
                {/* Address Card */}
                <div className="bg-[#EFE8DA] border border-[#D49A2A]/30 rounded-xl p-6 flex items-start gap-5 hover:border-[#D49A2A]/60 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-[#8F2A12] flex items-center justify-center shrink-0 shadow-sm text-[#FFF7E8]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#8F2A12] mb-1.5" style={{ fontFamily: "var(--font-display)" }}>Address</h3>
                    <p className="text-[14px] text-[#24130A] leading-relaxed">
                      Hotel Gandharva<br />
                      Near Bus Stand, Jalgaon,<br />
                      Maharashtra 425001
                    </p>
                  </div>
                </div>
                
                {/* Email Card */}
                <div className="bg-[#EFE8DA] border border-[#D49A2A]/30 rounded-xl p-6 flex items-start gap-5 hover:border-[#D49A2A]/60 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-[#8F2A12] flex items-center justify-center shrink-0 shadow-sm text-[#FFF7E8]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#8F2A12] mb-1.5" style={{ fontFamily: "var(--font-display)" }}>Email</h3>
                    <a href={`mailto:${contact?.email || 'info@gandharvahotel.com'}`} className="text-[14px] text-[#24130A] hover:text-[#A83216] transition-colors leading-relaxed block">
                      {contact?.email || 'info@gandharvahotel.com'}
                    </a>
                    <a href={`mailto:${(contact as any)?.bookingsEmail || 'bookings@gandharvahotel.com'}`} className="text-[14px] text-[#24130A] hover:text-[#A83216] transition-colors leading-relaxed block mt-0.5">
                      {(contact as any)?.bookingsEmail || 'bookings@gandharvahotel.com'}
                    </a>
                  </div>
                </div>
                
                {/* Hours Card */}
                <div className="bg-[#EFE8DA] border border-[#D49A2A]/30 rounded-xl p-6 flex items-start gap-5 hover:border-[#D49A2A]/60 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-[#8F2A12] flex items-center justify-center shrink-0 shadow-sm text-[#FFF7E8]">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#8F2A12] mb-1.5" style={{ fontFamily: "var(--font-display)" }}>Opening Hours</h3>
                    <p className="text-[14px] text-[#24130A] leading-relaxed whitespace-pre-line">
                      {openingHours}
                    </p>
                  </div>
                </div>

                {/* Immediate Assistance Card */}
                <div className="bg-[#59160a] border border-[#D49A2A]/40 rounded-xl p-8 mt-4 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                  <div className="shrink-0 text-[#D49A2A] mt-1">
                    <Headset size={42} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[1.3rem] font-bold text-[#FFF7E8] mb-2" style={{ fontFamily: "var(--font-display)" }}>Need Immediate Assistance?</h3>
                    <p className="text-[14px] text-[#FFF7E8]/90 mb-5">Call us directly for quick help.</p>
                    <a href="tel:+919168163999" className="inline-flex items-center gap-2 border border-[#D49A2A] rounded-md px-5 py-2.5 bg-transparent hover:bg-[#D49A2A] hover:text-[#24130A] text-[#D49A2A] transition-all font-semibold tracking-wide text-[15px]">
                      <Phone size={16} />
                      +91 91681 63999
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Send a Message */}
            <div className="reveal stagger-2">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold text-[#24130A]" style={{ fontFamily: "var(--font-display)" }}>
                  02 <span className="text-[#A83216] mx-2">—</span> Send a Message
                </h2>
              </div>
              <div className="bg-[#FCF8F3] border border-[#D49A2A]/20 rounded-xl p-8 md:p-10 shadow-sm">
                <ContactForm />
              </div>
            </div>
            
          </div>
        </section>

        {/* Location Section */}
        <section className="py-20 px-4 md:px-8 max-w-[1300px] mx-auto border-t border-[#D49A2A]/20 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left side info */}
            <div className="lg:col-span-5 reveal">
              <h2 className="text-3xl md:text-4xl font-bold text-[#24130A] mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Easy to Find, Hard to Forget
              </h2>
              <div className="flex items-center gap-2 mb-10">
                <span className="w-12 h-px bg-[#D49A2A]"></span>
                <div className="w-1.5 h-1.5 rotate-45 bg-[#D49A2A]"></div>
                <span className="w-12 h-px bg-[#D49A2A]"></span>
              </div>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-[#EFE8DA] flex items-center justify-center shrink-0 text-[#D49A2A] shadow-sm">
                    <Car size={24} />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-[#24130A] mb-1.5">Convenient Location</h4>
                    <p className="text-[14px] text-[#3A2016]/80 leading-relaxed">
                      Located near Jalgaon Bus Stand, easily accessible.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-[#EFE8DA] flex items-center justify-center shrink-0 text-[#D49A2A] shadow-sm font-bold text-xl">
                    P
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-[#24130A] mb-1.5">Parking Available</h4>
                    <p className="text-[14px] text-[#3A2016]/80 leading-relaxed">
                      Spacious parking space available for cars and two-wheelers.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-[#EFE8DA] flex items-center justify-center shrink-0 text-[#D49A2A] shadow-sm">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-[#24130A] mb-1.5">Perfect for All</h4>
                    <p className="text-[14px] text-[#3A2016]/80 leading-relaxed">
                      Ideal for family dinners, gatherings, and special occasions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side map */}
            <div className="lg:col-span-7 h-[450px] w-full rounded-2xl overflow-hidden border-2 border-[#D49A2A]/30 shadow-md reveal stagger-1 bg-[#EFE8DA]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.636605553255!2d75.5562725!3d21.0071988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd90fa4a1eab90f%3A0x3b8d6b63d9154f3a!2sGandharva%20Hotel!5e0!3m2!1sen!2sin!4v1689234857476!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Gandharva Hotel Location Map"
              ></iframe>
            </div>
            
          </div>
        </section>

        {/* Bottom Help Section */}
        <section className="py-24 px-4 md:px-8 max-w-[1300px] mx-auto reveal">
          <div className="bg-[#EFE8DA] border border-[#D49A2A]/30 rounded-2xl p-10 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-sm">
            
            {/* Background decorative patterns */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">
              <svg width="400" height="400" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#24130A" strokeWidth="1" fill="none" />
                <circle cx="50" cy="50" r="35" stroke="#24130A" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="25" stroke="#24130A" strokeWidth="1" fill="none" />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 opacity-[0.04] pointer-events-none">
              <svg width="400" height="400" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#24130A" strokeWidth="1" fill="none" />
                <circle cx="50" cy="50" r="35" stroke="#24130A" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="25" stroke="#24130A" strokeWidth="1" fill="none" />
              </svg>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 text-center md:text-left">
              <div className="w-20 h-20 rounded-full border border-[#D49A2A] flex items-center justify-center bg-[#FCF8F3] shrink-0 text-[#D49A2A] shadow-md">
                <Headset size={34} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#24130A] mb-3" style={{ fontFamily: "var(--font-display)" }}>We're Here to Help!</h3>
                <p className="text-[16px] text-[#3A2016]/90 leading-relaxed">
                  Have a question or need assistance?<br className="hidden md:block" />
                  Our team is just a call away.
                </p>
              </div>
            </div>
            
            <div className="relative z-10 w-full md:w-auto flex justify-center">
              <Link href="tel:+919168163999" className="inline-flex items-center justify-center gap-2.5 bg-[#A83216] hover:bg-[#8F2A12] text-[#FFF7E8] px-10 py-4 rounded-md transition-all duration-300 font-semibold shadow-md w-full md:w-auto">
                <Phone size={18} />
                Call Now
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
