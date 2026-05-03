import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { 
  usePeople, 
  useFilms, 
  usePerson, 
  useFilm, 
  useResource, 
  useResources,
  useCharacterDetail,
  useFilmDetail
} from './use-swapi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as api from '@/lib/api';
import type { Person } from '@/components/people/PeopleColumns';
import type { Film } from '@/components/films/FilmColumns';
import React from 'react';

vi.mock('@/lib/api', () => ({
  fetchPeople: vi.fn(),
  fetchFilms: vi.fn(),
  fetchPerson: vi.fn(),
  fetchFilm: vi.fn(),
  fetchResource: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('use-swapi hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('usePeople', () => {
    it('calls fetchPeople and returns data', async () => {
      const mockData = { 
        count: 1, 
        results: [{ name: 'Luke', url: 'https://swapi.dev/api/people/1/' } as Person],
        next: null,
        previous: null
      };
      vi.mocked(api.fetchPeople).mockResolvedValue(mockData as api.SwapiResponse<Person>);

      const { result } = renderHook(() => usePeople(1, 'Luke'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(api.fetchPeople).toHaveBeenCalledWith(1, 'Luke', 10);
      expect(result.current.data).toEqual(mockData);
    });
  });

  describe('useFilms', () => {
    it('calls fetchFilms and returns data', async () => {
      const mockData = { 
        count: 1, 
        results: [{ title: 'A New Hope', url: 'https://swapi.dev/api/films/1/' } as Film],
        next: null,
        previous: null
      };
      vi.mocked(api.fetchFilms).mockResolvedValue(mockData as api.SwapiResponse<Film>);

      const { result } = renderHook(() => useFilms(1, 'Hope'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(api.fetchFilms).toHaveBeenCalledWith(1, 'Hope', 10);
      expect(result.current.data).toEqual(mockData);
    });
  });

  describe('usePerson', () => {
    it('calls fetchPerson and returns data', async () => {
      const mockPerson = { name: 'Luke', url: 'https://swapi.dev/api/people/1/' } as Person;
      vi.mocked(api.fetchPerson).mockResolvedValue(mockPerson);

      const { result } = renderHook(() => usePerson('1'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(api.fetchPerson).toHaveBeenCalledWith('1');
      expect(result.current.data).toEqual(mockPerson);
    });
  });

  describe('useFilm', () => {
    it('calls fetchFilm and returns data', async () => {
      const mockFilm = { title: 'A New Hope', url: 'https://swapi.dev/api/films/1/' } as Film;
      vi.mocked(api.fetchFilm).mockResolvedValue(mockFilm);

      const { result } = renderHook(() => useFilm('1'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(api.fetchFilm).toHaveBeenCalledWith('1');
      expect(result.current.data).toEqual(mockFilm);
    });
  });

  describe('useResource', () => {
    it('calls fetchResource when url is provided', async () => {
      const mockData = { name: 'Tatooine' };
      vi.mocked(api.fetchResource).mockResolvedValue(mockData);

      const { result } = renderHook(() => useResource('https://swapi.dev/api/planets/1/'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(api.fetchResource).toHaveBeenCalledWith('https://swapi.dev/api/planets/1/');
      expect(result.current.data).toEqual(mockData);
    });

    it('does not call fetchResource when url is undefined', () => {
      renderHook(() => useResource(undefined), {
        wrapper: createWrapper(),
      });

      expect(api.fetchResource).not.toHaveBeenCalled();
    });
  });

  describe('useResources', () => {
    it('calls fetchResource for multiple URLs', async () => {
      vi.mocked(api.fetchResource)
        .mockResolvedValueOnce({ title: 'Film 1' })
        .mockResolvedValueOnce({ title: 'Film 2' });

      const urls = ['url1', 'url2'];
      const { result } = renderHook(() => useResources<{title: string}>(urls), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.length).toBe(2));
      expect(api.fetchResource).toHaveBeenCalledTimes(2);
      expect(result.current).toEqual([{ title: 'Film 1' }, { title: 'Film 2' }]);
    });
  });

  describe('useCharacterDetail', () => {
    it('aggregates character data correctly', async () => {
      const mockPerson = { 
        name: 'Luke', 
        homeworld: 'h-url', 
        films: ['f1'], 
        species: [], 
        vehicles: [], 
        starships: [],
        url: 'p1' 
      } as unknown as Person;
      
      vi.mocked(api.fetchPerson).mockResolvedValue(mockPerson);
      vi.mocked(api.fetchResource).mockImplementation(async (url) => {
        if (url === 'h-url') return { name: 'Tatooine' };
        if (url === 'f1') return { title: 'A New Hope' };
        return {};
      });

      const { result } = renderHook(() => useCharacterDetail('1'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.data).toMatchObject({
        name: 'Luke',
        homeworldName: 'Tatooine',
        filmTitles: ['A New Hope'],
      });
    });
  });

  describe('useFilmDetail', () => {
    it('aggregates film data correctly', async () => {
      const mockFilm = { 
        title: 'A New Hope', 
        characters: ['c1'], 
        planets: [], 
        starships: [], 
        vehicles: [], 
        species: [] 
      } as unknown as Film;
      
      vi.mocked(api.fetchFilm).mockResolvedValue(mockFilm);
      vi.mocked(api.fetchResource).mockResolvedValue({ name: 'Luke Skywalker' });

      const { result } = renderHook(() => useFilmDetail('1'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.data).toMatchObject({
        title: 'A New Hope',
        characterNames: ['Luke Skywalker'],
      });
    });
  });
});
