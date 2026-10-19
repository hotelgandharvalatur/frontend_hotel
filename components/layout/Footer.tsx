import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Share2, Camera } from "lucide-react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

export function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#24130A", color: "#FFF7E8" }}
    >
      <div className="container-wide mx-auto px-6 md:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand & Tagline */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6 relative h-16 w-64 transition-transform hover:scale-105">
              <Image
                src={getCloudinaryUrl("hotel-gandharva/logo/image")}
                alt="Gandharva Hotel"
                fill
                sizes="256px"
                className="object-contain object-left"
              />
            </Link>
            <p className="text-[15px] leading-relaxed" style={{ color: "rgba(255, 247, 232, 0.88)" }}>
              Experience the taste of tradition with pure vegetarian delicacies and warm hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[14px] font-bold tracking-widest uppercase mb-6" style={{ color: "#D49A2A" }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Menu", href: "/menu" },
                { label: "Banquet & Events", href: "/banquet" },
                { label: "Gallery", href: "/gallery" },
                { label: "Reviews", href: "/reviews" },
                { label: "Contact Us", href: "/contact" }
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] transition-colors hover:text-white"
                    style={{ color: "rgba(255, 247, 232, 0.85)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[14px] font-bold tracking-widest uppercase mb-6" style={{ color: "#D49A2A" }}>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={18} className="shrink-0 mt-0.5" style={{ color: "#D49A2A" }} />
                <span className="text-[15px]" style={{ color: "rgba(255, 247, 232, 0.85)" }}>
                  Ausa Road, Near Rajiv Gandhi Chowk,<br />Latur, Maharashtra 413512
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="shrink-0 mt-0.5" style={{ color: "#D49A2A" }} />
                <a href="tel:+919168163999" className="text-[15px] hover:text-white transition-colors" style={{ color: "rgba(255, 247, 232, 0.85)" }}>
                  +91 91681 63999
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="shrink-0 mt-0.5" style={{ color: "#D49A2A" }} />
                <a href="mailto:hotelgandharvalatur@gmail.com" className="text-[15px] hover:text-white transition-colors" style={{ color: "rgba(255, 247, 232, 0.85)" }}>
                  hotelgandharvalatur@gmail.com
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={18} className="shrink-0 mt-0.5" style={{ color: "#D49A2A" }} />
                <span className="text-[15px]" style={{ color: "rgba(255, 247, 232, 0.85)" }}>
                  Open Daily: 11:00 AM - 11:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-[14px] font-bold tracking-widest uppercase mb-6" style={{ color: "#D49A2A" }}>
              Follow Us
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/share/1F5MUbbwEs/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-1 hover:bg-[#D49A2A]/20 focus-visible:ring-2 focus-visible:ring-[#D49A2A]"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(212, 154, 42, 0.3)", color: "#D49A2A" }}
              >
                <Share2 size={18} />
              </a>
              <a
                href="https://www.instagram.com/gandharvapureveg_latur"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-1 hover:bg-[#D49A2A]/20 focus-visible:ring-2 focus-visible:ring-[#D49A2A]"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(212, 154, 42, 0.3)", color: "#D49A2A" }}
              >
                <Camera size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright & Credit */}
        <div className="mt-16 pt-6 flex flex-col md:flex-row items-center justify-between text-[13px] gap-3" style={{ borderTop: "1px solid rgba(255, 247, 232, 0.1)", color: "rgba(255, 247, 232, 0.65)" }}>
          <p>© {new Date().getFullYear()} Gandharva Hotel. All rights reserved.</p>
          <p className="text-center">Designed &amp; developed by BeeCreativess</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
