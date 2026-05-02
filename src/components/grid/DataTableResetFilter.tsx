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
        "h-8 px-3 bg-secondary text-[hsl(var(--destructive,0_100%_50%))] border-[3px] border-secondary hover:bg-[hsl(var(--destructive,0_100%_50%))] hover:text-secondary transition-colors flex items-center gap-2 font-display text-xs uppercase cursor-pointer",
        className
      )}
    >
      <RotateCcw className="h-4 w-4" />
      Reset
    </button>
  );
}
