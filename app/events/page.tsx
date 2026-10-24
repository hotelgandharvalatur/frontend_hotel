import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Tag } from "lucide-react";
import { eventsService } from "@/services/events.service";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { HomeScrollAnimations } from "../HomeScrollAnimations";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and featured events at Hotel Bee — register online.",
};

export const revalidate = 30;

export default async function EventsPage() {
  const [featuredResult, upcomingData] = await Promise.all([
    eventsService.getFeaturedEvents(),
    eventsService.listEvents({ limit: 20 }),
  ]);

  const featured = featuredResult.slice(0, 2);
  const allEvents = upcomingData.events;

  return (
    <>
      <HomeScrollAnimations />

      {/* Hero */}
      <section className="relative overflow-hidden section-padding" style={{ background: "var(--surface)" }}>
        <span className="ghost-text absolute right-[-4vw] top-0 select-none pointer-events-none" aria-hidden="true">EVENTS</span>
        <div className="container-wide mx-auto relative z-10">
          <p className="eyebrow mb-4 reveal">04 — Events</p>
          <h1 className="display-xl reveal stagger-1 max-w-3xl" style={{ fontFamily: "var(--font-display)" }}>
            Experiences Worth Attending
          </h1>
          <p className="body-lg mt-4 max-w-xl reveal stagger-2">
            From themed dinners to cultural galas, every Hotel Bee event is meticulously crafted.
          </p>
        </div>
      </section>

      {/* Featured Events */}
      {featured.length > 0 && (
        <section className="section-padding" style={{ background: "var(--ink)" }}>
          <div className="container-wide mx-auto">
            <SectionHeader eyebrow="Featured" title="Spotlight Events" className="mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((event, i) => (
                <Link
                  key={event._id}
                  href={`/events/${event._id}`}
                  className={`group relative overflow-hidden rounded-sm aspect-[4/3] block reveal stagger-${i + 1}`}
                  style={{ background: "var(--surface-2)" }}
                >
                  {event.banner && (
                    <Image
                      src={event.banner}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(10,10,11,0.9) 0%, transparent 55%)" }}
                  />
                  <div className="absolute bottom-0 left-0 p-8">
                    <span className="tag tag-accent mb-3 block w-fit">Featured</span>
                    <h2 className="display-md text-white mb-2">{event.title}</h2>
                    <p className="body-sm">
                      {new Date(event.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Events */}
      <section className="section-padding" style={{ background: "var(--surface)" }}>
        <div className="container-wide mx-auto">
          <SectionHeader eyebrow="All Events" title="What's On" ghost="ON" className="mb-12" />

          {allEvents.length === 0 ? (
            <EmptyState title="No upcoming events" message="Check back soon — we're always planning something special." ghost="SOON" />
          ) : (
            <div className="flex flex-col gap-4">
              {allEvents.map((event, i) => (
                <Link
                  key={event._id}
                  href={`/events/${event._id}`}
                  className={`group grid grid-cols-1 md:grid-cols-[160px_1fr_auto] gap-6 items-center p-6 rounded-sm border hover:border-[var(--border-accent)] transition-all duration-300 reveal stagger-${Math.min((i % 6) + 1, 6)}`}
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                >
                  {/* Date */}
                  <div className="text-center md:text-left">
                    <p className="display-sm" style={{ color: "var(--accent-light)" }}>
                      {new Date(event.date).getDate()}
                    </p>
                    <p className="eyebrow">
                      {new Date(event.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                    </p>
                  </div>

                  {/* Details */}
                  <div>
                    <h3 className="font-medium text-base mb-2 group-hover:text-[var(--accent-light)] transition-colors" style={{ color: "var(--warm-white)" }}>
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {event.time && (
                        <span className="flex items-center gap-1.5 body-sm">
                          <Clock size={12} style={{ color: "var(--accent-light)" }} />
                          {event.time}
                        </span>
                      )}
                      {event.category && (
                        <span className="flex items-center gap-1.5 body-sm">
                          <Tag size={12} style={{ color: "var(--accent-light)" }} />
                          {event.category}
                        </span>
                      )}
                      {event.registrationEnabled && (
                        <span className="tag tag-accent">Registration Open</span>
                      )}
                      {event.isFull && (
                        <span className="tag" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>Full</span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1" style={{ color: "var(--muted)" }}>
                    →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Host an Event CTA */}
      <section className="section-padding" style={{ background: "var(--ink)", borderTop: "1px solid var(--border)" }}>
        <div className="container-wide mx-auto text-center max-w-3xl">
          <p className="eyebrow mb-3">Host With Us</p>
          <h2 className="display-lg mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Planning a Wedding, Conference, or Private Celebration?
          </h2>
          <p className="body-lg mb-8 max-w-xl mx-auto">
            Book our luxurious banquet halls with premium vegetarian catering, modern sound systems, and dedicated event coordination.
          </p>
          <Link
            href="/banquet/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8f2a12] hover:bg-[#7b230e] text-white font-medium text-[15px] rounded-sm transition-colors shadow-md"
          >
            Book an Event Hall &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
