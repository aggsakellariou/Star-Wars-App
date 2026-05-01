import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { DataTablePagination } from "@/components/grid/DataTablePagination"
import { PeopleToolbar } from "./PeopleToolbar"
import { peopleColumns, type Person } from "./PeopleColumns"
import { PersonCard } from "./PersonCard"
import { EmptyState } from "@/components/ui/custom/EmptyState"
import { Search } from "lucide-react"

interface PeopleGridProps {
  data: Person[]
}

export function PeopleGrid({ data }: PeopleGridProps) {
  const table = useReactTable({
    data,
    columns: peopleColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <PeopleToolbar table={table} />
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

      <DataTablePagination table={table} />
    </div>
  )
}
