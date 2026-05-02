import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToolbarSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 bg-secondary/5 border-[5px] border-secondary/20 p-4 animate-pulse", className)}>
      <div className="h-10 flex-1 bg-secondary/10" />
    </div>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("h-[180px] w-full bg-secondary/10 animate-pulse border-[5px] border-secondary/20", className)} />
  );
}

export function PaginationSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-between p-4 border-[5px] border-secondary/20 animate-pulse", className)}>
      <div className="h-10 w-1/4 bg-secondary/10" />
      <div className="flex gap-2">
        <div className="h-10 w-10 bg-secondary/10" />
        <div className="h-10 w-10 bg-secondary/10" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="space-y-6">
      <ToolbarSkeleton />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <PaginationSkeleton />
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto py-6 flex-1 flex items-center justify-center min-h-[500px]">
      <div className="bg-primary text-secondary border-[8px] border-secondary p-12 flex flex-col items-center justify-center space-y-4 animate-pulse w-full max-w-2xl mx-auto">
        <Loader2 className="h-12 w-12 animate-spin" />
        <div className="text-center">
          <div className="font-display text-3xl uppercase tracking-tighter leading-none">Initializing...</div>
          <div className="font-mono-sw text-[10px] mt-2 uppercase opacity-80">Scanning Databanks</div>
        </div>
      </div>
    </div>
  );
}
