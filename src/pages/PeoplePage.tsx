import { useState } from "react";
import { PeopleGrid } from "@/components/people/PeopleGrid";
import { usePeople } from "@/hooks/use-swapi";
import { useDebounce } from "use-debounce";
import { ListPageContainer } from "@/components/layout/ListPageContainer";

export default function PeoplePage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError, isPlaceholderData, refetch } = usePeople(
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
      title="Characters"
      description="Browse and filter the list of characters from the Star Wars universe."
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
    >
      <PeopleGrid
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
