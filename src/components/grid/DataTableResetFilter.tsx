import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableResetFilterProps {
  isFiltered: boolean;
  onReset: () => void;
  className?: string;
}

export function DataTableResetFilter({
  isFiltered,
  onReset,
  className,
}: DataTableResetFilterProps) {
  if (!isFiltered) return null;

  return (
    <button
      onClick={onReset}
      className={cn(
        "h-8 px-3 bg-[hsl(var(--sw-bg))] text-[hsl(var(--sw-red,0_100%_50%))] border-[3px] border-[hsl(var(--sw-bg))] hover:bg-[hsl(var(--sw-red,0_100%_50%))] hover:text-[hsl(var(--sw-bg))] transition-colors flex items-center gap-2 font-display text-xs uppercase cursor-pointer",
        className
      )}
    >
      <RotateCcw className="h-4 w-4" />
      Reset
    </button>
  );
}
