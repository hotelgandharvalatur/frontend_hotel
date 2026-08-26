import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  href?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 cursor-pointer select-none overflow-hidden group";

  const sizes: Record<string, string> = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-sm px-8 py-4 gap-2.5",
  };

  const variants: Record<string, string> = {
    primary:
      "bg-[#8f2a12] text-white hover:bg-[#7b230e] active:scale-[0.97] rounded-sm",
    secondary:
      "bg-[var(--surface-2)] text-[var(--warm-white)] border border-[var(--border)] hover:border-[var(--border-accent)] rounded-sm",
    ghost:
      "text-[var(--warm-white)] hover:text-[var(--accent-light)] rounded-sm",
    outline:
      "border border-[#d49a2a] text-[#D49A2A] bg-transparent hover:bg-[#d49a2a] hover:text-[#24130A] rounded-sm",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Underline draw effect for ghost variant */}
      {variant === "ghost" && (
        <span className="absolute bottom-0 left-0 h-px w-0 bg-[var(--accent-light)] transition-all duration-300 group-hover:w-full" />
      )}
      {children}
    </button>
  );
}

/* Link-as-button wrapper */
interface LinkButtonProps {
  href: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  children: React.ReactNode;
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: LinkButtonProps) {
  const base =
    "relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 cursor-pointer select-none overflow-hidden group no-underline";

  const sizes: Record<string, string> = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-sm px-8 py-4 gap-2.5",
  };

  const variants: Record<string, string> = {
    primary:
      "bg-[#8f2a12] text-white hover:bg-[#7b230e] active:scale-[0.97] rounded-sm",
    secondary:
      "bg-[var(--surface-2)] text-[var(--warm-white)] border border-[var(--border)] hover:border-[var(--border-accent)] rounded-sm",
    ghost:
      "text-[var(--warm-white)] hover:text-[var(--accent-light)] rounded-sm",
    outline:
      "border border-[#d49a2a] text-[#D49A2A] bg-transparent hover:bg-[#d49a2a] hover:text-[#24130A] rounded-sm",
  };

  return (
    <a
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {variant === "ghost" && (
        <span className="absolute bottom-0 left-0 h-px w-0 bg-[var(--accent-light)] transition-all duration-300 group-hover:w-full" />
      )}
      {children}
    </a>
  );
}
