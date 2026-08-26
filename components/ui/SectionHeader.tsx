interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ghost?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  ghost,
  align = "left",
  light = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`relative overflow-hidden ${
        align === "center" ? "text-center" : ""
      } ${className}`}
    >
      {/* Ghost watermark */}
      {ghost && (
        <span
          className="ghost-text absolute inset-0 flex items-center"
          style={{
            justifyContent: align === "center" ? "center" : "flex-start",
            top: "-10%",
          }}
          aria-hidden="true"
        >
          {ghost}
        </span>
      )}

      <div className="relative z-10">
        {eyebrow && (
          <p
            className="eyebrow mb-4 reveal stagger-1"
            style={{ color: light ? "var(--accent)" : undefined }}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className="display-lg reveal stagger-2"
          style={{ color: light ? "var(--ink)" : "var(--warm-white)" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="body-lg mt-4 max-w-xl reveal stagger-3"
            style={{
              color: light ? "rgba(10,10,11,0.65)" : undefined,
              marginLeft: align === "center" ? "auto" : undefined,
              marginRight: align === "center" ? "auto" : undefined,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
