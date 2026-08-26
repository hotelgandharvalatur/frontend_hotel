"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { eventsService } from "@/services/events.service";
import { Event, EventAvailability } from "@/types";
import { Spinner } from "@/components/ui/Spinner";

interface Props {
  event: Event;
}

export function EventAvailabilityClient({ event }: Props) {
  const [availability, setAvailability] = useState<EventAvailability | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventsService.checkAvailability(event._id).then((a) => {
      setAvailability(a);
      setLoading(false);
    });
  }, [event._id]);

  const capacityPct = Math.min(
    100,
    Math.round((event.registeredGuests / event.maximumGuests) * 100)
  );
  const remaining = availability?.remainingSeats ?? (event.maximumGuests - event.registeredGuests);
  const isFull = availability?.isFull ?? event.isFull ?? false;
  const deadlinePassed = availability?.deadlinePassed ?? false;
  const canRegister = event.registrationEnabled && !isFull && !deadlinePassed;

  return (
    <div
      className="p-6 rounded-sm border sticky top-24"
      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
    >
      <p className="eyebrow mb-4">Seat Availability</p>

      {/* Capacity bar */}
      <div className="mb-6">
        <div className="flex items-end justify-between mb-2">
          <span className="body-sm">
            <strong style={{ color: "var(--warm-white)" }}>{event.registeredGuests}</strong> registered
          </span>
          <span className="body-sm">{event.maximumGuests} total</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface-3)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${capacityPct}%`,
              background: isFull ? "#ef4444" : "var(--accent)",
            }}
          />
        </div>
        <p className="body-sm mt-2">
          {loading ? (
            <Spinner size={12} />
          ) : isFull ? (
            <span style={{ color: "#f87171" }}>Fully booked</span>
          ) : (
            <span style={{ color: "#4ade80" }}>{remaining} seats remaining</span>
          )}
        </p>
      </div>

      {/* Blocking reasons */}
      {(isFull || deadlinePassed) && (
        <div
          className="flex items-start gap-3 p-4 rounded-sm mb-5"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}
        >
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#f87171" }} />
          <p className="text-sm" style={{ color: "#fca5a5" }}>
            {isFull
              ? "This event has reached full capacity."
              : "Registration deadline has passed."}
          </p>
        </div>
      )}

      {/* CTA */}
      {event.registrationEnabled ? (
        canRegister ? (
          <Link
            href={`/events/${event._id}/register`}
            className="block text-center text-sm font-medium px-6 py-3.5 rounded-sm hover:opacity-90 transition-opacity"
            style={{ background: "var(--accent)", color: "white" }}
          >
            Register Now
          </Link>
        ) : (
          <button
            disabled
            className="w-full text-sm font-medium px-6 py-3.5 rounded-sm opacity-40 cursor-not-allowed"
            style={{ background: "var(--surface-3)", color: "var(--muted)" }}
          >
            Registration Closed
          </button>
        )
      ) : (
        <p className="body-sm text-center" style={{ color: "var(--muted)" }}>
          Registration is not available for this event.
        </p>
      )}
    </div>
  );
}
