"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { restaurantService } from "@/services/restaurant.service";
import { MenuHighlightItem } from "@/types";

export function MenuHighlights() {
  const [highlights, setHighlights] = useState<MenuHighlightItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    restaurantService
      .getMenuHighlights()
      .then((data) => {
        if (isMounted) {
          setHighlights(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

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

      {/* DISHES ROW */}
      <div className="container-wide mx-auto flex flex-wrap justify-center gap-x-6 gap-y-10 pt-15 reveal stagger-3">
        {loading ? (
          // Skeleton loading matching card layout
          [...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center shrink-0 animate-pulse">
              <div
                className="w-[168px] h-[194px] rounded-md mb-3 border-2"
                style={{
                  borderColor: "rgba(212, 154, 42, 0.25)",
                  backgroundColor: "rgba(245, 233, 210, 0.15)",
                }}
              />
              <div
                className="h-4 w-28 rounded mb-2"
                style={{ backgroundColor: "rgba(255, 247, 232, 0.25)" }}
              />
              <div
                className="h-3 w-16 rounded"
                style={{ backgroundColor: "rgba(212, 154, 42, 0.3)" }}
              />
            </div>
          ))
        ) : highlights.length > 0 ? (
          highlights.map((dish) => (
            <div key={dish._id} className="flex flex-col items-center group shrink-0">
              <div
                className="relative w-[168px] h-[194px] overflow-hidden rounded-md mb-3 border-2 transition-all duration-300"
                style={{ borderColor: "rgba(212, 154, 42, 0.4)", backgroundColor: "#F5E9D2" }}
              >
                {dish.image ? (
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
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#A83216] font-display font-bold text-xl px-2 text-center">
                    {dish.name}
                  </div>
                )}
              </div>

              <h3
                className="text-[16px] font-display font-semibold text-center leading-snug max-w-[160px]"
                style={{ color: "#FFF7E8" }}
              >
                {dish.name}
              </h3>
              <p className="text-[15px] font-bold mt-1" style={{ color: "#D49A2A" }}>
                ₹{dish.price}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-[#FFF7E8]/80 text-[15px]">
              Discover our freshly prepared authentic vegetarian delicacies.
            </p>
          </div>
        )}
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