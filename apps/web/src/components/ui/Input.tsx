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
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-2.5 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
            error
              ? "border-red-400 focus:ring-red-500"
              : "border-gray-200 hover:border-gray-300",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500 mt-0.5">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
