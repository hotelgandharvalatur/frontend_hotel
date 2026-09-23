"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { reviewsService } from "@/services/reviews.service";
import { Review } from "@/types";
import { StarRating } from "@/components/ui/StarRating";
import { Button, LinkButton } from "@/components/ui/Button";
import { Spinner, PageLoader } from "@/components/ui/Spinner";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const schema = z.object({
  customerName: z.string().min(2, "Name is required"),
  rating: z.number().min(1, "Rating is required").max(5),
  review: z.string().min(10, "Review must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useScrollReveal();

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await reviewsService.listReviews({ approved: true, limit: 50 });
      setReviews(result.reviews);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadReviews(); }, [loadReviews]);

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await reviewsService.addReview(data);
      toast.success("Review submitted! It'll appear once approved.");
      reset();
      setSelectedRating(0);
      setSubmitted(true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={containerRef as React.Ref<HTMLDivElement>} className="bg-[#F5E9D2] min-h-screen text-[#24130A]" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>
      {/* Hero Section */}
      <section 
        className="relative flex flex-col items-center justify-center py-40 bg-black overflow-hidden"
      >
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: `url('${getCloudinaryUrl("hotel-gandharva/hero/IMG_2740")}')` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
        
        <div className="relative z-10 text-center flex flex-col items-center px-4 reveal">
          <div className="flex items-center justify-center gap-4 mb-4">
             <span className="w-12 h-px bg-[#D49A2A]"></span>
             <span className="uppercase text-[#D49A2A] tracking-[0.2em] text-xs font-semibold">Guest Reviews</span>
             <span className="w-12 h-px bg-[#D49A2A]"></span>
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-medium mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            What Our Guests Say
          </h1>
          <div className="flex items-center justify-center gap-2">
            <span className="w-16 h-px bg-[#D49A2A]"></span>
            <div className="w-2 h-2 rotate-45 bg-[#D49A2A]"></div>
            <span className="w-16 h-px bg-[#D49A2A]"></span>
          </div>
        </div>
      </section>

      {/* Leave a Review Section */}
      <section className="py-24 px-4 reveal stagger-1">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-8 h-px bg-[#D49A2A]"></span>
              <span className="uppercase text-[#D49A2A] tracking-[0.15em] text-xs font-bold">Share Your Experience</span>
              <span className="w-8 h-px bg-[#D49A2A]"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Leave a Review
            </h2>
          </div>

          <div className="border border-[#e4d5bc] rounded-2xl p-8 md:p-12 bg-[#FCF8F3]">
            {submitted ? (
              <div className="text-center py-12 reveal">
                <p className="text-xl font-medium text-[#A83216] mb-2">Thank You!</p>
                <p className="text-[#8C7265]">Your review has been submitted and is pending approval.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-[#A83216] underline text-sm font-medium hover:text-[#8F2A12] transition-colors"
                >
                  Submit another review
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6 reveal stagger-2">
                <div>
                  <label className="block text-sm font-bold text-[#24130A] mb-3">Your Rating *</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => {
                          setSelectedRating(star);
                          setValue("rating", star);
                        }}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <svg width={32} height={32} viewBox="0 0 20 20" fill="none">
                          <path
                            d="M10 1.5L12.39 6.26L17.73 7.04L13.87 10.8L14.79 16.12L10 13.6L5.21 16.12L6.13 10.8L2.27 7.04L7.61 6.26L10 1.5Z"
                            fill={star <= (hoveredRating || selectedRating) ? "#D49A2A" : "transparent"}
                            stroke="#D49A2A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                  {errors.rating && <p className="text-red-500 text-xs mt-2 font-medium">{errors.rating.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#24130A] mb-2">Your Name *</label>
                  <input
                    {...register("customerName")}
                    placeholder="Enter your name"
                    className="w-full bg-transparent border border-[#e4d5bc] rounded-md px-4 py-3.5 text-sm focus:outline-none focus:border-[#A83216] focus:ring-1 focus:ring-[#A83216] transition-all placeholder:text-[#A38C81]"
                  />
                  {errors.customerName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.customerName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#24130A] mb-2">Your Review *</label>
                  <textarea
                    {...register("review")}
                    placeholder="Share your experience with us..."
                    rows={6}
                    className="w-full bg-transparent border border-[#e4d5bc] rounded-md px-4 py-3.5 text-sm focus:outline-none focus:border-[#A83216] focus:ring-1 focus:ring-[#A83216] transition-all resize-none placeholder:text-[#A38C81]"
                  />
                  {errors.review && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.review.message}</p>}
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitting}
                    className="px-10 py-3.5 rounded-md"
                  >
                    {submitting ? <><Spinner size={16} /> Submitting...</> : "Submit Review"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Reviews List Section */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-medium mb-5" style={{ fontFamily: "var(--font-display)" }}>
              What Our Guests Are Saying
            </h2>
            <div className="flex items-center justify-center gap-2">
              <span className="w-12 h-px bg-[#D49A2A]"></span>
              <div className="w-1.5 h-1.5 rotate-45 bg-[#D49A2A]"></div>
              <span className="w-12 h-px bg-[#D49A2A]"></span>
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center"><PageLoader /></div>
          ) : error ? (
            <div className="text-center py-20 text-[#8C7265]">Failed to load reviews. Please try again later.</div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20 text-[#8C7265]">No reviews yet. Be the first to share your experience!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviews.map((review, i) => {
                const initials = review.customerName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                return (
                  <div key={review._id} className={`border border-[#e4d5bc] rounded-2xl p-7 bg-[#FCF8F3] flex flex-col reveal stagger-${Math.min((i % 6) + 1, 6)}`}>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-full bg-[#EADDCD] flex items-center justify-center text-[#24130A] font-bold text-lg shrink-0">
                        {initials}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#24130A] leading-tight">{review.customerName}</h3>
                        <StarRating rating={review.rating} size={14} className="mt-1.5" />
                      </div>
                    </div>
                    <p className="text-[15px] text-[#3A2016] mb-8 flex-1 leading-relaxed">
                      {review.review}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#8C7265] font-medium pt-4 border-t border-[#e4d5bc]/50">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>
                        {new Date(review.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="pb-24 px-4 reveal">
        <div className="max-w-5xl mx-auto border border-[#e4d5bc] rounded-2xl p-10 bg-[#FCF8F3] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 opacity-[0.03] pointer-events-none">
            <svg width="300" height="300" viewBox="0 0 100 100">
              <path d="M50 0 C60 40, 100 50, 50 100 C40 60, 0 50, 50 0" fill="#24130A" />
              <path d="M0 0 L100 100 M100 0 L0 100" stroke="#24130A" strokeWidth="2" />
              <circle cx="50" cy="50" r="45" stroke="#24130A" strokeWidth="1" fill="none" />
              <circle cx="50" cy="50" r="35" stroke="#24130A" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="25" stroke="#24130A" strokeWidth="1" fill="none" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 opacity-[0.03] pointer-events-none">
            <svg width="300" height="300" viewBox="0 0 100 100">
              <path d="M50 0 C60 40, 100 50, 50 100 C40 60, 0 50, 50 0" fill="#24130A" />
              <path d="M0 0 L100 100 M100 0 L0 100" stroke="#24130A" strokeWidth="2" />
              <circle cx="50" cy="50" r="45" stroke="#24130A" strokeWidth="1" fill="none" />
              <circle cx="50" cy="50" r="35" stroke="#24130A" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="25" stroke="#24130A" strokeWidth="1" fill="none" />
            </svg>
          </div>

          <div className="flex items-center gap-6 relative z-10 flex-col md:flex-row text-center md:text-left">
            <div className="w-[72px] h-[72px] rounded-full border border-[#D49A2A] flex items-center justify-center bg-[#FCF8F3] shrink-0 shadow-sm">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D49A2A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                <path d="M9 12h.01"></path>
                <path d="M15 12h.01"></path>
                <path d="M12 12h.01"></path>
                <path d="M16 8l-2.5 2.5a2 2 0 0 1-2.828 0L9.5 9.328a2 2 0 0 0-2.828 0L4 12" strokeWidth="1" opacity="0.3"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#24130A] mb-2" style={{ fontFamily: "var(--font-display)" }}>We value your feedback!</h3>
              <p className="text-[15px] text-[#3A2016] leading-relaxed">Your reviews help us serve you better and<br className="hidden md:block" /> make every experience memorable.</p>
            </div>
          </div>
          <div className="relative z-10">
            <LinkButton href="/contact" variant="primary" className="px-8 py-3.5 flex items-center gap-2.5 rounded-md text-[15px]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Book a Table
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
