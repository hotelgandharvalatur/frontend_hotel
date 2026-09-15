"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, ArrowRight } from "lucide-react";

export function CartFloatingButton() {
  const { totalItems, subtotal, setIsCartOpen, isCartOpen } = useCart();

  if (totalItems === 0 || isCartOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-bottom-5 duration-300">
      <button
        onClick={() => setIsCartOpen(true)}
        className="group relative flex items-center gap-3 bg-[#8F2A12] hover:bg-[#73210d] text-[#FFF7E8] py-3 px-5 rounded-full shadow-2xl border-2 border-[#D49A2A]/40 transition-all transform hover:scale-105 active:scale-95"
        style={{ fontFamily: "'Inter', sans-serif" }}
        aria-label="View Cart"
      >
        <div className="relative">
          <ShoppingBag size={20} />
          <span className="absolute -top-2 -right-2 bg-[#D49A2A] text-[#24130A] text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
            {totalItems}
          </span>
        </div>

        <div className="flex flex-col items-start pr-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#FFF7E8]/80 leading-none mb-0.5">
            View Cart
          </span>
          <span className="text-sm font-bold text-[#D49A2A] leading-none">
            ₹{subtotal}
          </span>
        </div>

        <div className="w-7 h-7 rounded-full bg-[#FFF7E8]/10 flex items-center justify-center group-hover:bg-[#FFF7E8]/20 transition-colors">
          <ArrowRight size={14} />
        </div>
      </button>
    </div>
  );
}
