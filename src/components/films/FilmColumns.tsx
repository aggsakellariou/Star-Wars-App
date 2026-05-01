import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/grid/DataTableColumnHeader";

export interface Film {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  species: string[]
  starships: string[]
  vehicles: string[]
  characters: string[]
  planets: string[]
  url: string
  created: string
  edited: string
}

export const filmColumns: ColumnDef<Film>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => <div className="font-semibold">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "episode_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Episode" />
    ),
  },
  {
    accessorKey: "director",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Director" />
    ),
  },
  {
    accessorKey: "release_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Release Date" />
    ),
  },
  {
    accessorKey: "producer",
    header: "Producer",
  },
];
