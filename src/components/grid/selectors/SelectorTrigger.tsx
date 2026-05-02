"use client";

import { CirclePlus } from "lucide-react";
import { cn } from "@/lib/utils";
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
    <button
      data-testid={triggerTestId}
      disabled={disabled}
      className={cn(
        "h-8 px-3 bg-secondary text-primary border-[3px] border-secondary hover:bg-primary hover:text-secondary transition-colors flex items-center gap-2 font-display text-xs uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      <CirclePlus className="h-4 w-4" />
      <span>{title}</span>
      {selectedCount > 0 && (
        <div className="flex items-center gap-1 ml-1">
          <div className="hidden lg:flex gap-1">
            {selectedCount > 1 ? (
              <span className="bg-primary text-secondary px-1 font-mono-sw text-[9px] border border-secondary">
                {selectedCount}
              </span>
            ) : (
              selectedOptions.map((option) => (
                <span
                  key={String(option.value)}
                  className="bg-primary text-secondary px-1 font-mono-sw text-[9px] border border-secondary"
                >
                  {formatLabel ? formatLabel(option) : option.label}
                </span>
              ))
            )}
          </div>
          <span className="lg:hidden bg-primary text-secondary px-1 font-mono-sw text-[9px] border border-secondary">
            {selectedCount}
          </span>
        </div>
      )}
    </button>
  );
}
