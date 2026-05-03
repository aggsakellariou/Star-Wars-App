import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { DataTablePagination } from "@/components/grid/DataTablePagination"
import { PeopleToolbar } from "./PeopleToolbar"
import { peopleColumns, type Person } from "./PeopleColumns"
import { PersonCard } from "./PersonCard"
import { EmptyState } from "@/components/ui/custom/EmptyState"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRef } from "react"

interface PeopleGridProps {
  data: Person[]
  rowCount: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  onSearchChange: (search: string) => void
  search: string
  isLoading?: boolean
}

export function PeopleGrid({ 
  data, 
  rowCount, 
  page, 
  pageSize,
  onPageChange, 
  onPageSizeChange,
  onSearchChange, 
  search,
  isLoading 
}: PeopleGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const table = useReactTable({
    data,
    columns: peopleColumns,
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
    <div ref={containerRef} className={cn(
      "space-y-4",
      isLoading && "opacity-50 pointer-events-none transition-opacity"
    )}>
      <PeopleToolbar 
        search={search}
        onSearchChange={onSearchChange}
      />
      
      <div className="grid grid-cols-1 min-[525px]:grid-cols-2 min-[700px]:grid-cols-3 min-[850px]:grid-cols-4 min-[1000px]:grid-cols-5 gap-4 items-start">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <PersonCard key={row.id} person={row.original} />
          ))
        ) : (
          <EmptyState
            className="col-span-full"
            icon={<Search className="h-10 w-10" />}
            title="No characters found"
            description="Try adjusting your filters or search terms to find what you're looking for."
          />
        )}
      </div>

      <DataTablePagination table={table} pageSizeOptions={[10, 20, 30, 40, 50]} scrollTargetRef={containerRef} />
    </div>
  )
}
