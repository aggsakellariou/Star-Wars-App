import { usePeople } from "@/hooks/use-swapi";
import { useDebounce } from "use-debounce";
import { ListPageContainer } from "@/components/layout/ListPageContainer";
import { useGridStore } from "@/hooks/use-grid-store";
import { PeopleGrid } from "@/components/people/PeopleGrid";

export default function PeoplePage() {
  const { people, updatePeople } = useGridStore();
  const { page, pageSize, search } = people;
  
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError, isPlaceholderData, refetch } = usePeople(
    page,
    debouncedSearch,
    pageSize
  );

  const handlePageSizeChange = (size: number) => {
    updatePeople({ pageSize: size, page: 1 });
  };

  const handleSearch = (val: string) => {
    updatePeople({ search: val, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    updatePeople({ page: newPage });
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
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSearchChange={handleSearch}
        search={search}
        isLoading={isPlaceholderData}
      />
    </ListPageContainer>
  );
}
