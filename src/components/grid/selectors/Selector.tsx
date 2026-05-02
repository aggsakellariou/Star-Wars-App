"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { SelectorPopover, type SelectorOption } from "./SelectorPopover";
import { SelectorDrawer } from "./SelectorDrawer";

interface SelectorProps<T = string> {
  // Data & Selection
  options: SelectorOption<T>[];
  value?: T[];
  onValueChange: (value: T[] | undefined) => void;

  // Display
  title: string;
  emptyMessage?: string;

  // Customization
  renderOption?: (option: SelectorOption<T>) => React.ReactNode;
  formatLabel?: (option: SelectorOption<T>) => string;

  // State
  disabled?: boolean;
  triggerTestId?: string;
}

export function Selector<T = string>(props: SelectorProps<T>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <SelectorDrawer {...props} />;
  }

  return <SelectorPopover {...props} />;
}
