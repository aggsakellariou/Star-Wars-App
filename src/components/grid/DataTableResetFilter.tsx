import { CustomButton } from "@/components/ui/custom/custom-button";
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
    <CustomButton
      variant="red"
      size="sm"
      onClick={onReset}
      className={cn("h-8 px-2 lg:px-3 border-dashed hover:cursor-pointer", className)}
    >
      <RotateCcw className="mr-2 h-4 w-4" />
      Reset
    </CustomButton>
  );
}
