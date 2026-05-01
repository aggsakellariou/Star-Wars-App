import { useQuery } from "@tanstack/react-query";
import { fetchPeople, fetchFilms } from "@/lib/api";

export function usePeople(page = 1, search = "", pageSize = 10) {
  return useQuery({
    queryKey: ["people", page, search, pageSize],
    queryFn: () => fetchPeople(page, search, pageSize),
    placeholderData: (previousData) => previousData,
  });
}

export function useFilms(page = 1, search = "", pageSize = 10) {
  return useQuery({
    queryKey: ["films", page, search, pageSize],
    queryFn: () => fetchFilms(page, search, pageSize),
    placeholderData: (previousData) => previousData,
  });
}
