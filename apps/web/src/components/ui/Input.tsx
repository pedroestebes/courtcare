import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-white/70"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-2.5 rounded-xl border bg-white/10 text-white placeholder:text-white/30 transition-colors duration-200 backdrop-blur-sm",
            "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
            error
              ? "border-red-400/50 focus:ring-red-500"
              : "border-white/15 hover:border-white/25",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-400 mt-0.5">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
