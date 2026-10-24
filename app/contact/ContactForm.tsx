"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { contactService } from "@/services/contact.service";
import { Spinner } from "@/components/ui/Spinner";
import { Check, Send } from "lucide-react";

const schema = z.object({
  customerName: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        phone: data.phone && data.phone.trim().length > 0 ? data.phone.trim() : undefined,
      };
      await contactService.createInquiry(payload);
      setSuccess(true);
      reset();
      toast.success("Message sent successfully!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 text-center bg-[#EFE8DA] rounded-xl border border-[#D49A2A]/30">
        <div className="w-16 h-16 bg-[#8F2A12] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-[#FFF7E8]">
          <Check size={32} />
        </div>
        <h3 className="text-2xl font-bold text-[#8F2A12] mb-3" style={{ fontFamily: "var(--font-display)" }}>Message Sent!</h3>
        <p className="text-[#3A2016] mb-8">We've received your inquiry and will get back to you shortly.</p>
        <button
          onClick={() => setSuccess(false)}
          className="text-[#A83216] font-semibold underline hover:text-[#8F2A12] transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div>
        <label className="block text-[15px] font-semibold text-[#24130A] mb-2">Your Name <span className="text-[#A83216]">*</span></label>
        <input
          {...register("customerName")}
          placeholder="Enter your name"
          className="w-full bg-transparent border border-[#D49A2A]/30 rounded-md px-4 py-3.5 text-base focus:outline-none focus:border-[#A83216] focus:ring-1 focus:ring-[#A83216] transition-all placeholder:text-[#8C7265] text-[#24130A]"
        />
        {errors.customerName && <p className="text-red-600 text-[13px] mt-1.5 font-medium">{errors.customerName.message}</p>}
      </div>

      <div>
        <label className="block text-[15px] font-semibold text-[#24130A] mb-2">Email Address <span className="text-[#A83216]">*</span></label>
        <input
          type="email"
          {...register("email")}
          placeholder="Enter your email"
          className="w-full bg-transparent border border-[#D49A2A]/30 rounded-md px-4 py-3.5 text-base focus:outline-none focus:border-[#A83216] focus:ring-1 focus:ring-[#A83216] transition-all placeholder:text-[#8C7265] text-[#24130A]"
        />
        {errors.email && <p className="text-red-600 text-[13px] mt-1.5 font-medium">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-[15px] font-semibold text-[#24130A] mb-2">Phone (optional)</label>
        <input
          type="tel"
          {...register("phone")}
          placeholder="Enter your phone number"
          className="w-full bg-transparent border border-[#D49A2A]/30 rounded-md px-4 py-3.5 text-base focus:outline-none focus:border-[#A83216] focus:ring-1 focus:ring-[#A83216] transition-all placeholder:text-[#8C7265] text-[#24130A]"
        />
        {errors.phone && <p className="text-red-600 text-[13px] mt-1.5 font-medium">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-[15px] font-semibold text-[#24130A] mb-2">Subject <span className="text-[#A83216]">*</span></label>
        <input
          {...register("subject")}
          placeholder="Enter subject"
          className="w-full bg-transparent border border-[#D49A2A]/30 rounded-md px-4 py-3.5 text-base focus:outline-none focus:border-[#A83216] focus:ring-1 focus:ring-[#A83216] transition-all placeholder:text-[#8C7265] text-[#24130A]"
        />
        {errors.subject && <p className="text-red-600 text-[13px] mt-1.5 font-medium">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="block text-[15px] font-semibold text-[#24130A] mb-2">Your Message <span className="text-[#A83216]">*</span></label>
        <textarea
          {...register("message")}
          placeholder="Type your message here..."
          rows={6}
          className="w-full bg-transparent border border-[#D49A2A]/30 rounded-md px-4 py-3.5 text-base focus:outline-none focus:border-[#A83216] focus:ring-1 focus:ring-[#A83216] transition-all resize-none placeholder:text-[#8C7265] text-[#24130A]"
        />
        {errors.message && <p className="text-red-600 text-[13px] mt-1.5 font-medium">{errors.message.message}</p>}
      </div>

      <div className="mt-2 text-center">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#A83216] hover:bg-[#8F2A12] text-[#FFF7E8] font-semibold text-base py-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <><Spinner size={18} /> Sending...</>
          ) : (
            <><Send size={18} /> Send Message</>
          )}
        </button>
        <div className="flex items-center justify-center gap-2 mt-4 text-[#7A6357] text-[13px] font-medium">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          We respect your privacy and never share your information.
        </div>
      </div>
    </form>
  );
}
