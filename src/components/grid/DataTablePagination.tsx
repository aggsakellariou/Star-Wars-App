"use client";

import * as React from "react";
import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  CheckIcon,
} from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  scrollTargetRef?: React.RefObject<HTMLElement | null>;
  toolbarRef?: React.RefObject<HTMLElement | null>;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50];
export const NAVBAR_HEIGHT = 86;

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  scrollTargetRef,
  toolbarRef,
}: DataTablePaginationProps<TData>) {
  const goToPage = (page: number) => {
    table.setPageIndex(page - 1);
    if (typeof window !== "undefined") {
      const navbarHeight = NAVBAR_HEIGHT;
      if (toolbarRef?.current) {
        const elementTop = toolbarRef.current.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementTop - navbarHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      } else if (scrollTargetRef?.current) {
        scrollTargetRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[hsl(var(--sw-yellow))] text-[hsl(var(--sw-bg))] border-[5px] border-[hsl(var(--sw-bg))] p-4 font-mono-sw text-[10px] uppercase">
      {/* Left: rows per page selector */}
      <div className="flex items-center gap-x-4">
        <span className="font-bold">Rows per page</span>
        <Popover>
          <PopoverTrigger
            render={
              <button
                className="h-8 w-[70px] bg-[hsl(var(--sw-bg))] text-[hsl(var(--sw-yellow))] border-[3px] border-[hsl(var(--sw-bg))] hover:bg-[hsl(var(--sw-yellow))] hover:text-[hsl(var(--sw-bg))] transition-colors flex items-center justify-center gap-1 font-display text-sm cursor-pointer"
              >
                {pageSize}
                <ChevronDown className="h-3 w-3" />
              </button>
            }
          />
          <PopoverContent side="top" align="start" className="w-[100px] p-0 bg-[hsl(var(--sw-yellow))] border-[3px] border-[hsl(var(--sw-bg))] rounded-none">
            <div className="flex flex-col">
              {pageSizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => table.setPageSize(size)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between px-3 py-2 text-xs font-mono-sw uppercase hover:bg-[hsl(var(--sw-bg))] hover:text-[hsl(var(--sw-yellow))] transition-colors",
                    pageSize === size && "bg-[hsl(var(--sw-bg))] text-[hsl(var(--sw-yellow))]"
                  )}
                >
                  <span>{size}</span>
                  {pageSize === size && <CheckIcon className="size-3" />}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Center: page info */}
      <div className="font-display text-base tracking-tight">
        Page {currentPage} of {pageCount}
      </div>

      {/* Right: navigation buttons */}
      <div className="flex items-center space-x-2">
        <button
          className="h-8 w-8 bg-[hsl(var(--sw-bg))] text-[hsl(var(--sw-yellow))] border-[3px] border-[hsl(var(--sw-bg))] hover:bg-[hsl(var(--sw-yellow))] hover:text-[hsl(var(--sw-bg))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center cursor-pointer"
          onClick={() => goToPage(1)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          className="h-8 w-8 bg-[hsl(var(--sw-bg))] text-[hsl(var(--sw-yellow))] border-[3px] border-[hsl(var(--sw-bg))] hover:bg-[hsl(var(--sw-yellow))] hover:text-[hsl(var(--sw-bg))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center cursor-pointer"
          onClick={() => goToPage(currentPage - 1)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          className="h-8 w-8 bg-[hsl(var(--sw-bg))] text-[hsl(var(--sw-yellow))] border-[3px] border-[hsl(var(--sw-bg))] hover:bg-[hsl(var(--sw-yellow))] hover:text-[hsl(var(--sw-bg))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center cursor-pointer"
          onClick={() => goToPage(currentPage + 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          className="h-8 w-8 bg-[hsl(var(--sw-bg))] text-[hsl(var(--sw-yellow))] border-[3px] border-[hsl(var(--sw-bg))] hover:bg-[hsl(var(--sw-yellow))] hover:text-[hsl(var(--sw-bg))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center cursor-pointer"
          onClick={() => goToPage(pageCount)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-24 hidden sm:block" />
        <Skeleton className="h-8 w-[70px]" />
      </div>
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-20 hidden md:block" />
        <Skeleton className="h-8 w-8 hidden sm:block" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8 hidden sm:block" />
      </div>
    </div>
  );
}
