import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { DataTablePagination } from "@/components/grid/DataTablePagination"
import { FilmToolbar } from "./FilmToolbar"
import { filmColumns, type Film } from "./FilmColumns"
import { FilmCard } from "./FilmCard"
import { EmptyState } from "@/components/ui/custom/EmptyState"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilmGridProps {
  data: Film[]
  rowCount: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  onSearchChange: (search: string) => void
  search: string
  isLoading?: boolean
}

export function FilmGrid({ 
  data, 
  rowCount, 
  page, 
  pageSize,
  onPageChange, 
  onPageSizeChange,
  onSearchChange, 
  search,
  isLoading 
 }: FilmGridProps) {
  const table = useReactTable({
    data,
    columns: filmColumns,
    pageCount: Math.ceil(rowCount / pageSize),
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const nextState = typeof updater === "function" 
        ? updater({ pageIndex: page - 1, pageSize: pageSize }) 
        : updater;
      
      if (nextState.pageIndex !== page - 1) {
        onPageChange(nextState.pageIndex + 1);
      }
      if (nextState.pageSize !== pageSize) {
        onPageSizeChange(nextState.pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
  })

  return (
    <div className={cn(
      "space-y-4",
      isLoading && "opacity-50 pointer-events-none transition-opacity"
    )}>
      <FilmToolbar 
        search={search}
        onSearchChange={onSearchChange}
      />
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-start">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <FilmCard key={row.id} film={row.original} />
          ))
        ) : (
          <EmptyState
            className="col-span-full"
            icon={<Search className="h-10 w-10" />}
            title="No films found"
            description="Try adjusting your filters or search terms to find what you're looking for."
          />
        )}
      </div>

      <DataTablePagination table={table} pageSizeOptions={[10, 20, 30, 40, 50]} />
    </div>
  )
}
