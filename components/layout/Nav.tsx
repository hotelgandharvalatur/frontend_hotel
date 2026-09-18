"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/menu", label: "Menu" },
  { href: "/banquet", label: "Banquet & Events" },
  { href: "/catering", label: "Catering" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact Us" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-[6px] shadow-md" : "py-[13px]"
        }`}
      style={{ backgroundColor: "#24130A", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="container-wide mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-[49px] w-[178px] md:h-[65px] md:w-[259px] lg:h-[73px] lg:w-[292px] transition-transform group-hover:scale-105">
              <Image
                src="/images/logo/logo1.png"
                alt="Gandharva Hotel"
                fill
                sizes="(max-width: 768px) 178px, (max-width: 1024px) 259px, 292px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav & Button Group */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            <div className="flex items-center gap-5 xl:gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[13px] font-medium transition-colors relative group py-2"
                    style={{ color: isActive ? "#D49A2A" : "#FFF7E8" }}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#D49A2A] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#FFF7E8] hover:text-[#D49A2A] transition-colors flex items-center gap-2 font-medium text-[13px]"
                aria-label="Open cart"
              >
                <div className="relative">
                  <ShoppingBag size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#8F2A12] text-[#FFF7E8] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden xl:inline">Cart</span>
              </button>

              <Link
                href="/contact"
                className="text-[13px] font-bold flex items-center justify-center transition-all duration-200"
                style={{
                  backgroundColor: "#A83216",
                  color: "#FFF7E8",
                  height: "42px",
                  padding: "0 21px",
                  borderRadius: "4px"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#8F2A12")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#A83216")}
              >
                Book a Table
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#FFF7E8]"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-[#8F2A12] text-[#FFF7E8] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="p-2 text-[#FFF7E8]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 shadow-lg transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[80vh] border-b" : "max-h-0"
          }`}
        style={{
          backgroundColor: "#24130A",
          borderColor: "rgba(212, 154, 42, 0.2)"
        }}
      >
        <div className="flex flex-col p-4 space-y-3 max-h-[80vh] overflow-y-auto">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14.6px] font-medium transition-colors p-2 rounded-sm"
                style={{
                  color: isActive ? "#D49A2A" : "#FFF7E8",
                  backgroundColor: isActive ? "rgba(255, 255, 255, 0.03)" : "transparent"
                }}
              >
                {link.label}
              </Link>
            );
          })}

          <button
            onClick={() => { setIsOpen(false); setIsCartOpen(true); }}
            className="w-full text-left text-[14.6px] font-medium transition-colors p-2 rounded-sm flex items-center justify-between text-[#FFF7E8]"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag size={18} /> Cart
            </span>
            {totalItems > 0 && (
              <span className="bg-[#8F2A12] text-[#FFF7E8] text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems} items
              </span>
            )}
          </button>

          <div className="pt-4 pb-2 border-t" style={{ borderColor: "rgba(212, 154, 42, 0.2)" }}>
            <Link
              href="/contact"
              className="block text-center text-[13px] font-bold px-6 py-3 rounded-sm transition-colors"
              style={{ backgroundColor: "#A83216", color: "#FFF7E8" }}
            >
              Book a Table
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}