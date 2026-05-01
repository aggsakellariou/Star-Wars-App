import type { ColumnDef } from "@tanstack/react-table";

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
    header: "Title",
    cell: ({ row }) => <div className="font-semibold">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "episode_id",
    header: "Episode",
  },
  {
    accessorKey: "director",
    header: "Director",
  },
  {
    accessorKey: "release_date",
    header: "Release Date",
  },
  {
    accessorKey: "producer",
    header: "Producer",
  },
];
