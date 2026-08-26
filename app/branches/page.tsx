import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import { branchesService } from "@/services/branches.service";
import { EmptyState } from "@/components/ui/EmptyState";
import { HomeScrollAnimations } from "../HomeScrollAnimations";

export const metadata: Metadata = {
  title: "Our Locations",
  description: "Find Hotel Bee branches near you.",
};

export const revalidate = 60;

export default async function BranchesPage() {
  const branches = await branchesService.listBranches({ isActive: true });

  return (
    <>
      <HomeScrollAnimations />

      {/* Hero */}
      <section className="relative overflow-hidden section-padding" style={{ background: "var(--surface)" }}>
        <span className="ghost-text absolute right-[-4vw] top-0 select-none pointer-events-none" aria-hidden="true">LOCATE</span>
        <div className="container-wide mx-auto relative z-10">
          <p className="eyebrow mb-4 reveal">06 — Locations</p>
          <h1 className="display-xl reveal stagger-1 max-w-3xl" style={{ fontFamily: "var(--font-display)" }}>
            Find Us Near You
          </h1>
          <p className="body-lg mt-4 max-w-xl reveal stagger-2">
            Hotel Bee is present across multiple locations, each delivering the same commitment to excellence.
          </p>
        </div>
      </section>

      {/* Branches grid */}
      <section className="section-padding" style={{ background: "var(--ink)" }}>
        <div className="container-wide mx-auto">
          {branches.length === 0 ? (
            <EmptyState title="No locations listed" message="Contact us for our current location details." ghost="PIN" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branches.map((branch, i) => (
                <article
                  key={branch._id}
                  className={`p-8 rounded-sm border hover:border-[var(--border-accent)] transition-all duration-300 reveal stagger-${Math.min(i + 1, 6)}`}
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                >
                  <p className="eyebrow mb-4">0{i + 1}</p>
                  <h2 className="display-sm mb-6">{branch.name}</h2>

                  <div className="flex flex-col gap-4">
                    {branch.address && (
                      <div className="flex items-start gap-3">
                        <MapPin size={15} className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent-light)" }} />
                        <p className="body-sm" style={{ color: "var(--warm-white)" }}>{branch.address}</p>
                      </div>
                    )}
                    {branch.phone && (
                      <div className="flex items-center gap-3">
                        <Phone size={15} style={{ color: "var(--accent-light)" }} />
                        <a href={`tel:${branch.phone}`} className="body-sm hover:text-[var(--accent-light)] transition-colors" style={{ color: "var(--warm-white)" }}>
                          {branch.phone}
                        </a>
                      </div>
                    )}
                    {branch.email && (
                      <div className="flex items-center gap-3">
                        <Mail size={15} style={{ color: "var(--accent-light)" }} />
                        <a href={`mailto:${branch.email}`} className="body-sm hover:text-[var(--accent-light)] transition-colors" style={{ color: "var(--warm-white)" }}>
                          {branch.email}
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
