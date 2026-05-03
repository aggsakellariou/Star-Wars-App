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
        "h-10 px-8 bg-transparent text-secondary border-[3px] border-secondary hover:bg-secondary hover:text-primary transition-colors flex items-center gap-2 font-mono-sw text-xs font-bold uppercase cursor-pointer shrink-0",
        className
      )}
    >
      <RotateCcw className="h-3.5 w-3.5" />
      Reset
    </button>
  );
}
