"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, Layers, ExternalLink, ArrowRight, Heart } from "lucide-react";
import type { InstagramMediaItem } from "@/app/api/instagram/route";

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/gandharvapureveg_latur";

const InstagramIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

function formatInstagramDate(timestampStr?: string): string {
  if (!timestampStr) return "";
  const date = new Date(timestampStr);
  if (isNaN(date.getTime())) return "";

  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0 && now.getDate() === date.getDate()) {
    return "Today";
  }
  if (diffDays === 1 || (diffDays === 0 && now.getDate() !== date.getDate())) {
    return "Yesterday";
  }

  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function InstagramSection() {
  const [posts, setPosts] = useState<InstagramMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    let isMounted = true;
    async function fetchInstagramFeed() {
      try {
        const res = await fetch("/api/instagram");
        const json = await res.json();
        if (isMounted) {
          if (json?.success && Array.isArray(json.data) && json.data.length > 0) {
            setPosts(json.data);
          } else {
            setError(true);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchInstagramFeed();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayedPosts = posts.slice(0, visibleCount);

  return (
    <section className="py-16 md:py-20 px-4 md:px-8" style={{ backgroundColor: "#F5E9D2" }}>
      <div className="container-wide mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4 text-center md:text-left">
          <div>
            <p className="eyebrow mb-2 font-bold tracking-widest text-xs" style={{ color: "#A83216" }}>
              FOLLOW US ON INSTAGRAM
            </p>
            <h2
              className="text-[28px] md:text-[36px] font-display font-semibold flex items-center justify-center md:justify-start gap-3"
              style={{ color: "#24130A", fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
            >
              <InstagramIcon size={28} className="text-[#A83216] shrink-0" />
              @gandharvapureveg_latur
            </h2>
            <div className="w-16 h-[2px] mt-3 mx-auto md:mx-0" style={{ backgroundColor: "#D49A2A" }} />
          </div>

          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold px-6 py-3 rounded-md transition-all duration-200 shadow-sm"
            style={{ backgroundColor: "#A83216", color: "#FFF7E8" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#8F2A12")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#A83216")}
          >
            Visit Profile <ArrowRight size={16} />
          </a>
        </div>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-full aspect-square rounded-md animate-pulse"
                style={{ backgroundColor: "rgba(36, 19, 10, 0.08)", border: "1px solid rgba(212, 154, 42, 0.2)" }}
              />
            ))}
          </div>
        )}

        {/* Success Grid */}
        {!loading && !error && displayedPosts.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {displayedPosts.map((post) => {
                const displayUrl = post.media_type === "VIDEO" && post.thumbnail_url ? post.thumbnail_url : post.media_url;
                const formattedDate = formatInstagramDate(post.timestamp);

                return (
                  <a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative w-full aspect-square rounded-md overflow-hidden block shadow-sm border"
                    style={{ borderColor: "rgba(212, 154, 42, 0.25)", backgroundColor: "#24130A" }}
                  >
                    <Image
                      src={displayUrl}
                      alt={post.caption || "Gandharva Hotel Instagram Post"}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized={displayUrl.includes("cdninstagram") || displayUrl.includes("fbcdn")}
                      onError={(e) => {
                        e.currentTarget.style.opacity = "0.7";
                      }}
                    />

                    {/* Media Type Badges */}
                    {post.media_type === "VIDEO" && (
                      <div className="absolute top-2.5 right-2.5 bg-[#24130A]/80 text-[#FFF7E8] p-1.5 rounded-full shadow-md backdrop-blur-xs z-10">
                        <Play size={14} className="fill-current" />
                      </div>
                    )}

                    {post.media_type === "CAROUSEL_ALBUM" && (
                      <div className="absolute top-2.5 right-2.5 bg-[#24130A]/80 text-[#FFF7E8] p-1.5 rounded-full shadow-md backdrop-blur-xs z-10">
                        <Layers size={14} />
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#24130A]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-[#FFF7E8] z-20">
                      <div className="flex items-center justify-between text-xs">
                        {typeof post.like_count === "number" && post.like_count > 0 ? (
                          <span className="flex items-center gap-1 text-[#FFF7E8]/90 font-semibold text-[11px]">
                            <Heart size={13} className="text-[#D49A2A] fill-[#D49A2A]" />
                            {post.like_count}
                          </span>
                        ) : (
                          <span />
                        )}
                        <ExternalLink size={15} className="text-[#D49A2A]" />
                      </div>

                      <p className="text-[12px] leading-snug line-clamp-2 font-sans opacity-95">
                        {post.caption || "View on Instagram"}
                      </p>

                      <div className="flex items-center justify-between text-[11px] font-semibold pt-1 border-t border-[#FFF7E8]/15">
                        <span className="text-[#FFF7E8]/80 font-sans">{formattedDate}</span>
                        <span className="text-[#D49A2A] tracking-wider uppercase">
                          View →
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* View More Posts Button */}
            {posts.length > visibleCount && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 6, posts.length))}
                  className="inline-flex items-center gap-2 text-xs md:text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-200 border"
                  style={{
                    borderColor: "#A83216",
                    color: "#A83216",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#A83216";
                    e.currentTarget.style.color = "#FFF7E8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#A83216";
                  }}
                >
                  View More Posts ({posts.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}

        {/* Graceful Fallback (If API returns empty/error or token unconfigured) */}
        {!loading && (error || posts.length === 0) && (
          <div
            className="rounded-lg p-8 md:p-12 text-center border shadow-sm flex flex-col items-center justify-center max-w-3xl mx-auto"
            style={{ backgroundColor: "#EFE8DA", borderColor: "rgba(212, 154, 42, 0.3)" }}
          >
            <div className="w-14 h-14 rounded-full bg-[#A83216] flex items-center justify-center text-[#FFF7E8] mb-4 shadow-sm">
              <InstagramIcon size={28} />
            </div>
            <h3
              className="text-2xl font-display font-semibold mb-2"
              style={{ color: "#24130A", fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
            >
              Connect With Us On Instagram
            </h3>
            <p className="text-sm max-w-md mb-6" style={{ color: "rgba(36, 19, 10, 0.75)" }}>
              Follow <strong style={{ color: "#A83216" }}>@gandharvapureveg_latur</strong> for daily pure veg menu updates, special offers, customer reviews &amp; event highlights.
            </p>
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold px-8 py-3.5 rounded-md transition-all shadow-md"
              style={{ backgroundColor: "#A83216", color: "#FFF7E8" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#8F2A12")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#A83216")}
            >
              <InstagramIcon size={18} /> Follow @gandharvapureveg_latur
            </a>
          </div>
        )}

      </div>
    </section>
  );
}

