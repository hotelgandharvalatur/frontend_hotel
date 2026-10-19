"use client";

import React, { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className={`field-wrap ${className}`}>
        <input
          ref={ref}
          id={inputId}
          placeholder=" "
          className="field-input"
          {...props}
        />
        <label htmlFor={inputId} className="field-label">
          {label}
        </label>
        {error && (
          <p className="text-red-400 text-xs mt-1 font-medium">{error}</p>
        )}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FormTextarea = forwardRef<
  HTMLTextAreaElement,
  FormTextareaProps
>(({ label, error, className = "", id, ...props }, ref) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={`field-wrap ${className}`}>
      <textarea
        ref={ref}
        id={inputId}
        placeholder=" "
        rows={4}
        className="field-input resize-none"
        {...props}
      />
      <label htmlFor={inputId} className="field-label">
        {label}
      </label>
      {error && (
        <p className="text-red-400 text-xs mt-1 font-medium">{error}</p>
      )}
    </div>
  );
});
FormTextarea.displayName = "FormTextarea";

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, options, className = "", id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className={`field-wrap ${className}`}>
        <select
          ref={ref}
          id={inputId}
          className="field-input"
          style={{ paddingTop: "1.5rem", paddingBottom: "0.5rem" }}
          {...props}
        >
          <option value="" className="bg-[#24130A] text-[#FFF7E8]">— Select —</option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-[#24130A] text-[#FFF7E8]">
              {o.label}
            </option>
          ))}
        </select>
        <label
          htmlFor={inputId}
          className="field-label"
          style={{ top: "0.2rem", fontSize: "0.75rem", fontWeight: 600, color: "var(--accent-light)", letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          {label}
        </label>
        {error && (
          <p className="text-red-400 text-[13px] mt-1 font-medium">{error}</p>
        )}
      </div>
    );
  }
);
FormSelect.displayName = "FormSelect";
