"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { restaurantService } from "@/services/restaurant.service";
import { MenuItem, RestaurantCategory } from "@/types";
import { EmptyState, ErrorState } from "@/components/ui/EmptyState";
import { PageLoader } from "@/components/ui/Spinner";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MenuPageCarousel } from "@/components/ui/MenuPageCarousel";
import Link from "next/link";

const MENU_IMAGES = [
  "/images/menu/menu_only.png",
  "/images/menu/menu_only.png",
  "/images/menu/menu_only.png",
  "/images/menu/menu_only.png",
  "/images/menu/menu_only.png",
];

export default function MenuPage() {
  const [categories, setCategories] = useState<RestaurantCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const containerRef = useScrollReveal();

  const fetchMenu = useCallback(
    async (search: string, category: string, p: number) => {
      setLoading(true);
      setError(false);
      try {
        const result = await restaurantService.listMenu({
          search: search || undefined,
          categoryId: category !== "all" ? category : undefined,
          veg: undefined, // Always pure veg per instructions
          isAvailable: true,
          page: p,
          limit: 12,
        });
        setItems(result.items);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Load categories on mount
  useEffect(() => {
    restaurantService.listCategories().then(setCategories);
  }, []);

  // Debounce search
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchMenu(searchQuery, selectedCategory, 1);
    }, 320);
    return () => clearTimeout(debounceRef.current);
  }, [searchQuery, selectedCategory, fetchMenu]);

  useEffect(() => {
    fetchMenu(searchQuery, selectedCategory, page);
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={containerRef as React.Ref<HTMLDivElement>} className="bg-[#F5E9D2] min-h-screen" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>

      {/* 1. Hero Section */}
      <section className="relative w-full h-[60dvh] min-h-[450px] max-h-[600px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop"
            alt="Restaurant Atmosphere"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Dark brown transparent overlay */}
        <div className="absolute inset-0 bg-[#24130A]/75" />

        <div className="container mx-auto relative z-10 px-6 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4 reveal">
            <div className="w-8 h-[1px] bg-[#D49A2A]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#D49A2A]"></div>
            <div className="w-8 h-[1px] bg-[#D49A2A]"></div>
          </div>

          <h1 className="text-[3.5rem] md:text-[5rem] lg:text-[6rem] leading-[1.05] text-[#FFF7E8] mb-6 reveal stagger-1" style={{ fontFamily: "var(--font-display)" }}>
            OUR MENU
          </h1>

          <div className="flex items-center justify-center gap-2 mb-6 reveal stagger-2">
            <span className="w-12 h-px bg-[#D49A2A]"></span>
            <div className="w-2 h-2 rotate-45 bg-[#D49A2A]"></div>
            <span className="w-12 h-px bg-[#D49A2A]"></span>
          </div>

          <p className="max-w-2xl text-[1.1rem] md:text-[1.2rem] text-[#FFF7E8]/90 leading-relaxed reveal stagger-3">
            A delightful range of pure veg dishes, <br className="hidden md:block" /> crafted with love and the finest ingredients.
          </p>
        </div>
      </section>

      {/* 2. Menu Image Carousel Section */}
      <section className="pt-16 pb-8 md:pt-20 md:pb-10 overflow-hidden relative">
        <div className="container mx-auto px-0 reveal">
          <MenuPageCarousel images={MENU_IMAGES} />
        </div>
      </section>

      {/* 3. Our Menu (API Driven) Section */}
      <section className="pt-8 pb-16 relative z-10">
        <div className="container mx-auto px-6 mb-8 text-center reveal">
          <p className="text-[#8F2A12] text-[13px] font-semibold tracking-[0.2em] uppercase mb-3">Restaurant</p>
          <h2 className="text-[2.5rem] md:text-[3rem] text-[#24130A] mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Our Menu
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-[#D49A2A]"></span>
            <div className="w-1.5 h-1.5 rotate-45 bg-[#D49A2A]"></div>
            <span className="w-8 h-[1px] bg-[#D49A2A]"></span>
          </div>
          <p className="text-[#24130A]/70 text-[15px]">{total} items crafted with passion.</p>
        </div>

        {/* Filters */}
        <div className="container mx-auto max-w-5xl px-6 mb-10 reveal stagger-1">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Category tabs */}
            <div className="flex gap-2 flex-wrap justify-center sm:justify-start flex-1">
              <button
                onClick={() => { setSelectedCategory("all"); setPage(1); }}
                className={`text-[13px] font-medium px-6 py-2 rounded-full transition-all duration-300 ${selectedCategory === "all"
                  ? "bg-[#8F2A12] text-[#FFF7E8] shadow-md"
                  : "bg-[#EFE8DA] text-[#24130A] hover:bg-[#D49A2A]/20"
                  }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => { setSelectedCategory(cat._id); setPage(1); }}
                  className={`text-[13px] font-medium px-6 py-2 rounded-full transition-all duration-300 ${selectedCategory === cat._id
                    ? "bg-[#8F2A12] text-[#FFF7E8] shadow-md"
                    : "bg-[#EFE8DA] text-[#24130A] hover:bg-[#D49A2A]/20"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64 mt-2 sm:mt-0">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#24130A]/50" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-[14px] rounded-md outline-none bg-[#EFE8DA] border border-[#24130A]/10 text-[#24130A] focus:border-[#D49A2A] transition-colors shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Menu grid */}
        <div className="container mx-auto max-w-5xl px-6 pb-12 reveal stagger-2">
          {loading ? (
            <div className="py-12 flex justify-center"><PageLoader /></div>
          ) : error ? (
            <div className="py-8 text-center text-[#8F2A12]">Couldn't load the menu right now.</div>
          ) : items.length === 0 ? (
            <div className="py-10 text-center max-w-sm mx-auto bg-[#EFE8DA] rounded-xl border border-[#D49A2A]/20 shadow-sm">
              <p className="text-[#8F2A12] font-semibold tracking-widest text-xs uppercase mb-2">Empty</p>
              <h3 className="text-xl text-[#24130A] font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>No dishes found</h3>
              <p className="text-[#24130A]/70 text-[14px]">Try adjusting your search.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                {items.map((item, i) => (
                  <article
                    key={item._id}
                    className="group bg-[#FCF8F3] rounded-2xl overflow-hidden shadow-sm border border-[#D49A2A]/10 hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#EFE8DA]">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[#24130A]/20 text-3xl">🍽</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-bold text-[1.15rem] text-[#24130A] mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-[13px] text-[#24130A]/75 line-clamp-2 mb-3 leading-relaxed">{item.description}</p>
                      )}
                      <p className="font-bold text-[15px] text-[#8F2A12] mb-4">
                        ₹{item.price}
                      </p>

                      <div className="mt-auto pt-4 border-t border-[#D49A2A]/10 flex items-center gap-3">
                        <Link
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 group/swiggy"
                        >
                          <span className="bg-[#fc8019] text-white text-[11px] font-bold tracking-wide px-2 py-0.5 rounded-sm">swiggy</span>
                          <span className="text-[12px] font-medium text-[#24130A]/80 group-hover/swiggy:text-[#fc8019] transition-colors">Order on Swiggy</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-4 py-2 text-[13px] font-medium rounded-md transition-all disabled:opacity-40 bg-[#EFE8DA] text-[#24130A] hover:bg-[#D49A2A]/20 border border-[#D49A2A]/10"
                  >
                    ← Previous
                  </button>
                  <span className="text-[13px] font-medium text-[#24130A]/60">
                    Page <strong className="text-[#24130A]">{page}</strong> of {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 text-[13px] font-medium rounded-md transition-all disabled:opacity-40 bg-[#EFE8DA] text-[#24130A] hover:bg-[#D49A2A]/20 border border-[#D49A2A]/10"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* 4. Swiggy Ordering Section */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-[#24130A] border-t-4 border-[#8F2A12]">
        {/* Background texture/image */}
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop"
            alt="Food Texture"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center reveal">
          <h2 className="text-[2.5rem] md:text-[3.5rem] text-[#FFF7E8] mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Enjoy Gandharva at Home
          </h2>
          <p className="text-[1.1rem] text-[#FFF7E8]/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Order your favorite pure veg dishes online from Swiggy and experience the finest flavors delivered fresh to your doorstep.
          </p>
          <Link
            href="#" // Add actual Swiggy URL here when provided
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#fc8019] hover:bg-[#e06c10] text-white text-[1.05rem] font-bold rounded-lg transition-transform hover:scale-105 shadow-2xl tracking-wide"
          >
            Order Now on Swiggy
          </Link>
        </div>
      </section>

    </div>
  );
}
