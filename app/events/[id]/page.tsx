import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, Tag, Users } from "lucide-react";
import { eventsService } from "@/services/events.service";
import { EventAvailabilityClient } from "./EventAvailabilityClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await eventsService.getEventById(id);
  return {
    title: event?.title || "Event",
    description: event?.description,
  };
}

export const revalidate = 30;

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = await eventsService.getEventById(id);

  if (!event) notFound();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[55vh] flex items-end" style={{ background: "var(--surface)" }}>
        {event.banner && (
          <Image
            src={event.banner}
            alt={event.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,10,11,0.95) 0%, rgba(10,10,11,0.4) 60%, transparent 100%)" }}
        />
        <div className="relative z-10 container-wide mx-auto px-6 md:px-10 pb-12 md:pb-20">
          <Link href="/events" className="eyebrow hover:text-[var(--accent-light)] transition-colors mb-6 block">
            ← Back to Events
          </Link>
          {event.category && <span className="tag tag-accent mb-4 inline-block">{event.category}</span>}
          <h1 className="display-lg max-w-3xl" style={{ fontFamily: "var(--font-display)" }}>
            {event.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding" style={{ background: "var(--ink)" }}>
        <div className="container-wide mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Description */}
          <div className="lg:col-span-2">
            <p className="eyebrow mb-4">About This Event</p>
            <p className="body-lg" style={{ fontSize: "1.1rem", lineHeight: 1.85 }}>
              {event.description || "Join us for a memorable experience crafted with care."}
            </p>

            {/* Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 pt-10" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="flex items-center gap-3">
                <Calendar size={18} style={{ color: "var(--accent-light)" }} />
                <div>
                  <p className="eyebrow mb-0.5">Date</p>
                  <p className="text-sm" style={{ color: "var(--warm-white)" }}>
                    {new Date(event.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
              {event.time && (
                <div className="flex items-center gap-3">
                  <Clock size={18} style={{ color: "var(--accent-light)" }} />
                  <div>
                    <p className="eyebrow mb-0.5">Time</p>
                    <p className="text-sm" style={{ color: "var(--warm-white)" }}>{event.time}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Users size={18} style={{ color: "var(--accent-light)" }} />
                <div>
                  <p className="eyebrow mb-0.5">Capacity</p>
                  <p className="text-sm" style={{ color: "var(--warm-white)" }}>
                    {event.registeredGuests} / {event.maximumGuests} registered
                  </p>
                </div>
              </div>
              {event.registrationDeadline && (
                <div className="flex items-center gap-3">
                  <Tag size={18} style={{ color: "var(--accent-light)" }} />
                  <div>
                    <p className="eyebrow mb-0.5">Registration Deadline</p>
                    <p className="text-sm" style={{ color: "var(--warm-white)" }}>
                      {new Date(event.registrationDeadline).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Availability + CTA sidebar — client component */}
          <div className="lg:col-span-1">
            <EventAvailabilityClient event={event} />
          </div>
        </div>
      </section>
    </div>
  );
}
