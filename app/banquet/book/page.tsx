"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  hall: z.string().optional(),
  eventType: z.string().min(2, "Event type is required"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  numberOfGuests: z.number().min(1, "At least 1 guest required"),
  foodRequirement: z.string().optional(),
  venueRequirements: z.string().optional(),
  specialRequests: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function BanquetBookContent() {
  const searchParams = useSearchParams();
  const [halls, setHalls] = useState<BanquetHall[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ referenceNumber: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const initialEventType = searchParams.get("eventType") || "";
  const initialHall = searchParams.get("hall") || "";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      eventType: initialEventType,
      hall: initialHall,
    },
  });

  useEffect(() => {
    banquetService.listHalls().then((h) => {
      setHalls(h.filter((hall) => hall.status === "Active"));
    });
  }, []);

  useEffect(() => {
    if (initialEventType) {
      setValue("eventType", initialEventType);
    }
    if (initialHall) {
      setValue("hall", initialHall);
    }
  }, [initialEventType, initialHall, setValue]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        hall: data.hall && data.hall.trim().length > 0 ? data.hall : undefined,
      };
      const booking = await banquetService.createBooking(payload);
      setSuccess({ referenceNumber: booking.referenceNumber });
      reset();
      toast.success("Event booking submitted! We'll confirm shortly.");
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
          <p className="eyebrow mb-[18px]">Event Booking Received</p>
          <h1 className="display-md mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Thank You!
          </h1>
          <p className="body-lg mb-[28px]">Your event booking inquiry has been submitted. Our banquet coordinator will contact you within 24 hours.</p>

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
            Submit Another Event Booking
          </Button>
        </div>
      </div>
    );
  }

  const hallOptions = [
    { value: "", label: "Hotel Recommendation / Any Available Hall" },
    ...halls.map((h) => ({
      value: h._id,
      label: `${h.name} (up to ${h.capacity} guests)`,
    })),
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden section-padding" style={{ background: "var(--surface)" }}>
        <span className="ghost-text absolute right-[-4vw] top-0 select-none pointer-events-none" aria-hidden="true">
          EVENT
        </span>
        <div className="container-wide mx-auto relative z-10">
          <p className="eyebrow mb-[18px]">03 — Book an Event</p>
          <h1 className="display-xl max-w-[55.2rem]" style={{ fontFamily: "var(--font-display)" }}>
            Reserve Your Event Hall
          </h1>
          <p className="body-lg mt-[18px] max-w-[41.4rem]">
            Plan your wedding, birthday celebration, corporate conference, or private gathering with Gandharva. Fill out the details below and our events team will tailor the experience for you.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding" style={{ background: "var(--ink)" }}>
        <div className="container-wide mx-auto max-w-[48.3rem]">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[37px]">
            {/* Personal info */}
            <div>
              <p className="eyebrow mb-[28px]">01 — Organizer Details</p>
              <div className="flex flex-col gap-[28px]">
                <FormInput label="Full Name" placeholder="e.g. Rajesh Kumar" error={errors.customerName?.message} {...register("customerName")} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
                  <FormInput label="Phone Number" type="tel" placeholder="+91 98765 43210" error={errors.phone?.message} {...register("phone")} />
                  <FormInput label="Email Address" type="email" placeholder="rajesh@example.com" error={errors.email?.message} {...register("email")} />
                </div>
              </div>
            </div>

            {/* Event details */}
            <div>
              <p className="eyebrow mb-[28px]">02 — Event Details</p>
              <div className="flex flex-col gap-[28px]">
                <FormSelect
                  label="Preferred Hall (Optional)"
                  error={errors.hall?.message}
                  options={hallOptions}
                  {...register("hall")}
                />
                <FormInput
                  label="Event Type"
                  placeholder="e.g. Wedding Reception, Birthday Bash, Corporate Meet, Anniversary"
                  error={errors.eventType?.message}
                  {...register("eventType")}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
                  <FormInput label="Date" type="date" error={errors.date?.message} {...register("date")} />
                  <FormInput label="Preferred Time / Slot" type="time" error={errors.time?.message} {...register("time")} />
                </div>
                <FormInput
                  label="Expected Number of Guests"
                  type="number"
                  min={1}
                  placeholder="e.g. 150"
                  error={errors.numberOfGuests?.message}
                  {...register("numberOfGuests", { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* Additional */}
            <div>
              <p className="eyebrow mb-[28px]">03 — Catering & Venue Preferences</p>
              <div className="flex flex-col gap-[28px]">
                <FormInput
                  label="Catering / Food Requirement (optional)"
                  placeholder="e.g. Pure Veg Gujarati Buffet, South Indian High Tea, Jain Food"
                  error={errors.foodRequirement?.message}
                  {...register("foodRequirement")}
                />
                <FormInput
                  label="Venue & Stage Setup / AV Requirements (optional)"
                  placeholder="e.g. Projector, Sound System, Flower Decoration, Stage Mandap"
                  error={errors.venueRequirements?.message}
                  {...register("venueRequirements")}
                />
                <FormTextarea
                  label="Additional Notes & Special Requests (optional)"
                  placeholder="Any special requests or instructions for our event managers..."
                  error={errors.notes?.message}
                  {...register("notes")}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-[18px]">
              <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full justify-center">
                {loading ? (
                  <><Spinner size={16} /> Submitting Event Booking...</>
                ) : (
                  "Submit Event Booking Request"
                )}
              </Button>
              <p className="body-sm text-center mt-[18px]">
                We&apos;ll confirm availability and quote within 24 hours. A booking reference number is generated instantly.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default function BanquetBookPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><Spinner size={32} /></div>}>
      <BanquetBookContent />
    </Suspense>
  );
}