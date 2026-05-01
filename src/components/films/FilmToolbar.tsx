import * as React from "react";
import type { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Selector } from "@/components/grid/selectors/Selector";
import { DataTableResetFilter } from "@/components/grid/DataTableResetFilter";

interface FilmToolbarProps<TData> {
  table: Table<TData>;
  searchPlaceholder?: string;
}

export function FilmToolbar<TData>({
  table,
  searchPlaceholder = "Search films by title...",
}: FilmToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [displayValue, setDisplayValue] = React.useState<string>(
    (table.getColumn("title")?.getFilterValue() as string) ?? "",
  );

  React.useEffect(() => {
    table.getColumn("title")?.setFilterValue(displayValue);
  }, [displayValue, table]);

  const filters = (
    <>
      {table.getColumn("episode_id") && (
        <Selector
          title="Episode"
          options={[
            { label: "Episode I", value: 1 },
            { label: "Episode II", value: 2 },
            { label: "Episode III", value: 3 },
            { label: "Episode IV", value: 4 },
            { label: "Episode IIV", value: 5 },
            { label: "Episode VI", value: 6 },
          ]}
          value={table.getColumn("episode_id")?.getFilterValue() as number[]}
          onValueChange={(value) =>
            table.getColumn("episode_id")?.setFilterValue(value)
          }
        />
      )}

      {table.getColumn("director") && (
        <Selector
          title="Director"
          options={[
            { label: "George Lucas", value: "George Lucas" },
            { label: "Irvin Kershner", value: "Irvin Kershner" },
            { label: "Richard Marquand", value: "Richard Marquand" },
            { label: "J. J. Abrams", value: "J. J. Abrams" },
            { label: "Rian Johnson", value: "Rian Johnson" },
          ]}
          value={table.getColumn("director")?.getFilterValue() as string[]}
          onValueChange={(value) =>
            table.getColumn("director")?.setFilterValue(value)
          }
        />
      )}

      {table.getColumn("producer") && (
        <Selector
          title="Producer"
          options={[
            { label: "Gary Kurtz", value: "Gary Kurtz" },
            { label: "Rick McCallum", value: "Rick McCallum" },
            { label: "Howard G. Kazanjian", value: "Howard G. Kazanjian" },
            { label: "George Lucas", value: "George Lucas" },
            { label: "Kathleen Kennedy", value: "Kathleen Kennedy" },
          ]}
          value={table.getColumn("producer")?.getFilterValue() as string[]}
          onValueChange={(value) =>
            table.getColumn("producer")?.setFilterValue(value)
          }
        />
      )}

      <DataTableResetFilter
        isFiltered={isFiltered}
        onReset={() => {
          table.resetColumnFilters();
          setDisplayValue("");
        }}
      />
    </>
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        placeholder={searchPlaceholder}
        value={displayValue}
        onChange={(event) => {
          setDisplayValue(event.target.value);
        }}
        className="h-8 flex-1 min-w-[200px]"
      />
      <div className="flex flex-wrap items-center gap-2">{filters}</div>
    </div>
  );
}
