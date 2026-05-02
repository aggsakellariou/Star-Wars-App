"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { SelectorTrigger } from "./SelectorTrigger";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { CustomButton } from "@/components/ui/custom/custom-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { SelectorOption } from "./SelectorPopover";

interface SelectorDrawerProps<T = string> {
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

export function SelectorDrawer<T = string>({
  options,
  value,
  onValueChange,
  title,
  emptyMessage = "No results found.",
  renderOption,
  formatLabel,
  disabled = false,
  triggerTestId,
}: SelectorDrawerProps<T>) {
  const [open, setOpen] = React.useState(false);

  const selectedArray = Array.isArray(value) ? value : [];
  const selectedValues = new Set(selectedArray);

  const handleSelect = (optionValue: T) => {
    const newArray = selectedArray.includes(optionValue)
      ? selectedArray.filter((v) => v !== optionValue)
      : [...selectedArray, optionValue];
    onValueChange(newArray.length ? (newArray as T[]) : undefined);
  };

  const handleClear = () => {
    onValueChange(undefined);
  };

  const selectedOptions = options.filter((opt) =>
    selectedValues.has(opt.value),
  );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <SelectorTrigger
          title={title}
          selectedOptions={selectedOptions}
          formatLabel={formatLabel}
          disabled={disabled}
          triggerTestId={triggerTestId}
        />
      </DrawerTrigger>
      <DrawerContent className="max-h-[96%] flex flex-col overflow-hidden">
        <DrawerHeader className="shrink-0">
          <DrawerTitle className="text-center">{title}</DrawerTitle>
          <DrawerDescription className="text-center">
            Select {title.toLowerCase()} to filter by
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="flex-1 overflow-y-auto px-4">
          <div className="space-y-2 pb-4">
            {options.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground text-sm">
                {emptyMessage}
              </div>
            ) : (
              options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                const isDisabled = option.disabled || option.count === 0;
                return (
                  <button
                    type="button"
                    key={String(option.value)}
                    disabled={isDisabled}
                    onClick={() => !isDisabled && handleSelect(option.value)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all border",
                      isSelected
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-transparent bg-muted/50 hover:bg-muted",
                      isDisabled && "opacity-50 cursor-not-allowed",
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">
                        {renderOption
                          ? renderOption(option)
                          : formatLabel
                            ? formatLabel(option)
                            : option.label}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {option.count !== undefined && (
                        <Badge variant="secondary" className="text-xs">
                          {option.count}
                        </Badge>
                      )}
                      <div
                        className={cn(
                          "size-5 rounded border-2 flex items-center justify-center transition-colors",
                          isSelected
                            ? "bg-primary border-primary"
                            : "border-muted-foreground/30",
                        )}
                      >
                        {isSelected && (
                          <Check className="size-3 !text-primary-foreground" />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </ScrollArea>
        <DrawerFooter className="flex-row gap-2 mt-auto pt-4 shrink-0">
          {selectedValues.size > 0 && (
            <CustomButton
              variant="red"
              onClick={handleClear}
              className="flex-1 h-10"
            >
              Clear filters
            </CustomButton>
          )}
          <DrawerClose asChild>
            <CustomButton variant="gray" className="flex-1 h-10" autoFocus>
              Done
            </CustomButton>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
