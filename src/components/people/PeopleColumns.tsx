import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/grid/DataTableColumnHeader";

export interface Person {
  name: string
  birth_year: string
  gender: string
  height: string
  mass: string
  skin_color: string
  homeworld: string
  films: string[]
  species: string[]
  starships: string[]
  vehicles: string[]
  url: string
  created: string
  edited: string
}

export const peopleColumns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="font-semibold">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
    accessorFn: (row) => 
      row.birth_year === "unknown" 
        ? "Unknown" 
        : row.birth_year.replace(/[^0-9.]/g, ""),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
  },
  {
    accessorKey: "height",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Height" />
    ),
  },
  {
    accessorKey: "mass",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mass" />
    ),
  },
  {
    accessorKey: "skin_color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skin Color" />
    ),
  },
  {
    accessorKey: "films_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Films" />
    ),
    accessorFn: (row) => row.films.length,
  },
];
