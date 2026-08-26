import { Button } from "./Button";

interface EmptyStateProps {
  title?: string;
  message?: string;
  ghost?: string;
  onRetry?: () => void;
  className?: string;
}

export function EmptyState({
  title = "Nothing here yet",
  message = "Check back soon — we're always updating.",
  ghost,
  onRetry,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center text-center py-24 px-8 overflow-hidden ${className}`}
    >
      {ghost && (
        <span
          className="ghost-text absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
          style={{ fontSize: "clamp(4rem, 14vw, 10rem)", opacity: 0.5 }}
        >
          {ghost}
        </span>
      )}
      <div className="relative z-10 max-w-sm">
        <div className="w-px h-12 bg-gradient-to-b from-[var(--accent)] to-transparent mx-auto mb-6" />
        <p className="eyebrow mb-3">Empty</p>
        <h3 className="display-sm mb-3">{title}</h3>
        <p className="body-sm mb-6">{message}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            Try again
          </Button>
        )}
      </div>
    </div>
  );
}

export function ErrorState({
  message = "Couldn't load content.",
  onRetry,
  className = "",
}: {
  message?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-16 px-8 ${className}`}
    >
      <div className="w-px h-10 bg-gradient-to-b from-red-500 to-transparent mx-auto mb-5" />
      <p className="eyebrow mb-2" style={{ color: "#f87171" }}>
        Error
      </p>
      <p className="body-lg mb-5">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}
