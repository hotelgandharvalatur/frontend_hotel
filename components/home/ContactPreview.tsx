"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactPreview() {
  return (
    <section className="section-padding" style={{ backgroundColor: "#FFF7E8" }}>
      <div className="container-wide mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Contact Details */}
          <div className="flex flex-col justify-center">
            <p className="eyebrow mb-3 font-bold tracking-widest text-sm" style={{ color: "#A83216" }}>
              FIND US
            </p>
            <h2 className="display-md mb-6" style={{ color: "#24130A", lineHeight: 1.2 }}>
              Visit Gandharva Hotel
            </h2>
            <div className="w-16 h-1 mb-10" style={{ backgroundColor: "#D49A2A" }} />

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(212, 154, 42, 0.1)" }}>
                  <MapPin size={24} style={{ color: "#D49A2A" }} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1" style={{ color: "#24130A" }}>Location</h4>
                  <p className="text-base" style={{ color: "rgba(36, 19, 10, 0.7)" }}>
                    Ausa Road, Near Rajiv Gandhi Chowk,<br />Latur, Maharashtra 413512
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(212, 154, 42, 0.1)" }}>
                  <Phone size={24} style={{ color: "#D49A2A" }} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1" style={{ color: "#24130A" }}>Phone</h4>
                  <p className="text-base" style={{ color: "rgba(36, 19, 10, 0.7)" }}>+91 91681 63999</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(212, 154, 42, 0.1)" }}>
                  <Mail size={24} style={{ color: "#D49A2A" }} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1" style={{ color: "#24130A" }}>Email</h4>
                  <p className="text-base" style={{ color: "rgba(36, 19, 10, 0.7)" }}>hotelgandharvalatur@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(212, 154, 42, 0.1)" }}>
                  <Clock size={24} style={{ color: "#D49A2A" }} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1" style={{ color: "#24130A" }}>Hours</h4>
                  <p className="text-base" style={{ color: "rgba(36, 19, 10, 0.7)" }}>Open Daily: 11:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="https://maps.google.com/?q=Gandharva+Hotel+Latur"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-sm font-bold px-8 py-4 rounded-sm transition-all duration-200"
                style={{ backgroundColor: "#A83216", color: "#FFF7E8" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#8F2A12")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#A83216")}
              >
                Get Directions
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center text-sm font-bold px-8 py-4 rounded-sm transition-all duration-200"
                style={{ border: "2px solid #D49A2A", color: "#D49A2A" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(212, 154, 42, 0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="w-full min-h-[400px] lg:min-h-full rounded-sm overflow-hidden relative shadow-lg" style={{ backgroundColor: "#F5E9D2", border: "1px solid rgba(212, 154, 42, 0.2)" }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center" style={{ color: "rgba(36, 19, 10, 0.5)" }}>
              <MapPin size={48} style={{ color: "rgba(212, 154, 42, 0.5)", marginBottom: "1rem" }} />
              <p className="font-bold text-lg mb-2">Map Integration</p>
              <p className="text-sm">Real Google Maps iframe or image goes here.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
