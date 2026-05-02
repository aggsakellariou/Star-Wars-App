import { useQuery, useQueries, useQueryClient } from "@tanstack/react-query";
import { fetchPeople, fetchFilms, fetchPerson, fetchFilm, fetchResource } from "@/lib/api";
import type { SwapiResponse } from "@/lib/api";
import type { Person } from "@/components/people/PeopleColumns";
import type { Film } from "@/components/films/FilmColumns";

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

export function usePerson(id: string) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["person", id],
    queryFn: () => fetchPerson(id),
    initialData: () => {
      // Look through all pages of people in the cache
      const queries = queryClient.getQueriesData<SwapiResponse<Person>>({ queryKey: ["people"] });
      for (const [, data] of queries) {
        if (data?.results) {
          const person = data.results.find(p => p.url.endsWith(`/people/${id}/`));
          if (person) return person;
        }
      }
      return undefined;
    },
  });
}

export function useFilm(id: string) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["film", id],
    queryFn: () => fetchFilm(id),
    initialData: () => {
      const queries = queryClient.getQueriesData<SwapiResponse<Film>>({ queryKey: ["films"] });
      for (const [, data] of queries) {
        if (data?.results) {
          const film = data.results.find(f => f.url.endsWith(`/films/${id}/`));
          if (film) return film;
        }
      }
      return undefined;
    },
  });
}

export function useResources<T>(urls: string[] = []) {
  const results = useQueries({
    queries: urls.map(url => ({
      queryKey: ["resource", url],
      queryFn: () => fetchResource<T>(url),
      staleTime: Infinity,
    }))
  });

  return results
    .filter(r => r.data)
    .map(r => r.data as T);
}

export function useResource<T>(url: string | undefined) {
  return useQuery({
    queryKey: ["resource", url],
    queryFn: () => fetchResource<T>(url!),
    enabled: !!url,
    staleTime: Infinity,
  });
}

export function useCharacterDetail(id: string) {
  const personQuery = usePerson(id);
  const person = personQuery.data;

  const homeworld = useResource<{ name: string }>(person?.homeworld);
  const films = useResources<{ title: string }>(person?.films);
  const species = useResources<{ name: string }>(person?.species);
  const vehicles = useResources<{ name: string }>(person?.vehicles);
  const starships = useResources<{ name: string }>(person?.starships);

  const isLoading = personQuery.isLoading || 
                    (!!person?.homeworld && !homeworld.data) ||
                    ((person?.films?.length ?? 0) > 0 && films.length === 0) ||
                    ((person?.species?.length ?? 0) > 0 && species.length === 0);

  return {
    isLoading,
    isError: personQuery.isError,
    data: person ? {
      ...person,
      homeworldName: homeworld.data?.name,
      filmTitles: films.map(f => f.title),
      speciesNames: species.map(s => s.name),
      vehicleNames: vehicles.map(v => v.name),
      starshipNames: starships.map(s => s.name),
    } : undefined
  };
}

export function useFilmDetail(id: string) {
  const filmQuery = useFilm(id);
  const film = filmQuery.data;

  const characters = useResources<{ name: string }>(film?.characters);
  const planets = useResources<{ name: string }>(film?.planets);
  const starships = useResources<{ name: string }>(film?.starships);
  const vehicles = useResources<{ name: string }>(film?.vehicles);
  const species = useResources<{ name: string }>(film?.species);

  const isLoading = filmQuery.isLoading || 
                    ((film?.characters?.length ?? 0) > 0 && characters.length === 0);

  return {
    isLoading,
    isError: filmQuery.isError,
    data: film ? {
      ...film,
      characterNames: characters.map(c => c.name),
      planetNames: planets.map(p => p.name),
      starshipNames: starships.map(s => s.name),
      vehicleNames: vehicles.map(v => v.name),
      speciesNames: species.map(s => s.name),
    } : undefined
  };
}
