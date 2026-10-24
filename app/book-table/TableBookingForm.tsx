"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Check, Copy, Calendar, Clock, Users, UtensilsCrossed, AlertCircle } from "lucide-react";
import { tableBookingService } from "@/services/tableBooking.service";
import { Spinner } from "@/components/ui/Spinner";

const schema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters").max(150),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number (at least 7 digits)")
    .max(20, "Phone number is too long"),
  email: z.string().email("Please enter a valid email address"),
  date: z.string().min(1, "Please select a reservation date"),
  time: z.string().min(1, "Please select a reservation time"),
  numberOfGuests: z
    .number({ message: "Please enter the number of guests" })
    .int("Guest count must be an integer")
    .min(1, "At least 1 guest is required")
    .max(20, "For groups larger than 20, please contact our banquet team directly"),
  specialRequests: z.string().max(500, "Special requests cannot exceed 500 characters").optional(),
});

type FormData = z.infer<typeof schema>;

const POPULAR_TIMES = [
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
  "09:30 PM",
  "10:00 PM",
];

export function TableBookingForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{
    referenceNumber: string;
    customerName: string;
    date: string;
    time: string;
    numberOfGuests: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Default to today in YYYY-MM-DD
  const todayStr = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      customerName: "",
      phone: "",
      email: "",
      date: todayStr,
      time: "07:30 PM",
      numberOfGuests: 2,
      specialRequests: "",
    },
  });

  const selectedTime = watch("time");
  const selectedGuests = watch("numberOfGuests");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const booking = await tableBookingService.createBooking({
        customerName: data.customerName.trim(),
        phone: data.phone.trim(),
        email: data.email.trim().toLowerCase(),
        date: data.date,
        time: data.time.trim(),
        numberOfGuests: Number(data.numberOfGuests),
        specialRequests: data.specialRequests?.trim() || undefined,
      });

      setSuccess({
        referenceNumber: booking.referenceNumber,
        customerName: booking.customerName || data.customerName,
        date: data.date,
        time: data.time,
        numberOfGuests: data.numberOfGuests,
      });
      reset();
      toast.success("Table reserved successfully! We look forward to hosting you.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to reserve table. Please try again.");
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
      <div className="p-8 md:p-12 text-center bg-[#EFE8DA] rounded-2xl border border-[#D49A2A]/40 shadow-sm animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-[#8F2A12] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-[#FFF7E8]">
          <Check size={32} />
        </div>
        <h3
          className="text-2xl md:text-3xl font-bold text-[#8F2A12] mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Table Reservation Confirmed!
        </h3>
        <p className="text-[#3A2016] text-base mb-6 max-w-md mx-auto">
          Thank you, <strong>{success.customerName}</strong>. We have received your booking request for{" "}
          <strong>{success.numberOfGuests} guest{success.numberOfGuests > 1 ? "s" : ""}</strong> on{" "}
          <strong>{success.date}</strong> at <strong>{success.time}</strong>.
        </p>

        {/* Reference Number Box */}
        <div className="bg-[#FFF7E8] border border-[#D49A2A]/40 rounded-xl p-5 max-w-md mx-auto mb-8 shadow-xs flex items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F2A12] block mb-0.5">
              Booking Reference
            </span>
            <span className="font-mono text-xl font-bold text-[#24130A] tracking-wide">
              {success.referenceNumber}
            </span>
          </div>
          <button
            type="button"
            onClick={copyRef}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#EFE8DA] hover:bg-[#D49A2A]/20 text-[#8F2A12] text-xs font-semibold transition-colors border border-[#D49A2A]/30 cursor-pointer"
            aria-label="Copy booking reference number"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-600" /> Copied
              </>
            ) : (
              <>
                <Copy size={14} /> Copy
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-[#7A6357] mb-8">
          Please arrive 10 minutes prior to your reserved time. For any modifications, quote your reference number.
        </p>

        <button
          type="button"
          onClick={() => setSuccess(null)}
          className="text-[#A83216] font-semibold underline hover:text-[#8F2A12] transition-colors cursor-pointer text-sm"
        >
          Make another reservation
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-[#FCF8F3] border border-[#D49A2A]/30 rounded-2xl p-6 sm:p-10 shadow-sm flex flex-col gap-6"
    >
      <div className="border-b border-[#D49A2A]/20 pb-4">
        <h2
          className="text-2xl font-bold text-[#24130A]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Reserve a Table
        </h2>
        <p className="text-sm text-[#7A6357] mt-1">
          Enjoy authentic pure vegetarian cuisine at Gandharva Hotel.
        </p>
      </div>

      {/* Guest Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="table-customer-name" className="block text-[15px] font-semibold text-[#24130A] mb-1.5">
            Full Name <span className="text-[#A83216]">*</span>
          </label>
          <input
            id="table-customer-name"
            {...register("customerName")}
            placeholder="e.g. Ramesh Kulkarni"
            className="w-full bg-white/70 border border-[#D49A2A]/30 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-[#A83216] focus:ring-1 focus:ring-[#A83216] transition-all placeholder:text-[#8C7265] text-[#24130A]"
          />
          {errors.customerName && (
            <p className="text-red-600 text-[13px] mt-1.5 font-medium flex items-center gap-1">
              <AlertCircle size={13} /> {errors.customerName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="table-phone" className="block text-[15px] font-semibold text-[#24130A] mb-1.5">
            Phone Number <span className="text-[#A83216]">*</span>
          </label>
          <input
            id="table-phone"
            type="tel"
            {...register("phone")}
            placeholder="e.g. 9168163999"
            className="w-full bg-white/70 border border-[#D49A2A]/30 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-[#A83216] focus:ring-1 focus:ring-[#A83216] transition-all placeholder:text-[#8C7265] text-[#24130A]"
          />
          {errors.phone && (
            <p className="text-red-600 text-[13px] mt-1.5 font-medium flex items-center gap-1">
              <AlertCircle size={13} /> {errors.phone.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="table-email" className="block text-[15px] font-semibold text-[#24130A] mb-1.5">
            Email Address <span className="text-[#A83216]">*</span>
          </label>
          <input
            id="table-email"
            type="email"
            {...register("email")}
            placeholder="e.g. ramesh@example.com"
            className="w-full bg-white/70 border border-[#D49A2A]/30 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-[#A83216] focus:ring-1 focus:ring-[#A83216] transition-all placeholder:text-[#8C7265] text-[#24130A]"
          />
          {errors.email && (
            <p className="text-red-600 text-[13px] mt-1.5 font-medium flex items-center gap-1">
              <AlertCircle size={13} /> {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Reservation Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 border-t border-[#D49A2A]/15">
        <div>
          <label htmlFor="table-date" className="block text-[15px] font-semibold text-[#24130A] mb-1.5">
            Date <span className="text-[#A83216]">*</span>
          </label>
          <div className="relative">
            <input
              id="table-date"
              type="date"
              min={todayStr}
              {...register("date")}
              className="w-full bg-white/70 border border-[#D49A2A]/30 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-[#A83216] focus:ring-1 focus:ring-[#A83216] transition-all text-[#24130A]"
            />
          </div>
          {errors.date && (
            <p className="text-red-600 text-[13px] mt-1.5 font-medium flex items-center gap-1">
              <AlertCircle size={13} /> {errors.date.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="table-guests" className="block text-[15px] font-semibold text-[#24130A] mb-1.5">
            Number of Guests <span className="text-[#A83216]">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              id="table-guests"
              type="number"
              min={1}
              max={20}
              {...register("numberOfGuests", { valueAsNumber: true })}
              className="w-full bg-white/70 border border-[#D49A2A]/30 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-[#A83216] focus:ring-1 focus:ring-[#A83216] transition-all text-[#24130A]"
            />
          </div>
          {errors.numberOfGuests && (
            <p className="text-red-600 text-[13px] mt-1.5 font-medium flex items-center gap-1">
              <AlertCircle size={13} /> {errors.numberOfGuests.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="table-time" className="block text-[15px] font-semibold text-[#24130A] mb-1.5">
            Time <span className="text-[#A83216]">*</span>
          </label>
          <input
            id="table-time"
            {...register("time")}
            placeholder="e.g. 07:30 PM"
            className="w-full bg-white/70 border border-[#D49A2A]/30 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-[#A83216] focus:ring-1 focus:ring-[#A83216] transition-all text-[#24130A]"
          />
          {errors.time && (
            <p className="text-red-600 text-[13px] mt-1.5 font-medium flex items-center gap-1">
              <AlertCircle size={13} /> {errors.time.message}
            </p>
          )}
        </div>
      </div>

      {/* Quick Time Selector Chips */}
      <div>
        <span className="block text-xs font-semibold uppercase tracking-wider text-[#7A6357] mb-2">
          Select Popular Time Slot:
        </span>
        <div className="flex flex-wrap gap-2">
          {POPULAR_TIMES.map((slot) => {
            const isSelected = selectedTime === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => setValue("time", slot, { shouldValidate: true })}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#8F2A12] text-[#FFF7E8] font-bold shadow-xs"
                    : "bg-[#EFE8DA] text-[#3A2016] hover:bg-[#D49A2A]/20"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label htmlFor="table-special-requests" className="block text-[15px] font-semibold text-[#24130A] mb-1.5">
          Special Requests (Optional)
        </label>
        <textarea
          id="table-special-requests"
          rows={3}
          {...register("specialRequests")}
          placeholder="Any dietary restrictions (Jain food, etc.), high-chair requirements, birthday/anniversary setup..."
          className="w-full bg-white/70 border border-[#D49A2A]/30 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-[#A83216] focus:ring-1 focus:ring-[#A83216] transition-all placeholder:text-[#8C7265] text-[#24130A] resize-none"
        />
        {errors.specialRequests && (
          <p className="text-red-600 text-[13px] mt-1.5 font-medium">
            {errors.specialRequests.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#A83216] hover:bg-[#8F2A12] text-[#FFF7E8] font-semibold text-base py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <>
              <Spinner size={18} /> Submitting Reservation...
            </>
          ) : (
            <>
              <UtensilsCrossed size={18} /> Confirm Table Reservation
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 mt-4 text-[#7A6357] text-[13px] font-medium text-center">
          <Clock size={14} className="text-[#D49A2A]" />
          Instant reservation confirmation. We hold tables for up to 15 minutes past booking time.
        </div>
      </div>
    </form>
  );
}

export default TableBookingForm;
