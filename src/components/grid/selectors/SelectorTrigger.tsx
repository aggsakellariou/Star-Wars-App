"use client";

import { CirclePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomButton } from "@/components/ui/custom/custom-button";
import { Badge } from "@/components/ui/badge";
import type { SelectorOption } from "./SelectorPopover";

interface SelectorTriggerProps<
  T = string,
> extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  selectedOptions: SelectorOption<T>[];
  formatLabel?: (option: SelectorOption<T>) => string;
  triggerTestId?: string;
}

export function SelectorTrigger<T = string>({
  title,
  selectedOptions,
  formatLabel,
  disabled = false,
  triggerTestId,
  className,
  ...props
}: SelectorTriggerProps<T>) {
  const selectedCount = selectedOptions.length;

  return (
    <CustomButton
      variant="gray"
      size="sm"
      data-testid={triggerTestId}
      disabled={disabled}
      className={cn(
        "h-8 border-dashed hover:cursor-pointer transition-colors",
        className,
      )}
      {...props}
    >
      <CirclePlus className="mr-2 h-4 w-4" />
      <span>{title}</span>
      {selectedCount > 0 && (
        <div className="flex items-center gap-1 ml-1">
          <Badge
            variant="secondary"
            className="rounded-sm px-1 font-normal lg:hidden bg-zinc-200/80 text-zinc-900 dark:bg-secondary dark:text-secondary-foreground"
          >
            {selectedCount}
          </Badge>
          <div className="hidden gap-1 lg:flex">
            {selectedCount > 2 ? (
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal bg-zinc-200/80 text-zinc-900 dark:bg-secondary dark:text-secondary-foreground"
              >
                {selectedCount} selected
              </Badge>
            ) : (
              selectedOptions.map((option) => (
                <Badge
                  key={String(option.value)}
                  variant="secondary"
                  className="rounded-sm px-1 font-normal bg-zinc-200/80 text-zinc-900 dark:bg-secondary dark:text-secondary-foreground"
                >
                  {formatLabel ? formatLabel(option) : option.label}
                </Badge>
              ))
            )}
          </div>
        </div>
      )}
    </CustomButton>
  );
}
