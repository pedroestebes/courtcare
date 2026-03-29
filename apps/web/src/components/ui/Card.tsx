import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
  children: ReactNode;
  noPadding?: boolean;
}

export function Card({ header, children, noPadding, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200",
        className
      )}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-gray-100 font-semibold text-gray-800">
          {header}
        </div>
      )}
      <div className={cn(noPadding ? "" : "p-6")}>{children}</div>
    </div>
  );
}
