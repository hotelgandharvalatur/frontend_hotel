"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Play, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { galleryService } from "@/services/gallery.service";
import { GalleryItem } from "@/types";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CATEGORIES = ["All", "Restaurant", "Banquet", "Events", "Catering", "Other"];
const MEDIA_TYPES = [
  { id: "all", label: "All Media" },
  { id: "image", label: "Photos" },
  { id: "video", label: "Videos" }
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const containerRef = useScrollReveal();

  const load = useCallback(async (pageNum: number) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);
    
    setError(false);
    try {
      const result = await galleryService.listGallery({
        type: filter !== "all" ? filter : undefined,
        category: category !== "All" ? category : undefined,
        page: pageNum,
        limit: 12,
      });
      
      if (pageNum === 1) {
        setItems(result.items);
      } else {
        setItems(prev => [...prev, ...result.items]);
      }
      setTotalPages(result.totalPages);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [filter, category]);

  useEffect(() => {
    setPage(1);
    load(1);
  }, [filter, category, load]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
      load(page + 1);
    }
  };

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { 
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight" && lightboxIndex !== null) handleNext();
      if (e.key === "ArrowLeft" && lightboxIndex !== null) handlePrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }); // Removed dependency array so it binds current handlers

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null && items.length > 0) {
      setLightboxIndex((prev) => (prev! + 1) % items.length);
    }
  }, [lightboxIndex, items.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null && items.length > 0) {
      setLightboxIndex((prev) => (prev! - 1 + items.length) % items.length);
    }
  }, [lightboxIndex, items.length]);

  const activeItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <div ref={containerRef as React.Ref<HTMLDivElement>} className="bg-[#F5E9D2] min-h-screen flex flex-col">
      {/* 1. Hero Section */}
      <section className="pt-28 md:pt-36 pb-10 relative z-10 text-center">
        <div className="container mx-auto px-6 reveal">
           <p className="text-[#8F2A12] text-[13px] font-semibold tracking-[0.2em] uppercase mb-4">GALLERY</p>
           <h1 className="text-[3rem] md:text-[4rem] text-[#24130A] mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Moments, Captured
           </h1>
           <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-8 h-[1px] bg-[#D49A2A]"></span>
              <div className="w-1.5 h-1.5 rotate-45 bg-[#D49A2A]"></div>
              <span className="w-8 h-[1px] bg-[#D49A2A]"></span>
           </div>
           <p className="text-[#24130A]/80 text-[1.1rem] max-w-2xl mx-auto">
             Every celebration, gathering and dining experience tells a story.
           </p>
        </div>
      </section>

      {/* 2. Filters Section */}
      <section className="py-6 relative z-20">
        <div className="container mx-auto px-6 reveal stagger-1">
          {/* Media Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {MEDIA_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id as any)}
                className={`text-[14.5px] font-semibold tracking-wide px-8 py-2.5 rounded-full transition-all duration-300 ${
                  filter === t.id
                    ? "bg-[#59160a] text-[#FFF7E8] shadow-md border border-[#59160a]"
                    : "bg-[#FCF8F3] text-[#59160a] border border-[#D49A2A]/20 hover:border-[#D49A2A]/50 hover:bg-[#F5E9D2]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-[14.5px] font-semibold tracking-wide px-6 py-2 rounded-full transition-all duration-300 ${
                  category === cat
                    ? "bg-[#59160a] text-[#FFF7E8] shadow-sm border border-[#59160a]"
                    : "bg-transparent text-[#24130A] border border-[#24130A]/20 hover:border-[#D49A2A] hover:text-[#59160a]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Gallery Grid */}
      <section className="flex-grow pb-24 pt-8 relative z-10">
        <div className="container mx-auto max-w-6xl px-6 reveal stagger-2">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="aspect-[4/3] rounded-xl bg-[#EFE8DA] animate-pulse border border-[#D49A2A]/10" />
              ))}
            </div>
          ) : error ? (
            <div className="py-12 text-center text-[#8F2A12]">Couldn't load the gallery right now.</div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center max-w-md mx-auto">
              <p className="text-[#8F2A12] font-semibold tracking-widest text-[13px] uppercase mb-3">NO MEMORIES YET</p>
              <p className="text-[#24130A]/70 text-[15px]">No gallery items found for this category.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, i) => (
                  <div
                    key={item._id}
                    className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm border border-[#D49A2A]/10 hover:shadow-xl transition-all duration-500 bg-[#EFE8DA] aspect-[4/3]"
                    onClick={() => setLightboxIndex(i)}
                  >
                    {item.type === "image" ? (
                      <Image
                        src={item.url}
                        alt={item.title || "Gallery image"}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <>
                        <video
                          src={item.url}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          muted
                          playsInline
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-[#FCF8F3]/90 flex items-center justify-center text-[#59160a] shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Play size={20} className="ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </>
                    )}
                    {/* Subtle dark overlay on hover */}
                    <div className="absolute inset-0 bg-[#24130A]/0 group-hover:bg-[#24130A]/20 transition-colors duration-500" />
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {page < totalPages && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="bg-[#59160a] hover:bg-[#8F2A12] text-[#FFF7E8] font-bold tracking-wide px-10 py-3.5 rounded-md shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {loadingMore ? <Loader2 className="animate-spin" size={18} /> : null}
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* 4. Lightbox */}
      {activeItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#24130A]/95 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Prev Arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 md:left-8 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next Arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 md:right-8 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>

          <div
            className="relative w-full max-w-5xl h-full max-h-[85vh] flex flex-col items-center justify-center px-16"
            onClick={(e) => e.stopPropagation()}
          >
            {activeItem.type === "image" ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={activeItem.url}
                  alt={activeItem.title || "Gallery"}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="100vw"
                  priority
                />
              </div>
            ) : (
              <div className="relative w-full max-w-4xl aspect-video rounded-md overflow-hidden shadow-2xl bg-black">
                <video
                  src={activeItem.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            
            {/* Lightbox Caption */}
            {(activeItem.title || activeItem.category) && (
              <div className="absolute bottom-[-50px] text-center w-full pb-4">
                {activeItem.title && <h3 className="text-white text-[1.1rem] font-medium tracking-wide mb-1">{activeItem.title}</h3>}
                {activeItem.category && <p className="text-white/60 text-[13px] uppercase tracking-wider">{activeItem.category}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
