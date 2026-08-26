import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, Building2, ChevronLeft, ChevronRight, Armchair, Utensils, ConciergeBell, ShieldCheck, CalendarDays } from "lucide-react";
import { HomeScrollAnimations } from "../HomeScrollAnimations";

export const metadata: Metadata = {
  title: "Banquet & Events",
  description: "Celebrate Life's Special Moments at our elegant banquet spaces.",
};

const events = [
  {
    id: 1,
    dateDay: "25",
    dateMonth: "MAY",
    dateYear: "2025",
    title: "Grand Wedding",
    desc: "Celebrate your big day in our elegant Grand Hall with timeless memories.",
    guests: "150 - 250 Guests",
    hall: "Grand Hall",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 2,
    dateDay: "08",
    dateMonth: "JUN",
    dateYear: "2025",
    title: "Birthday Bash",
    desc: "Make birthdays extra special with fun, food & unforgettable moments.",
    guests: "50 - 150 Guests",
    hall: "Celebration Hall",
    image: "https://images.unsplash.com/photo-1530103862676-de8892bf309c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    dateDay: "21",
    dateMonth: "JUN",
    dateYear: "2025",
    title: "Corporate Meet",
    desc: "Host productive meetings & seminars in a professional and comfortable setting.",
    guests: "30 - 100 Guests",
    hall: "Private Dining",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 4,
    dateDay: "06",
    dateMonth: "JUL",
    dateYear: "2025",
    title: "Engagement Ceremony",
    desc: "Begin your forever with a beautiful engagement celebration.",
    guests: "80 - 150 Guests",
    hall: "Grand Hall",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function BanquetPage() {
  return (
    <>
      <HomeScrollAnimations />
      <main className="bg-[#fdf9f1] text-[#3a2016] min-h-screen font-sans" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>
        {/* Hero Section */}
        <section className="relative w-full h-[90dvh] min-h-[650px] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
              alt="Banquet Hall"
              fill
              className="object-cover brightness-[0.4]"
              priority
            />
          </div>
          <div className="container mx-auto relative z-10 px-6 flex flex-col items-center">
            <div className="flex items-center gap-4 mb-6 reveal">
              <div className="w-8 h-[1px] bg-[#d49a2a]"></div>
              <span className="text-[#D49A2A] text-sm tracking-[0.2em] uppercase font-medium">Banquet & Events</span>
              <div className="w-8 h-[1px] bg-[#d49a2a]"></div>
            </div>
            
            <h1 className="text-[3.15rem] md:text-[4.5rem] lg:text-[4.95rem] leading-[1.05] font-display mb-8 reveal stagger-1" style={{ fontFamily: "var(--font-display)" }}>
              <span className="text-white">Celebrate Life's</span> <br />
              <span className="text-[#D49A2A]">Special Moments</span>
            </h1>
            
            <p className="max-w-2xl text-lg mb-10 text-white/90 leading-relaxed reveal stagger-3">
              From intimate gatherings to grand celebrations, our banquet spaces are designed to make every occasion truly memorable.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 reveal stagger-4">
              <Link
                href="#events"
                className="bg-[#8f2a12] hover:bg-[#7b230e] text-white px-8 py-3.5 rounded-sm transition-colors duration-300 font-medium flex items-center gap-2"
              >
                Explore Our Halls &rarr;
              </Link>
              <Link
                href="/contact"
                className="border border-[#d49a2a] text-[#D49A2A] bg-transparent hover:bg-[#d49a2a] hover:text-[#24130A] px-8 py-3.5 rounded-sm transition-colors duration-300 font-medium flex items-center gap-2"
              >
                <CalendarDays size={18} /> Book an Event
              </Link>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section id="events" className="w-full bg-[#f8eedb] relative">
        <div className="pt-[95px] pb-16 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto">
          <div className="text-center mb-16 reveal">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-6 h-[1px] bg-[#d49a2a]"></span>
              <span className="text-[#a47b56] text-xs font-bold tracking-widest uppercase">Happening at Gandharva</span>
              <span className="w-6 h-[1px] bg-[#d49a2a]"></span>
            </div>
            <h2 className="text-[3.15rem] md:text-[4.5rem] lg:text-[4.95rem] leading-[1.05] font-display text-[#2a1708]" style={{ fontFamily: "var(--font-display)" }}>Upcoming Events</h2>
          </div>

          <div className="relative group">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.map((event, i) => (
                <div key={event.id} className={`bg-[#fffbf5] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#f0e8dd] flex flex-col h-full reveal stagger-${Math.min(i + 1, 4)}`}>
                  <div className="relative h-56 w-full">
                    <div className="absolute top-0 left-6 bg-[#8f2a12] text-white flex flex-col items-center justify-center w-14 py-3 z-10 rounded-b-lg shadow-md">
                      <span className="text-xl font-bold leading-none mb-1">{event.dateDay}</span>
                      <span className="text-[10px] tracking-wider">{event.dateMonth}</span>
                      <span className="text-[10px] opacity-80 mt-0.5">{event.dateYear}</span>
                    </div>
                    <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl text-[#8f2a12] font-semibold mb-3" style={{ fontFamily: "var(--font-display)" }}>{event.title}</h3>
                    <p className="text-[15px] text-[#6b584d] mb-6 flex-grow leading-relaxed">{event.desc}</p>
                    <div className="flex flex-col gap-3 pt-5 border-t border-[#f5e9d2]/60">
                      <div className="flex items-center gap-3 text-[#5c4436] text-[15px]">
                        <Users size={18} className="text-[#D49A2A]" />
                        <span>{event.guests}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#5c4436] text-[15px]">
                        <Building2 size={18} className="text-[#D49A2A]" />
                        <span>{event.hall}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#f5e9d2] items-center justify-center text-[#8f2a12] hover:bg-[#fffbf5] transition-colors hidden xl:flex z-10">
              <ChevronLeft size={22} />
            </button>
            <button className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#f5e9d2] items-center justify-center text-[#8f2a12] hover:bg-[#fffbf5] transition-colors hidden xl:flex z-10">
              <ChevronRight size={22} />
            </button>
          </div>

        </div>
        </section>

        {/* Features Grid */}
        <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Armchair size={28} strokeWidth={1.5} />,
                title: "Spacious & Comfortable",
                desc: "Well-designed spaces with elegant seating and modern amenities."
              },
              {
                icon: <Utensils size={28} strokeWidth={1.5} />,
                title: "Pure Vegetarian",
                desc: "Delicious pure veg catering crafted with the finest ingredients."
              },
              {
                icon: <ConciergeBell size={28} strokeWidth={1.5} />,
                title: "Dedicated Service",
                desc: "Our team ensures every detail is taken care of perfectly."
              },
              {
                icon: <ShieldCheck size={28} strokeWidth={1.5} />,
                title: "Hygiene & Safety",
                desc: "Maintaining the highest standards of cleanliness and safety."
              }
            ].map((feature, i) => (
              <div key={i} className={`bg-[#f8eedb] p-10 rounded-xl text-center flex flex-col items-center reveal stagger-${Math.min(i + 1, 4)}`}>
                <div className="w-16 h-16 border-2 border-[#d49a2a]/30 rounded-full flex items-center justify-center mb-6 text-[#D49A2A] bg-[#fffbf5]">
                  {feature.icon}
                </div>
                <h3 className="text-[#8f2a12] text-[22px] mb-4" style={{ fontFamily: "var(--font-display)" }}>{feature.title}</h3>
                <p className="text-[15px] text-[#6b584d] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Planning CTA */}
        <section className="pb-24 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto">
          <div className="relative bg-[#f8eedb] rounded-2xl p-12 md:p-20 text-center overflow-hidden border border-[#f0e8dd] reveal shadow-sm">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-32 h-32 opacity-20 -translate-x-1/2 -translate-y-1/2">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" stroke="#d49a2a" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="38" stroke="#d49a2a" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20 translate-x-1/2 translate-y-1/2">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" stroke="#d49a2a" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="38" stroke="#d49a2a" strokeWidth="1" />
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-transparent border-2 border-[#8f2a12] rounded-full flex items-center justify-center mb-8 text-[#8f2a12]">
                <CalendarDays size={26} strokeWidth={1.5} />
              </div>
              <h2 className="text-[3.15rem] md:text-[4.5rem] lg:text-[4.95rem] leading-[1.05] font-display text-[#2a1708] mb-5" style={{ fontFamily: "var(--font-display)" }}>Planning an Event?</h2>
              <p className="text-[17px] text-[#5c4436] mb-10">
                Our team is here to help you create unforgettable memories.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#8f2a12] hover:bg-[#7b230e] text-white px-10 py-4 rounded-sm transition-colors duration-300 font-medium text-lg shadow-md">
                Enquire Now &rarr;
              </Link>
            </div>
          </div>
        </section>


      </main>
    </>
  );
}
