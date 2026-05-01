import type { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Selector } from "@/components/grid/selectors/Selector";
import { DataTableResetFilter } from "@/components/grid/DataTableResetFilter";

interface PeopleToolbarProps<TData> {
  table: Table<TData>;
  searchPlaceholder?: string;
  search: string;
  onSearchChange: (search: string) => void;
}

export function PeopleToolbar<TData>({
  table,
  searchPlaceholder = "Search characters by name...",
  search,
  onSearchChange,
}: PeopleToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0 || search !== "";

  const filters = (
    <>
      {table.getColumn("gender") && (
        <Selector
          title="Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "N/A", value: "n/a" },
            { label: "Hermaphrodite", value: "hermaphrodite" },
          ]}
          value={table.getColumn("gender")?.getFilterValue() as string[]}
          onValueChange={(value) =>
            table.getColumn("gender")?.setFilterValue(value)
          }
        />
      )}

      {table.getColumn("skin_color") && (
        <Selector
          title="Skin Color"
          options={[
            { label: "Fair", value: "fair" },
            { label: "Gold", value: "gold" },
            { label: "White", value: "white" },
            { label: "Blue", value: "blue" },
            { label: "Light", value: "light" },
            { label: "Green", value: "green" },
            { label: "Pale", value: "pale" },
            { label: "Grey", value: "grey" },
            { label: "Dark", value: "dark" },
            { label: "Tan", value: "tan" },
          ]}
          value={table.getColumn("skin_color")?.getFilterValue() as string[]}
          onValueChange={(value) =>
            table.getColumn("skin_color")?.setFilterValue(value)
          }
        />
      )}

      <DataTableResetFilter
        isFiltered={isFiltered}
        onReset={() => {
          table.resetColumnFilters();
          onSearchChange("");
        }}
      />
    </>
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        placeholder={searchPlaceholder}
        value={search}
        onChange={(event) => {
          onSearchChange(event.target.value);
        }}
        className="h-8 flex-1 min-w-[200px]"
      />
      <div className="flex flex-wrap items-center gap-2">{filters}</div>
    </div>
  );
}
