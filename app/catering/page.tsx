import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cateringService } from "@/services/catering.service";
import { HomeScrollAnimations } from "../HomeScrollAnimations";
import { FileText, Package, ChefHat, Leaf, ShieldCheck, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Catering Services",
  description: "Gandharva Hotel catering packages for weddings, corporate events, and private parties.",
};

export const revalidate = 60;

const Diamond = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-4 text-[#D49A2A]">
    <rect x="5" y="0" width="7.07107" height="7.07107" transform="rotate(45 5 0)" fill="currentColor" />
  </svg>
);

const Divider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center w-full max-w-[150px] mx-auto ${className}`}>
    <div className="h-px bg-[#D49A2A] w-full opacity-50"></div>
    <Diamond />
    <div className="h-px bg-[#D49A2A] w-full opacity-50"></div>
  </div>
);

// Intricate Indian mandala/floral line-art decoration
const SideDecoration = ({ side }: { side: 'left' | 'right' }) => (
  <div
    className={`absolute top-1/2 pointer-events-none overflow-hidden ${side === 'left' ? 'left-0' : 'right-0'}`}
    style={{
      transform: `translateY(-50%) ${side === 'right' ? 'scaleX(-1)' : ''}`,
      width: 'clamp(80px, 12vw, 150px)',
      height: 'clamp(350px, 70vh, 600px)',
      zIndex: 0
    }}
  >
    <svg
      viewBox="150 0 150 600"
      preserveAspectRatio="xMinYMid slice"
      fill="none"
      stroke="#D49A2A"
      className="w-full h-full"
    >
      <g transform="translate(150, 300)">
        {/* Core Mandala rings */}
        <circle cx="0" cy="0" r="140" strokeWidth="1" />
        <circle cx="0" cy="0" r="130" strokeDasharray="4 6" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="100" strokeWidth="1" />
        <circle cx="0" cy="0" r="85" strokeDasharray="2 4" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="60" strokeWidth="1" />

        {/* Inner petals */}
        {[...Array(12)].map((_, i) => (
          <g key={`inner-${i}`} transform={`rotate(${i * 30})`}>
            <path d="M 0,-20 C 15,-35 15,-45 0,-60 C -15,-45 -15,-35 0,-20" strokeWidth="1" />
          </g>
        ))}

        {/* Middle petals */}
        {[...Array(16)].map((_, i) => (
          <g key={`mid-${i}`} transform={`rotate(${i * 22.5})`}>
            <path d="M 0,-60 C 20,-75 20,-85 0,-100 C -20,-85 -20,-75 0,-60" strokeWidth="1" />
          </g>
        ))}

        {/* Outer large floral petals */}
        {[...Array(8)].map((_, i) => (
          <g key={`out-${i}`} transform={`rotate(${i * 45})`}>
            <path d="M 0,-100 C 35,-125 45,-140 0,-175 C -45,-140 -35,-125 0,-100" strokeWidth="1.5" />
            <path d="M 0,-115 L 0,-165" strokeWidth="1" />
            <circle cx="0" cy="-180" r="3" fill="#D49A2A" stroke="none" />
          </g>
        ))}

        {/* Elegant vertical top extension */}
        <path d="M 0,-185 Q 30,-240 0,-290 Q -30,-240 0,-185" strokeWidth="1.5" />
        <path d="M 0,-200 L 0,-280" strokeWidth="1" />
        <circle cx="0" cy="-295" r="4" fill="#D49A2A" stroke="none" />
        <path d="M -15,-235 Q -30,-260 -50,-240 Q -30,-230 -15,-235" strokeWidth="1" />
        <path d="M 15,-235 Q 30,-260 50,-240 Q 30,-230 15,-235" strokeWidth="1" />

        {/* Elegant vertical bottom extension */}
        <path d="M 0,185 Q 30,240 0,290 Q -30,240 0,185" strokeWidth="1.5" />
        <path d="M 0,200 L 0,280" strokeWidth="1" />
        <circle cx="0" cy="295" r="4" fill="#D49A2A" stroke="none" />
        <path d="M -15,235 Q -30,260 -50,240 Q -30,230 -15,235" strokeWidth="1" />
        <path d="M 15,235 Q 30,260 50,240 Q 30,230 15,235" strokeWidth="1" />
      </g>
    </svg>
  </div>
);

export default async function CateringPage() {
  const packages = await cateringService.listPackages();

  return (
    <div style={{ backgroundColor: "#FFF7E8", color: "#24130A", fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }} className="min-h-screen">
      <HomeScrollAnimations />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-16 text-center" style={{ backgroundColor: "#F6E9D7" }}>
        <SideDecoration side="left" />
        <SideDecoration side="right" />

        <div className="container-wide mx-auto relative z-10 px-4">
          <div className="flex justify-center items-center gap-4 mb-6 reveal">
            <span className="text-[#8F2A12] text-sm font-bold tracking-[0.2em] uppercase">03 — Catering</span>
          </div>

          <h1 className="display-xl reveal stagger-1 max-w-4xl mx-auto mb-8 text-[#24130A]" style={{ fontFamily: "var(--font-display)" }}>
            We Bring the<br />Feast to You
          </h1>

          <Divider className="mb-8 reveal stagger-2" />

          <p className="body-lg mt-4 max-w-xl mx-auto reveal stagger-3 text-[#24130A] opacity-80">
            From intimate dinners to grand banquets,<br />our catering team delivers exceptional cuisine<br />wherever you celebrate.
          </p>

          <div className="mt-10 reveal stagger-4">
            <Link
              href="/catering/inquiry"
              className="inline-flex items-center gap-2 text-sm font-bold px-8 py-4 rounded-sm transition-all hover:bg-[#8F2A12]"
              style={{ backgroundColor: "#5A1807", color: "#FFF7E8", borderRadius: "8px" }}
            >
              <FileText size={18} />
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-[66px] relative z-10">
        <div className="container-wide mx-auto px-4 text-center">
          <Divider className="mb-4 reveal" />

          <p className="text-[#8F2A12] text-sm font-bold mb-4 reveal stagger-1">Our Packages</p>
          <h2 className="display-lg reveal stagger-2 text-[#24130A] mb-8" style={{ fontFamily: "var(--font-display)" }}>
            Tailored for Every Occasion
          </h2>

          <Divider className="mb-12 reveal stagger-3" />

          {packages.length === 0 ? (
            <div className="max-w-4xl mx-auto reveal stagger-4">
              <div
                className="rounded-2xl p-16 flex flex-col items-center justify-center text-center"
                style={{ border: "2px dashed rgba(212, 154, 42, 0.4)", backgroundColor: "transparent" }}
              >
                <div className="w-24 h-24 rounded-full border border-[rgba(212,154,42,0.3)] flex items-center justify-center mb-6 relative">
                  <Package size={40} className="text-[#D49A2A]" />
                  {/* Decorative sparkles */}
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#D49A2A] rounded-full opacity-50"></div>
                  <div className="absolute bottom-4 left-2 w-1 h-1 bg-[#D49A2A] rounded-full opacity-50"></div>
                  <div className="absolute top-6 left-4 w-2 h-2 bg-[#D49A2A] rounded-full opacity-30"></div>
                </div>

                <p className="text-[#8F2A12] text-lg font-bold mb-2">Empty</p>
                <h3 className="display-sm text-[#24130A] mb-4" style={{ fontFamily: "var(--font-display)" }}>No packages listed</h3>
                <p className="text-[#24130A] opacity-80 text-lg">
                  Our catering packages are being curated.<br />Contact us for a custom quote.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg, i) => (
                <article
                  key={pkg._id}
                  className={`group rounded-xl overflow-hidden transition-all duration-300 reveal stagger-${Math.min(i + 1, 6)}`}
                  style={{ border: "1px solid rgba(212, 154, 42, 0.3)" }}
                >
                  {pkg.images?.[0] && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={pkg.images[0]}
                        alt={pkg.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}

                  <div className="p-8 text-left bg-white bg-opacity-40">
                    <p className="text-[#8F2A12] text-xs font-bold tracking-widest mb-3 uppercase">0{i + 1}</p>
                    <h3 className="text-3xl mb-4 text-[#24130A]" style={{ fontFamily: "var(--font-display)" }}>{pkg.name}</h3>
                    {pkg.description && (
                      <p className="mb-6 text-[#24130A] opacity-75 leading-relaxed">{pkg.description}</p>
                    )}
                    {pkg.pricePerPlate && (
                      <p className="font-bold text-lg mb-8 text-[#D49A2A]">
                        ₹{pkg.pricePerPlate.toLocaleString("en-IN")} per plate
                      </p>
                    )}
                    <Link
                      href="/catering/inquiry"
                      className="inline-block text-sm font-bold px-6 py-3 rounded-sm transition-all text-[#8F2A12] hover:bg-[#8F2A12] hover:text-white"
                      style={{ border: "1px solid #8F2A12" }}
                    >
                      Inquire Now
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
