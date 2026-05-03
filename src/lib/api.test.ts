import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { fetchPeople, fetchFilms, fetchPerson, fetchFilm } from './api';
import { useApiStore } from '@/hooks/use-api-store';

vi.mock('axios');
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useApiStore.getState().reset();
  });

  describe('fetchPeople', () => {
    it('fetches people from the primary API successfully', async () => {
      const mockData = {
        count: 1,
        next: null,
        previous: null,
        results: [{ name: 'Luke Skywalker' }],
      };
      vi.mocked(axios.get).mockResolvedValue({ data: mockData });

      const result = await fetchPeople(1);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('swapi.dev/api/people'), expect.any(Object));
      expect(result).toEqual(mockData);
    });

    it('falls back to backup API when primary fails', async () => {
      const mockData = {
        count: 1,
        next: null,
        previous: null,
        results: [{ name: 'Luke Skywalker' }],
      };
      
      // First call fails, second succeeds
      vi.mocked(axios.get)
        .mockRejectedValueOnce(new Error('Primary failed'))
        .mockResolvedValueOnce({ data: mockData });

      const result = await fetchPeople(1);

      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toHaveBeenNthCalledWith(1, expect.stringContaining('swapi.dev/api/people'), expect.any(Object));
      expect(axios.get).toHaveBeenNthCalledWith(2, expect.stringContaining('swapi-api.hbtn.io/api/people'), expect.any(Object));
      expect(result).toEqual(mockData);
      expect(useApiStore.getState().primaryApiLastFailure).toBeGreaterThan(0);
    });

    it('fetches multiple pages when pageSize is greater than 10', async () => {
      const mockPage1 = {
        count: 15,
        results: Array(10).fill({ name: 'Person' }),
      };
      const mockPage2 = {
        count: 15,
        results: Array(5).fill({ name: 'Person' }),
      };

      vi.mocked(axios.get)
        .mockResolvedValueOnce({ data: mockPage1 })
        .mockResolvedValueOnce({ data: mockPage2 });

      const result = await fetchPeople(1, '', 20);

      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(result.results.length).toBe(15);
      expect(result.count).toBe(15);
    });
  });

  describe('fetchPerson', () => {
    it('fetches a single person correctly', async () => {
      const mockPerson = { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' };
      vi.mocked(axios.get).mockResolvedValue({ data: mockPerson });

      const result = await fetchPerson('1');

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('swapi.dev/api/people/1/'), expect.any(Object));
      expect(result).toEqual(mockPerson);
    });
  });

  describe('fetchFilms', () => {
    it('fetches films correctly', async () => {
      const mockData = {
        count: 1,
        next: null,
        previous: null,
        results: [{ title: 'A New Hope' }],
      };
      vi.mocked(axios.get).mockResolvedValue({ data: mockData });

      const result = await fetchFilms(1);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('swapi.dev/api/films'), expect.any(Object));
      expect(result).toEqual(mockData);
    });
  });

  describe('fetchFilm', () => {
    it('fetches a single film correctly', async () => {
      const mockFilm = { title: 'A New Hope', url: 'https://swapi.dev/api/films/1/' };
      vi.mocked(axios.get).mockResolvedValue({ data: mockFilm });

      const result = await fetchFilm('1');

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('swapi.dev/api/films/1/'), expect.any(Object));
      expect(result).toEqual(mockFilm);
    });
  });

  describe('resilience and fallback', () => {
    it('skips primary API during cooldown period', async () => {
      const mockData = {
        count: 1,
        next: null,
        previous: null,
        results: [{ name: 'Luke' }],
      };
      
      // Set failure time to "just now"
      useApiStore.getState().setFailureTime(Date.now());
      
      vi.mocked(axios.get).mockResolvedValue({ data: mockData });

      await fetchPeople(1);

      // Should only call backup (hbtn.io) once, skipping primary (swapi.dev)
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('swapi-api.hbtn.io'), expect.any(Object));
    });

    it('throws error when both APIs fail', async () => {
      vi.mocked(axios.get).mockRejectedValue(new Error('Total failure'));

      await expect(fetchPeople(1)).rejects.toThrow('Total failure');
      expect(axios.get).toHaveBeenCalledTimes(2); // Primary + Backup
    });

    it('normalizes full SWAPI URLs to path', async () => {
      const mockData = {
        count: 1,
        next: null,
        previous: null,
        results: [{ name: 'Luke' }],
      };
      vi.mocked(axios.get).mockResolvedValue({ data: mockData });

      // Pass a full SWAPI URL
      await fetchPeople(1, '', 10); 
      
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/swapi\.dev\/api\/people/), 
        expect.any(Object)
      );
    });
  });
});
