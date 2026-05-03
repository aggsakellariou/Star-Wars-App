import { Input } from "@/components/ui/input";
import { DataTableResetFilter } from "@/components/grid/DataTableResetFilter";

interface FilmToolbarProps {
  searchPlaceholder?: string;
  search: string;
  onSearchChange: (search: string) => void;
}

export function FilmToolbar({
  searchPlaceholder = "Search films by title...",
  search,
  onSearchChange,
}: FilmToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-primary text-secondary p-4 border-[5px] border-secondary">
      <div className="flex-1 min-w-[200px] relative flex items-center gap-2">
        <Input
          placeholder={searchPlaceholder}
          value={search}
          onChange={(event) => {
            onSearchChange(event.target.value);
          }}
          className="h-10 bg-transparent text-secondary border-[3px] border-secondary rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-secondary/60 font-mono-sw text-base md:text-xs uppercase px-4"
        />
        <DataTableResetFilter 
          isFiltered={search.length > 0} 
          onReset={() => onSearchChange("")} 
        />
      </div>
    </div>
  );
}
