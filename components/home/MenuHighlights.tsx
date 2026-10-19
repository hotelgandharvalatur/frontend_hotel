"use client";

import Link from "next/link";
import Image from "next/image";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const POPULAR_DISHES = [
  { name: "Paneer Butter Masala", price: "₹220", image: getCloudinaryUrl("hotel-gandharva/menu/image_copy", { width: 360 }) },
  { name: "Veg Kolhapuri", price: "₹200", image: getCloudinaryUrl("hotel-gandharva/menu/image_copy_2", { width: 360 }) },
  { name: "Veg Biryani", price: "₹210", image: getCloudinaryUrl("hotel-gandharva/menu/image_copy_3", { width: 360 }) },
  { name: "Masala Dosa", price: "₹160", image: getCloudinaryUrl("hotel-gandharva/menu/image_copy_4", { width: 360 }) },
  { name: "Manchurian", price: "₹180", image: getCloudinaryUrl("hotel-gandharva/menu/image_copy_5", { width: 360 }) },
  { name: "Gulab Jamun", price: "₹120", image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=600&auto=format&fit=crop" },
];

export function MenuHighlights() {
  return (
    <section className="pt-[48px] pb-[75px] px-4 md:px-12" style={{ backgroundColor: "#A83216" }}>
      {/* HEADER */}
      <div className="container-wide mx-auto text-center mb-24">
        <p className="mb-1 font-bold tracking-widest text-xs reveal" style={{ color: "#D49A2A" }}>
          POPULAR DISHES
        </p>
        <h2 className="text-[30px] lg:text-[34px] font-display font-semibold reveal stagger-1" style={{ color: "#FFF7E8" }}>
          Our Menu Highlights
        </h2>
      </div>

      {/* STATIC ROW - NO SCROLL, NO ARROWS */}
      <div className="container-wide mx-auto flex flex-wrap justify-center gap-x-6 gap-y-10 pt-15 reveal stagger-3">
        {POPULAR_DISHES.map((dish) => (
          <div key={dish.name} className="flex flex-col items-center group shrink-0">
            <div
              className="relative w-[168px] h-[194px] overflow-hidden rounded-md mb-3 border-2 transition-all duration-300"
              style={{ borderColor: "rgba(212, 154, 42, 0.4)", backgroundColor: "#F5E9D2" }}
            >
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                sizes="168px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <h3
              className="text-[16px] font-display font-semibold text-center leading-snug max-w-[160px]"
              style={{ color: "#FFF7E8" }}
            >
              {dish.name}
            </h3>
            <p className="text-[15px] font-bold mt-1" style={{ color: "#D49A2A" }}>
              {dish.price}
            </p>
          </div>
        ))}
      </div>

      {/* VIEW FULL MENU */}
      <div className="text-center mt-10 reveal stagger-4">
        <Link
          href="/menu"
          className="inline-flex items-center text-[15px] font-semibold px-7 py-3 rounded-[4px] transition-all duration-200"
          style={{ border: "1.5px solid #F5E9D2", color: "#F5E9D2", backgroundColor: "transparent" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#F5E9D2";
            e.currentTarget.style.color = "#A83216";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#F5E9D2";
          }}
        >
          View Full Menu
        </Link>
      </div>
    </section>
  );
}