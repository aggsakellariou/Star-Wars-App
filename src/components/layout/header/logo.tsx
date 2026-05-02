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
  <div className={cn("flex items-center gap-4", className)}>
    <img 
      src="/logo.png" 
      alt="Star Wars Universe Logo" 
      className="h-10 w-auto object-contain" 
    />
    <div className="flex flex-col border-l-2 border-secondary/30 pl-4 py-1 leading-tight">
      <span className="font-display text-sm uppercase tracking-[0.2em] font-black">
        Universe
      </span>
      <span className="font-mono-sw text-[8px] uppercase tracking-[0.3em] opacity-80">
        Explorer
      </span>
    </div>
  </div>
);
