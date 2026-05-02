import { useFilms } from "@/hooks/use-swapi";
import { useDebounce } from "use-debounce";
import { ListPageContainer } from "@/components/layout/ListPageContainer";
import { useGridStore } from "@/hooks/use-grid-store";
import { FilmGrid } from "@/components/films/FilmGrid";

export default function FilmPage() {
  const { films, updateFilms } = useGridStore();
  const { page, pageSize, search } = films;
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError, isPlaceholderData, refetch } = useFilms(
    page,
    debouncedSearch,
    pageSize
  );

  const handlePageSizeChange = (size: number) => {
    updateFilms({ pageSize: size, page: 1 });
  };

  const handleSearch = (val: string) => {
    updateFilms({ search: val, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    updateFilms({ page: newPage });
  };

  return (
    <ListPageContainer
      title="Films"
      description="Browse and filter the list of films from the Star Wars universe."
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
    >
      <FilmGrid
        data={data?.results || []}
        rowCount={data?.count || 0}
        page={page}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSearchChange={handleSearch}
        search={search}
        isLoading={isPlaceholderData}
      />
    </ListPageContainer>
  );
}
