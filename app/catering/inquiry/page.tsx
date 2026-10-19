"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Check, Copy, Send, ChefHat, ConciergeBell, Users, ScrollText } from "lucide-react";
import { cateringService } from "@/services/catering.service";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  customerName: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  eventDate: z.string().min(1, "Event date is required"),
  eventTime: z.string().optional(),
  location: z.string().min(3, "Location is required"),
  numberOfGuests: z.number().min(1, "At least 1 guest required"),
  selectedPackage: z.string().optional(),
  foodRequirements: z.string().optional(),
  additionalRequirements: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const Diamond = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-4 text-[#D49A2A]">
    <rect x="5" y="0" width="7.07107" height="7.07107" transform="rotate(45 5 0)" fill="currentColor"/>
  </svg>
);

const Divider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center w-full max-w-[150px] mx-auto ${className}`}>
    <div className="h-px bg-[#D49A2A] w-full opacity-50"></div>
    <Diamond />
    <div className="h-px bg-[#D49A2A] w-full opacity-50"></div>
  </div>
);

const SideDecoration = ({ side }: { side: 'left' | 'right' }) => (
  <div 
    className={`absolute top-1/2 pointer-events-none overflow-hidden ${side === 'left' ? 'left-0' : 'right-0'}`}
    style={{
      transform: `translateY(-50%) ${side === 'right' ? 'scaleX(-1)' : ''}`,
      width: 'clamp(80px, 12vw, 150px)',
      height: 'clamp(350px, 70vh, 600px)',
      zIndex: 0
    }}
  >
    <svg 
      viewBox="150 0 150 600" 
      preserveAspectRatio="xMinYMid slice"
      fill="none" 
      stroke="#D49A2A" 
      className="w-full h-full"
    >
      <g transform="translate(150, 300)">
        <circle cx="0" cy="0" r="140" strokeWidth="1" />
        <circle cx="0" cy="0" r="130" strokeDasharray="4 6" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="100" strokeWidth="1" />
        <circle cx="0" cy="0" r="85" strokeDasharray="2 4" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="60" strokeWidth="1" />
        
        {[...Array(12)].map((_, i) => (
          <g key={`inner-${i}`} transform={`rotate(${i * 30})`}>
            <path d="M 0,-20 C 15,-35 15,-45 0,-60 C -15,-45 -15,-35 0,-20" strokeWidth="1" />
          </g>
        ))}

        {[...Array(16)].map((_, i) => (
          <g key={`mid-${i}`} transform={`rotate(${i * 22.5})`}>
            <path d="M 0,-60 C 20,-75 20,-85 0,-100 C -20,-85 -20,-75 0,-60" strokeWidth="1" />
          </g>
        ))}

        {[...Array(8)].map((_, i) => (
          <g key={`out-${i}`} transform={`rotate(${i * 45})`}>
            <path d="M 0,-100 C 35,-125 45,-140 0,-175 C -45,-140 -35,-125 0,-100" strokeWidth="1.5" />
            <path d="M 0,-115 L 0,-165" strokeWidth="1" />
            <circle cx="0" cy="-180" r="3" fill="#D49A2A" stroke="none" />
          </g>
        ))}

        <path d="M 0,-185 Q 30,-240 0,-290 Q -30,-240 0,-185" strokeWidth="1.5" />
        <path d="M 0,-200 L 0,-280" strokeWidth="1" />
        <circle cx="0" cy="-295" r="4" fill="#D49A2A" stroke="none" />
        <path d="M -15,-235 Q -30,-260 -50,-240 Q -30,-230 -15,-235" strokeWidth="1" />
        <path d="M 15,-235 Q 30,-260 50,-240 Q 30,-230 15,-235" strokeWidth="1" />
        
        <path d="M 0,185 Q 30,240 0,290 Q -30,240 0,185" strokeWidth="1.5" />
        <path d="M 0,200 L 0,280" strokeWidth="1" />
        <circle cx="0" cy="295" r="4" fill="#D49A2A" stroke="none" />
        <path d="M -15,235 Q -30,260 -50,240 Q -30,230 -15,235" strokeWidth="1" />
        <path d="M 15,235 Q 30,260 50,240 Q 30,230 15,235" strokeWidth="1" />
      </g>
    </svg>
  </div>
);

const InputField = React.forwardRef(({ label, id, error, ...props }: any, ref) => (
  <div className="flex flex-col gap-2 relative z-20">
    <label htmlFor={id} className="text-[#24130A] text-[15px] font-semibold">{label}</label>
    <input 
      ref={ref}
      id={id}
      className={`w-full px-4 py-3 rounded-md border ${error ? 'border-red-500' : 'border-[rgba(36,19,10,0.15)]'} bg-[rgba(255,255,255,0.6)] focus:bg-white focus:outline-none focus:border-[#D49A2A] text-[#24130A] text-base placeholder:text-[#8C7265] transition-all shadow-sm`}
      {...props} 
    />
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
));
InputField.displayName = "InputField";

const TextareaField = React.forwardRef(({ label, id, error, ...props }: any, ref) => (
  <div className="flex flex-col gap-2 h-full relative z-20">
    <label htmlFor={id} className="text-[#24130A] text-[15px] font-semibold">{label}</label>
    <textarea 
      ref={ref}
      id={id}
      className={`w-full px-4 py-3 rounded-md border ${error ? 'border-red-500' : 'border-[rgba(36,19,10,0.15)]'} bg-[rgba(255,255,255,0.6)] focus:bg-white focus:outline-none focus:border-[#D49A2A] text-[#24130A] text-base placeholder:text-[#8C7265] transition-all resize-none h-[120px] lg:h-full shadow-sm`}
      {...props} 
    />
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
));
TextareaField.displayName = "TextareaField";

export default function CateringInquiryPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ referenceNumber: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const result = await cateringService.createInquiry({
        ...data,
        selectedPackage: data.selectedPackage || undefined,
      });
      setSuccess({ referenceNumber: result.referenceNumber });
      reset();
      toast.success("Inquiry submitted!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to submit inquiry.");
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
      <div className="min-h-screen flex items-center justify-center section-padding" style={{ backgroundColor: "#F6E9D7" }}>
        <div className="text-center max-w-md">
          <div className="w-px h-16 bg-gradient-to-b from-[#A83216] to-transparent mx-auto mb-8" />
          <p className="eyebrow mb-4 text-[#A83216]">Inquiry Received</p>
          <h1 className="display-md mb-3 text-[#24130A]" style={{ fontFamily: "var(--font-display)" }}>Thank You!</h1>
          <p className="body-lg mb-8 text-[#24130A]">Our catering team will be in touch within 24 hours.</p>
          <div className="flex items-center justify-between gap-4 px-6 py-4 rounded-sm mb-8" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(212,154,42,0.4)" }}>
            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A83216] mb-1">Reference Number</p>
              <p className="font-mono font-semibold text-xl text-[#24130A]">{success.referenceNumber}</p>
            </div>
            <button onClick={copyRef} className="p-2 rounded-sm hover:bg-[rgba(212,154,42,0.1)] transition-colors" aria-label="Copy">
              {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} className="text-[#24130A]" />}
            </button>
          </div>
          <Button variant="outline" onClick={() => setSuccess(null)} style={{ borderColor: "#A83216", color: "#A83216" }}>Submit Another</Button>
        </div>
      </div>
    );
  }

  const whyUsItems = [
    { num: "01", icon: ChefHat, title: "Chef-Led Teams", desc: "Our experienced chefs bring the same passion that drives our restaurant kitchen to every catering event." },
    { num: "02", icon: ConciergeBell, title: "Premium Ingredients", desc: "We use the finest, freshest ingredients to craft dishes that are rich in taste and memorable in every bite." },
    { num: "03", icon: Users, title: "Seamless Service", desc: "Our professional team ensures smooth planning, timely execution and flawless service at every event." },
    { num: "04", icon: ScrollText, title: "Customized Menus", desc: "From traditional favorites to special dietary needs, we curate menus that perfectly match your occasion." }
  ];

  return (
    <div style={{ backgroundColor: "#F6E9D7", color: "#24130A" }} className="min-h-screen relative overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 text-center z-10">
        <SideDecoration side="left" />
        <SideDecoration side="right" />
        
        <div className="container-wide mx-auto px-4 relative z-20">
          <p className="text-[#A83216] text-xs font-bold tracking-[0.2em] uppercase mb-4">CATERING INQUIRY</p>
          <h1 className="display-xl max-w-4xl mx-auto mb-6 text-[#24130A]" style={{ fontFamily: "var(--font-display)" }}>
            Request a Quote
          </h1>
          <Divider className="mb-6" />
          <p className="body-lg max-w-xl mx-auto text-[#24130A] opacity-90">
            Tell us about your event and we&apos;ll<br className="hidden md:block"/>craft a custom catering proposal for you.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 relative z-20">
        <div className="container-wide mx-auto px-4 lg:px-8">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto mb-16">
              
              {/* Column 1 */}
              <div className="flex flex-col gap-6">
                <h2 className="text-[#A83216] font-bold text-[15px] mb-2">Your Details</h2>
                <InputField label="Full Name" id="customerName" placeholder="Enter your full name" error={errors.customerName?.message} {...register("customerName")} />
                <InputField label="Phone Number" id="phone" type="tel" placeholder="Enter your phone number" error={errors.phone?.message} {...register("phone")} />
                <InputField label="Email Address" id="email" type="email" placeholder="Enter your email address" error={errors.email?.message} {...register("email")} />
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-6">
                <h2 className="text-[#A83216] font-bold text-[15px] mb-2">Event Details</h2>
                <InputField label="Event Date" id="eventDate" type="date" placeholder="Select date" error={errors.eventDate?.message} {...register("eventDate")} />
                <InputField label="Event Time (optional)" id="eventTime" type="time" placeholder="Select time" error={errors.eventTime?.message} {...register("eventTime")} />
                <InputField label="Event Location / Venue Address" id="location" placeholder="Enter venue address" error={errors.location?.message} {...register("location")} />
                <InputField label="Number of Guests" id="numberOfGuests" type="number" min={1} placeholder="Enter approximate number of guests" error={errors.numberOfGuests?.message} {...register("numberOfGuests", { valueAsNumber: true })} />
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-6 lg:h-full">
                <h2 className="text-[#A83216] font-bold text-[15px] mb-2">Preferences</h2>
                <TextareaField label="Food Requirements / Dietary Restrictions" id="foodRequirements" placeholder="e.g., Jain food, No onion garlic, Vegan, Allergies, etc." error={errors.foodRequirements?.message} {...register("foodRequirements")} />
                <TextareaField label="Additional Requirements" id="additionalRequirements" placeholder="Any other specific requirements or requests" error={errors.additionalRequirements?.message} {...register("additionalRequirements")} />
              </div>

            </div>

            {/* Submit Button */}
            <div className="text-center mb-6">
              <button 
                type="submit" 
                disabled={loading} 
                className="inline-flex items-center gap-2 text-[15px] font-bold px-10 py-4 rounded-md transition-all hover:bg-[#8F2A12] shadow-sm relative z-20 cursor-pointer" 
                style={{ backgroundColor: "#A83216", color: "#FFF7E8" }}
              >
                {loading ? <Spinner size={16} /> : <Send size={16} />}
                Submit Inquiry
              </button>
              <p className="mt-4 text-[#24130A] text-[14px] opacity-85">We will get back to you within 24 hours.</p>
            </div>
            
          </form>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="pb-24 relative z-20">
        <div className="container-wide mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
              {whyUsItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col items-start text-left px-4 ${idx !== whyUsItems.length - 1 ? 'lg:border-r border-[rgba(36,19,10,0.1)]' : ''}`}
                >
                  <div className="relative shrink-0 mb-6 mx-auto lg:mx-0">
                     <div className="w-24 h-24 rounded-full flex items-center justify-center border border-[rgba(212,154,42,0.3)]" style={{ backgroundColor: "#FCECD4" }}>
                        <item.icon size={36} className="text-[#D49A2A]" strokeWidth={1.5} />
                     </div>
                  </div>
                  <h3 className="text-[#24130A] mb-3 text-[18px] font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {item.title}
                  </h3>
                  <p className="text-[#24130A] opacity-80 text-[14px] leading-relaxed pr-2">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
