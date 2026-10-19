"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { X, ShoppingBag, Plus, Minus, Trash2, MapPin, User, Phone, FileText, Send } from "lucide-react";
import { toast } from "sonner";

const HOTEL_WHATSAPP_NUMBER = "919168163999";

export function CartDrawer() {
  const {
    cartItems,
    customerDetails,
    setCustomerDetails,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
  } = useCart();

  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean; address?: boolean }>({});

  if (!isCartOpen) return null;

  const handleInputChange = (field: keyof typeof customerDetails, value: string) => {
    setCustomerDetails((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Add items before placing an order!");
      return;
    }

    // Validate required address fields
    const newErrors = {
      name: !customerDetails.name.trim(),
      phone: !customerDetails.phone.trim() || customerDetails.phone.trim().length < 10,
      address: !customerDetails.address.trim(),
    };

    if (newErrors.name || newErrors.phone || newErrors.address) {
      setErrors(newErrors);
      toast.error("Please fill in all required delivery details.");
      return;
    }

    // Format WhatsApp message
    const itemsList = cartItems
      .map(
        (ci, index) =>
          `${index + 1}. *${ci.item.name}* x ${ci.quantity} = ₹${ci.item.price * ci.quantity}`
      )
      .join("\n");

    const message = `🍽️ *NEW FOOD ORDER - GANDHARVA HOTEL*
--------------------------------
👤 *Customer Details:*
• *Name:* ${customerDetails.name.trim()}
• *Phone:* ${customerDetails.phone.trim()}
• *Address:* ${customerDetails.address.trim()}
${customerDetails.landmark.trim() ? `• *Landmark:* ${customerDetails.landmark.trim()}\n` : ""}${customerDetails.notes.trim() ? `• *Notes:* ${customerDetails.notes.trim()}\n` : ""}
--------------------------------
📦 *Order Summary (${totalItems} item${totalItems > 1 ? "s" : ""}):*
${itemsList}

--------------------------------
💰 *Total Amount:* ₹${subtotal}
--------------------------------
Thank you! Please process my order.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${HOTEL_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    toast.success("Redirecting to WhatsApp to complete your order...");
    
    // Open WhatsApp URL
    window.open(whatsappUrl, "_blank");

    // Reset cart state after order trigger
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#24130A]/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full sm:w-screen max-w-md bg-[#FFF7E8] text-[#24130A] shadow-2xl flex flex-col relative z-10 border-l border-[#D49A2A]/20">
          
          {/* Header */}
          <div className="p-5 bg-[#24130A] text-[#FFF7E8] flex items-center justify-between border-b border-[#D49A2A]/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#8F2A12] flex items-center justify-center text-[#FFF7E8]">
                <ShoppingBag size={18} />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-wide" style={{ fontFamily: "var(--font-display)" }}>
                  Your Cart
                </h2>
                <p className="text-xs text-[#FFF7E8]/70">
                  {totalItems} {totalItems === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#FFF7E8]/10 text-[#FFF7E8] transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
              <div className="w-20 h-20 rounded-full bg-[#EFE8DA] flex items-center justify-center text-[#8F2A12] mb-4 shadow-inner">
                <ShoppingBag size={36} />
              </div>
              <h3 className="text-2xl font-bold text-[#24130A] mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Your Cart is Empty
              </h3>
              <p className="text-sm text-[#24130A]/70 max-w-xs mb-6 leading-relaxed">
                Explore our delicious pure veg menu and add your favorite dishes.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#8F2A12] hover:bg-[#73210d] text-[#FFF7E8] text-sm font-semibold rounded-lg shadow-md transition-all hover:scale-105"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* Items List */}
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-[#D49A2A]/20 pb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#8F2A12]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Selected Dishes
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-[#8F2A12] hover:underline flex items-center gap-1 font-medium"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <Trash2 size={12} /> Clear all
                  </button>
                </div>

                <div className="space-y-3">
                  {cartItems.map(({ item, quantity }) => (
                    <div
                      key={item._id}
                      className="bg-[#FCF8F3] p-3 rounded-xl border border-[#D49A2A]/15 shadow-sm flex items-center gap-3"
                    >
                      {/* Image Thumbnail */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#EFE8DA] shrink-0 border border-[#D49A2A]/20">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl">
                            🍽️
                          </div>
                        )}
                      </div>

                      {/* Info & Price */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[15px] text-[#24130A] truncate" style={{ fontFamily: "var(--font-display)" }}>
                          {item.name}
                        </h4>
                        <p className="text-xs font-semibold text-[#8F2A12]" style={{ fontFamily: "'Inter', sans-serif" }}>
                          ₹{item.price}
                        </p>
                        <p className="text-[11px] text-[#24130A]/60" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Total: ₹{item.price * quantity}
                        </p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-1 bg-[#EFE8DA] p-1 rounded-lg border border-[#D49A2A]/20 shrink-0" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <button
                          onClick={() => updateQuantity(item._id, quantity - 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-[#24130A] hover:bg-[#8F2A12] hover:text-[#FFF7E8] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-[#24130A]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, quantity + 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-[#24130A] hover:bg-[#8F2A12] hover:text-[#FFF7E8] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-[#24130A]/40 hover:text-[#8F2A12] transition-colors p-1 shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address Form */}
              <div className="pt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                <div className="flex items-center gap-2 mb-3 border-b border-[#D49A2A]/20 pb-2">
                  <MapPin size={16} className="text-[#8F2A12]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#8F2A12]">
                    Delivery Details
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[14px] md:text-[15px] font-semibold text-[#24130A] mb-1 flex items-center gap-1.5">
                      <User size={14} className="text-[#8F2A12]" /> Full Name <span className="text-[#8F2A12]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={customerDetails.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`w-full px-3 py-2 text-base rounded-lg outline-none bg-[#FCF8F3] border transition-colors ${
                        errors.name ? "border-red-500 bg-red-50" : "border-[#D49A2A]/30 focus:border-[#8F2A12]"
                      }`}
                    />
                    {errors.name && <p className="text-[12px] text-red-500 mt-0.5">Name is required</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[14px] md:text-[15px] font-semibold text-[#24130A] mb-1 flex items-center gap-1.5">
                      <Phone size={14} className="text-[#8F2A12]" /> Phone Number <span className="text-[#8F2A12]">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={customerDetails.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`w-full px-3 py-2 text-base rounded-lg outline-none bg-[#FCF8F3] border transition-colors ${
                        errors.phone ? "border-red-500 bg-red-50" : "border-[#D49A2A]/30 focus:border-[#8F2A12]"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[12px] text-red-500 mt-0.5">Valid 10-digit phone number is required</p>
                    )}
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <label className="block text-[14px] md:text-[15px] font-semibold text-[#24130A] mb-1 flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#8F2A12]" /> Complete Delivery Address <span className="text-[#8F2A12]">*</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="House/Flat No., Street, Area..."
                      value={customerDetails.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className={`w-full px-3 py-2 text-base rounded-lg outline-none bg-[#FCF8F3] border transition-colors resize-none ${
                        errors.address ? "border-red-500 bg-red-50" : "border-[#D49A2A]/30 focus:border-[#8F2A12]"
                      }`}
                    />
                    {errors.address && <p className="text-[12px] text-red-500 mt-0.5">Address is required</p>}
                  </div>

                  {/* Landmark */}
                  <div>
                    <label className="block text-[14px] md:text-[15px] font-semibold text-[#24130A] mb-1">
                      Landmark / Pincode <span className="text-[#24130A]/60 font-normal text-xs">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nearby landmark"
                      value={customerDetails.landmark}
                      onChange={(e) => handleInputChange("landmark", e.target.value)}
                      className="w-full px-3 py-2 text-base rounded-lg outline-none bg-[#FCF8F3] border border-[#D49A2A]/30 focus:border-[#8F2A12] transition-colors"
                    />
                  </div>

                  {/* Cooking/Delivery Notes */}
                  <div>
                    <label className="block text-[14px] md:text-[15px] font-semibold text-[#24130A] mb-1 flex items-center gap-1.5">
                      <FileText size={14} className="text-[#8F2A12]" /> Special Cooking / Delivery Instructions <span className="text-[#24130A]/60 font-normal text-xs">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Less spicy, no onion"
                      value={customerDetails.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      className="w-full px-3 py-2 text-base rounded-lg outline-none bg-[#FCF8F3] border border-[#D49A2A]/30 focus:border-[#8F2A12] transition-colors"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Footer / Total & Order Button */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-[#24130A] text-[#FFF7E8] border-t border-[#D49A2A]/30 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#FFF7E8]/80 text-[13px]">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#FFF7E8]/80 text-[13px]">
                  <span>Delivery Charge</span>
                  <span className="text-[#D49A2A] font-semibold">Free Delivery</span>
                </div>
                <div className="pt-2 border-t border-[#FFF7E8]/10 flex justify-between items-center">
                  <span className="font-bold text-sm text-[#FFF7E8]">Total Payable</span>
                  <span className="font-bold text-xl text-[#D49A2A]" style={{ fontFamily: "var(--font-display)" }}>
                    ₹{subtotal}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1ebc57] text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <Send size={18} /> Order via WhatsApp
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
