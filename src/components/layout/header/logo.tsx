import type React from "react";
import { cn } from "@/lib/utils";

export const LogoIcon = ({ className }: React.HTMLAttributes<HTMLDivElement>) => (
  <img 
    src="/logo.png" 
    alt="Star Wars Logo Icon" 
    className={cn("size-8 object-contain", className)} 
  />
);

export const Logo = ({ className }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center gap-2 min-[400px]:gap-4", className)}>
    <img 
      src="/logo.png" 
      alt="Star Wars Universe Logo" 
      className="h-8 min-[400px]:h-10 w-auto object-contain hidden min-[400px]:block" 
    />
    <div className="flex flex-col min-[400px]:border-l-2 border-secondary/30 min-[400px]:pl-4 py-1 leading-none">
      <span className="font-display text-base uppercase tracking-normal">
        Universe
      </span>
      <span className="font-mono-sw text-[10px] uppercase tracking-[0.1em]">
        Explorer
      </span>
    </div>
  </div>
);
