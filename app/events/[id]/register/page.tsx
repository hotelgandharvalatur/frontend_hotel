"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Check, Copy, AlertCircle } from "lucide-react";
import Link from "next/link";
import { eventsService } from "@/services/events.service";
import { Event, EventAvailability } from "@/types";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";
import { Spinner, PageLoader } from "@/components/ui/Spinner";

interface Props {
  params: Promise<{ id: string }>;
}

const schema = z.object({
  customerName: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  numberOfGuests: z.number().min(1, "At least 1 guest required"),
});

type FormData = z.infer<typeof schema>;

export default function EventRegisterPage({ params }: Props) {
  const [resolvedId, setResolvedId] = useState<string | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [availability, setAvailability] = useState<EventAvailability | null>(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ referenceNumber: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    params.then((p) => setResolvedId(p.id));
  }, [params]);

  useEffect(() => {
    if (!resolvedId) return;
    Promise.all([
      eventsService.getEventById(resolvedId),
      eventsService.checkAvailability(resolvedId),
    ]).then(([ev, avail]) => {
      setEvent(ev);
      setAvailability(avail);
      setLoadingEvent(false);
    });
  }, [resolvedId]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!resolvedId) return;
    setSubmitting(true);
    try {
      const reg = await eventsService.registerForEvent(resolvedId, data);
      setSuccess({ referenceNumber: reg.referenceNumber });
      toast.success("Registered successfully!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const copyRef = async () => {
    if (!success) return;
    await navigator.clipboard.writeText(success.referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loadingEvent) return <PageLoader />;

  const isFull = availability?.isFull ?? false;
  const deadlinePassed = availability?.deadlinePassed ?? false;
  const canRegister = event?.registrationEnabled && !isFull && !deadlinePassed;

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center section-padding">
        <div className="text-center max-w-md">
          <div className="w-px h-16 bg-gradient-to-b from-[var(--accent)] to-transparent mx-auto mb-8" />
          <p className="eyebrow mb-4">Registration Confirmed</p>
          <h1 className="display-md mb-3" style={{ fontFamily: "var(--font-display)" }}>See You There!</h1>
          <p className="body-lg mb-2">{event?.title}</p>
          <p className="body-sm mb-8">
            {event?.date && new Date(event.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
          </p>
          <div className="flex items-center justify-between gap-4 px-6 py-4 rounded-sm mb-8" style={{ background: "var(--surface-2)", border: "1px solid var(--border-accent)" }}>
            <div className="text-left">
              <p className="eyebrow mb-1">Reference Number</p>
              <p className="font-mono font-semibold text-xl" style={{ color: "var(--accent-light)" }}>{success.referenceNumber}</p>
            </div>
            <button onClick={copyRef} className="p-2 rounded-sm hover:bg-[var(--surface-3)] transition-colors" aria-label="Copy">
              {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} style={{ color: "var(--muted)" }} />}
            </button>
          </div>
          <Link href="/events" className="inline-flex items-center text-sm font-medium px-6 py-3 rounded-sm" style={{ border: "1px solid var(--border)", color: "var(--warm-white)" }}>
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="relative overflow-hidden section-padding" style={{ background: "var(--surface)" }}>
        <span className="ghost-text absolute right-[-4vw] top-0 select-none pointer-events-none" aria-hidden="true">REG</span>
        <div className="container-wide mx-auto relative z-10">
          <Link href={`/events/${resolvedId}`} className="eyebrow hover:text-[var(--accent-light)] transition-colors mb-5 block">
            ← Back to Event
          </Link>
          <p className="eyebrow mb-4">Event Registration</p>
          <h1 className="display-xl max-w-3xl" style={{ fontFamily: "var(--font-display)" }}>
            {event?.title}
          </h1>
          {event?.date && (
            <p className="body-lg mt-3">
              {new Date(event.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--ink)" }}>
        <div className="container-wide mx-auto max-w-xl">
          {/* Blocking notice */}
          {!canRegister && (
            <div className="flex items-start gap-3 p-5 rounded-sm mb-8" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#f87171" }} />
              <div>
                <p className="font-medium text-sm mb-1" style={{ color: "#fca5a5" }}>Registration Unavailable</p>
                <p className="body-sm">
                  {isFull ? "This event is fully booked." : deadlinePassed ? "The registration deadline has passed." : "Registration is not open for this event."}
                </p>
              </div>
            </div>
          )}

          {canRegister && (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <FormInput label="Full Name" error={errors.customerName?.message} {...register("customerName")} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Phone Number" type="tel" error={errors.phone?.message} {...register("phone")} />
                  <FormInput label="Email Address" type="email" error={errors.email?.message} {...register("email")} />
                </div>
                <FormInput
                  label="Number of Guests"
                  type="number"
                  min={1}
                  max={availability?.remainingSeats || event?.maximumGuests}
                  error={errors.numberOfGuests?.message}
                  {...register("numberOfGuests", { valueAsNumber: true })}
                />
                {availability?.remainingSeats && (
                  <p className="body-sm" style={{ color: "var(--accent-light)" }}>
                    {availability.remainingSeats} seats remaining
                  </p>
                )}
              </div>

              <Button type="submit" variant="primary" size="lg" disabled={submitting} className="w-full justify-center">
                {submitting ? <><Spinner size={16} /> Registering...</> : "Complete Registration"}
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
