import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { DataTablePagination } from "@/components/grid/DataTablePagination"
import { FilmToolbar } from "./FilmToolbar"
import { filmColumns, type Film } from "./FilmColumns"
import { FilmCard } from "./FilmCard"
import { EmptyState } from "@/components/ui/custom/EmptyState"
import { Search } from "lucide-react"

interface FilmGridProps {
  data: Film[]
}

export function FilmGrid({ data }: FilmGridProps) {
  const table = useReactTable({
    data,
    columns: filmColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <FilmToolbar table={table} />
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

      <DataTablePagination table={table} />
    </div>
  )
}
