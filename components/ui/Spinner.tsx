export function Spinner({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`animate-spin ${className}`}
      aria-label="Loading"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.2"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="var(--accent-light)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
      <Spinner size={36} />
      <p className="eyebrow" style={{ color: "var(--muted)" }}>
        Loading
      </p>
    </div>
  );
}
