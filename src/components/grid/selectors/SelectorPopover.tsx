"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { SelectorTrigger } from "./SelectorTrigger";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface SelectorOption<T = string> {
  label: string;
  value: T;
  count?: number;
  disabled?: boolean;
}

interface SelectorPopoverProps<T = string> {
  options: SelectorOption<T>[];
  value?: T[];
  onValueChange: (value: T[] | undefined) => void;
  title: string;
  emptyMessage?: string;
  renderOption?: (option: SelectorOption<T>) => React.ReactNode;
  formatLabel?: (option: SelectorOption<T>) => string;
  disabled?: boolean;
  triggerTestId?: string;
}

export function SelectorPopover<T = string>({
  options,
  value,
  onValueChange,
  title,
  emptyMessage = "No results found.",
  renderOption,
  formatLabel,
  disabled = false,
  triggerTestId,
}: SelectorPopoverProps<T>) {
  const [open, setOpen] = React.useState(false);

  const selectedArray = Array.isArray(value) ? value : [];
  const selectedCount = selectedArray.length;

  const handleSelect = (optionValue: T) => {
    const newArray = selectedArray.includes(optionValue)
      ? selectedArray.filter((v) => v !== optionValue)
      : [...selectedArray, optionValue];
    onValueChange(newArray.length ? (newArray as T[]) : undefined);
  };

  const handleClear = () => {
    onValueChange(undefined);
  };

  const selectedOptions = options.filter((option) =>
    selectedArray.some((selected) => selected === option.value),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <SelectorTrigger
            title={title}
            selectedOptions={selectedOptions}
            formatLabel={formatLabel}
            disabled={disabled}
            triggerTestId={triggerTestId}
          />
        }
      />
      <PopoverContent className="w-[250px] p-0 bg-[hsl(var(--sw-yellow))] border-[3px] border-[hsl(var(--sw-bg))] rounded-none" align="start">
        <Command className="bg-transparent">
          <div className="hidden md:block border-b-[3px] border-[hsl(var(--sw-bg))]">
            <CommandInput placeholder={title} className="bg-transparent text-[hsl(var(--sw-bg))] font-display placeholder:text-[hsl(var(--sw-bg))/50]" />
          </div>
          <CommandList className="max-h-[300px]">
            <CommandEmpty className="py-6 text-center text-xs font-mono-sw uppercase">{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedArray.includes(option.value);
                const isDisabled = option.disabled || option.count === 0;
                return (
                  <CommandItem
                    key={String(option.value)}
                    className="flex items-center px-3 py-2 hover:cursor-pointer aria-selected:bg-[hsl(var(--sw-bg))] aria-selected:text-[hsl(var(--sw-yellow))] transition-colors group"
                    disabled={isDisabled}
                    onSelect={() => !isDisabled && handleSelect(option.value)}
                  >
                    <div
                      className={cn(
                        "flex size-4 items-center justify-center border-2 border-[hsl(var(--sw-bg))] mr-3 transition-colors",
                        isSelected
                          ? "bg-[hsl(var(--sw-bg))] text-[hsl(var(--sw-yellow))]"
                          : "bg-transparent text-transparent group-aria-selected:border-[hsl(var(--sw-yellow))]",
                      )}
                    >
                      <Check className="size-3 stroke-[3px]" />
                    </div>

                    {renderOption ? (
                      renderOption(option)
                    ) : (
                      <span className="truncate flex-1 min-w-0 font-mono-sw text-xs uppercase">
                        {formatLabel ? formatLabel(option) : option.label}
                      </span>
                    )}

                    {option.count !== undefined && (
                      <span className="ml-auto font-display text-[10px]">
                        {option.count}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedCount > 0 && (
              <div className="border-t-[3px] border-[hsl(var(--sw-bg))]">
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClear}
                    className="flex items-center justify-center px-3 py-3 font-display text-xs uppercase hover:cursor-pointer aria-selected:bg-[hsl(var(--sw-bg))] aria-selected:text-[hsl(var(--sw-yellow))] transition-colors"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
