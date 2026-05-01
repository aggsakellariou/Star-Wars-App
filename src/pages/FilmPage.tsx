import { useState } from "react";
import { FilmGrid } from "@/components/films/FilmGrid";
import { useFilms } from "@/hooks/use-swapi";
import { useDebounce } from "use-debounce";
import { ListPageContainer } from "@/components/layout/ListPageContainer";

export default function FilmPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError, isPlaceholderData, refetch } = useFilms(
    page,
    debouncedSearch,
    pageSize
  );

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1); // Reset to first page when page size changes
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
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
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
        onSearchChange={handleSearch}
        search={search}
        isLoading={isPlaceholderData}
      />
    </ListPageContainer>
  );
}
