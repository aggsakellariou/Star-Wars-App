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
      <PopoverContent className="w-[250px] p-0" align="start">
        <Command>
          <div className="hidden md:block">
            <CommandInput placeholder={title} />
          </div>
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedArray.includes(option.value);
                const isDisabled = option.disabled || option.count === 0;
                return (
                  <CommandItem
                    key={String(option.value)}
                    className="hover:cursor-pointer"
                    disabled={isDisabled}
                    onSelect={() => !isDisabled && handleSelect(option.value)}
                  >
                    <div
                      className={cn(
                        "flex size-4 items-center justify-center rounded-[4px] border mr-2",
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-input [&_svg]:invisible",
                      )}
                    >
                      <Check className="!text-primary-foreground size-3.5" />
                    </div>

                    {renderOption ? (
                      renderOption(option)
                    ) : (
                      <span className="truncate flex-1 min-w-0">
                        {formatLabel ? formatLabel(option) : option.label}
                      </span>
                    )}

                    {option.count !== undefined && (
                      <span className="text-muted-foreground ml-auto flex items-center justify-center font-mono text-xs">
                        {option.count}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedCount > 0 && (
              <>
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClear}
                    className="items-center justify-center hover:cursor-pointer hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors [&_svg]:hidden"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
