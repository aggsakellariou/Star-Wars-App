import type { ColumnDef } from "@tanstack/react-table";

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
    header: "Name",
    cell: ({ row }) => <div className="font-semibold">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "age",
    header: "Age",
    accessorFn: (row) => 
      row.birth_year === "unknown" 
        ? "Unknown" 
        : row.birth_year.replace(/[^0-9.]/g, ""),
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "height",
    header: "Height",
  },
  {
    accessorKey: "mass",
    header: "Mass",
  },
  {
    accessorKey: "skin_color",
    header: "Skin Color",
  },
  {
    accessorKey: "films_count",
    header: "Films",
    accessorFn: (row) => row.films.length,
  },
];
