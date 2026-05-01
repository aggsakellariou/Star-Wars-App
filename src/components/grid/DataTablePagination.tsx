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

import { CustomButton } from "@/components/ui/custom/custom-button";
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
    <div className="flex items-center justify-between px-2 py-4">
      {/* Left: rows per page selector (label hidden on mobile) */}
      <div className="flex items-center gap-x-4">
        <p className="text-sm font-medium hidden sm:block">
          Rows per page
        </p>
        <Popover>
          <PopoverTrigger
            render={
              <CustomButton
                variant="gray"
                size="sm"
                className="h-8 w-[70px] hover:cursor-pointer"
              >
                {pageSize}
                <ChevronDown className="ml-2 h-3 w-3" />
              </CustomButton>
            }
          />
          <PopoverContent side="top" align="start" className="w-[100px] p-1">
            <div className="flex flex-col gap-0.5">
              {pageSizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => table.setPageSize(size)}
                  className={cn(
                    "relative flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none select-none hover:bg-accent hover:text-accent-foreground transition-colors",
                    pageSize === size && "bg-accent/50 font-medium"
                  )}
                >
                  <span>{size}</span>
                  {pageSize === size && <CheckIcon className="size-4 ml-2" />}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Right: page info and navigation buttons */}
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex items-center justify-center text-sm font-medium">
          Page {currentPage} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <CustomButton
            variant="gray"
            size="icon"
            className="hidden h-8 w-8 p-0 sm:flex hover:cursor-pointer"
            onClick={() => goToPage(1)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </CustomButton>
          <CustomButton
            variant="gray"
            size="icon"
            className="h-8 w-8 p-0 hover:cursor-pointer"
            onClick={() => goToPage(currentPage - 1)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </CustomButton>
          <CustomButton
            variant="gray"
            size="icon"
            className="h-8 w-8 p-0 hover:cursor-pointer"
            onClick={() => goToPage(currentPage + 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </CustomButton>
          <CustomButton
            variant="gray"
            size="icon"
            className="hidden h-8 w-8 p-0 sm:flex hover:cursor-pointer"
            onClick={() => goToPage(pageCount)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </CustomButton>
        </div>
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
