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
        "rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/8 transition-colors duration-200",
        className
      )}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-white/10 font-semibold text-white">
          {header}
        </div>
      )}
      <div className={cn(noPadding ? "" : "p-6")}>{children}</div>
    </div>
  );
}
