"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Check, Copy } from "lucide-react";
import { banquetService } from "@/services/banquet.service";
import { BanquetHall } from "@/types";
import { FormInput, FormTextarea, FormSelect } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

const schema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  hall: z.string().min(1, "Please select a hall"),
  eventType: z.string().min(2, "Event type is required"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  numberOfGuests: z.number().min(1, "At least 1 guest required"),
  foodRequirement: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function BanquetBookPage() {
  const [halls, setHalls] = useState<BanquetHall[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ referenceNumber: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    banquetService.listHalls().then((h) => setHalls(h.filter((hall) => hall.status === "Active")));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const booking = await banquetService.createBooking(data);
      setSuccess({ referenceNumber: booking.referenceNumber });
      reset();
      toast.success("Booking submitted! We'll confirm shortly.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyRef = async () => {
    if (!success) return;
    await navigator.clipboard.writeText(success.referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center section-padding">
        <div className="text-center max-w-[32.2rem]">
          <div className="w-px h-[74px] bg-gradient-to-b from-[var(--accent)] to-transparent mx-auto mb-[28px]" />
          <p className="eyebrow mb-[18px]">Booking Received</p>
          <h1 className="display-md mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Thank You!
          </h1>
          <p className="body-lg mb-[28px]">Your booking has been submitted. We&apos;ll reach out to confirm your reservation.</p>

          {/* Reference number */}
          <div
            className="flex items-center justify-between gap-[18px] px-[28px] py-[18px] rounded-sm mb-[28px]"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border-accent)" }}
          >
            <div className="text-left">
              <p className="eyebrow mb-1">Reference Number</p>
              <p
                className="font-mono font-semibold text-[23px]"
                style={{ color: "var(--accent-light)" }}
              >
                {success.referenceNumber}
              </p>
            </div>
            <button
              onClick={copyRef}
              className="p-2 rounded-sm transition-colors hover:bg-[var(--surface-3)]"
              aria-label="Copy reference number"
            >
              {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} style={{ color: "var(--muted)" }} />}
            </button>
          </div>

          <Button variant="outline" onClick={() => setSuccess(null)}>
            Submit Another Booking
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden section-padding" style={{ background: "var(--surface)" }}>
        <span className="ghost-text absolute right-[-4vw] top-0 select-none pointer-events-none" aria-hidden="true">
          BOOK
        </span>
        <div className="container-wide mx-auto relative z-10">
          <p className="eyebrow mb-[18px]">03 — Book a Hall</p>
          <h1 className="display-xl max-w-[55.2rem]" style={{ fontFamily: "var(--font-display)" }}>
            Reserve Your Hall
          </h1>
          <p className="body-lg mt-[18px] max-w-[41.4rem]">
            Fill out the form below and our team will confirm your reservation within 24 hours.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding" style={{ background: "var(--ink)" }}>
        <div className="container-wide mx-auto max-w-[48.3rem]">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[37px]">
            {/* Personal info */}
            <div>
              <p className="eyebrow mb-[28px]">01 — Your Details</p>
              <div className="flex flex-col gap-[28px]">
                <FormInput label="Full Name" error={errors.customerName?.message} {...register("customerName")} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
                  <FormInput label="Phone Number" type="tel" error={errors.phone?.message} {...register("phone")} />
                  <FormInput label="Email Address" type="email" error={errors.email?.message} {...register("email")} />
                </div>
              </div>
            </div>

            {/* Event details */}
            <div>
              <p className="eyebrow mb-[28px]">02 — Event Details</p>
              <div className="flex flex-col gap-[28px]">
                <FormSelect
                  label="Select Hall"
                  error={errors.hall?.message}
                  options={halls.map((h) => ({ value: h._id, label: `${h.name} (up to ${h.capacity} guests)` }))}
                  {...register("hall")}
                />
                <FormInput label="Event Type (e.g. Wedding, Corporate)" error={errors.eventType?.message} {...register("eventType")} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
                  <FormInput label="Date" type="date" error={errors.date?.message} {...register("date")} />
                  <FormInput label="Time" type="time" error={errors.time?.message} {...register("time")} />
                </div>
                <FormInput label="Number of Guests" type="number" min={1} error={errors.numberOfGuests?.message} {...register("numberOfGuests", { valueAsNumber: true })} />
              </div>
            </div>

            {/* Additional */}
            <div>
              <p className="eyebrow mb-[28px]">03 — Preferences</p>
              <div className="flex flex-col gap-[28px]">
                <FormInput label="Food Requirement (optional)" error={errors.foodRequirement?.message} {...register("foodRequirement")} />
                <FormTextarea label="Additional Notes (optional)" error={errors.notes?.message} {...register("notes")} />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-[18px]">
              <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full justify-center">
                {loading ? (
                  <><Spinner size={16} /> Submitting...</>
                ) : (
                  "Submit Booking Request"
                )}
              </Button>
              <p className="body-sm text-center mt-[18px]">
                We&apos;ll confirm within 24 hours. You&apos;ll receive a reference number upon submission.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}