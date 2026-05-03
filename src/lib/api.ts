import axios from "axios";
import { toast } from "sonner";
import type { Person } from "@/components/people/PeopleColumns";
import type { Film } from "@/components/films/FilmColumns";
import { useApiStore } from "@/hooks/use-api-store";

const BASE_URLS = [
  "https://swapi.dev/api",
  "https://swapi-api.hbtn.io/api"
];

// Simple health tracking for the primary API
const COOLDOWN_DURATION = 10 * 60 * 1000; // 10 minutes

export const resetApiCooldown = () => {
  useApiStore.getState().reset();
};

export interface SwapiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Normalizes a SWAPI URL or endpoint path into a relative path starting with /
 */
const getPath = (urlOrPath: string): string => {
  if (!urlOrPath.startsWith('http')) {
    return urlOrPath.startsWith('/') ? urlOrPath : `/${urlOrPath}`;
  }
  
  // Extract path from full URL (e.g., https://swapi.dev/api/people/1/ -> /people/1/)
  try {
    const url = new URL(urlOrPath);
    const path = url.pathname;
    // SWAPI URLs usually include /api/
    return path.replace(/^\/api/, '');
  } catch {
    return urlOrPath;
  }
};

/**
 * Generic request helper with automatic fallback and status persistence
 */
const request = async <T>(urlOrPath: string, params?: Record<string, unknown>): Promise<T> => {
  const path = getPath(urlOrPath);
  const now = Date.now();
  const { primaryApiLastFailure, hasShownBackupToast, setFailureTime, setShownBackupToast } = useApiStore.getState();
  const isPrimaryInCooldown = now - primaryApiLastFailure < COOLDOWN_DURATION;

  // 1. Try Primary API (unless in cooldown)
  if (!isPrimaryInCooldown) {
    try {
      const { data } = await axios.get(`${BASE_URLS[0]}${path}`, { params });
      if (hasShownBackupToast) setShownBackupToast(false);
      return data;
    } catch (error) {
      console.warn(`Primary API failed for ${path}:`, error);
      setFailureTime(Date.now());
      setShownBackupToast(false);
      
      toast.error("Primary server failed", {
        id: "api-fallback",
        description: "Attempting to fetch from backup server...",
        duration: 3000,
      });
    }
  }

  // 2. Try Backup API
  try {
    const { data } = await axios.get(`${BASE_URLS[1]}${path}`, { params });
    
    // Use latest state for toast calculation
    const currentFailureTime = useApiStore.getState().primaryApiLastFailure;
    
    if (!useApiStore.getState().hasShownBackupToast) {
      const retryTime = new Date(currentFailureTime + COOLDOWN_DURATION).toLocaleTimeString();
      toast.success("Backup fetch successful", {
        id: "api-backup-success",
        description: `Data loaded from mirror. We will try the main server again at ${retryTime}.`,
        duration: 5000,
      });
      setShownBackupToast(true);
    }

    return data;
  } catch (error) {
    console.warn(`Backup API failed for ${path}:`, error);
    
    toast.error("Backup server failed", {
      id: "api-backup-fail",
      description: "All available servers are currently unreachable.",
      duration: 4000,
    });
    
    throw error;
  }
};

/**
 * Internal helper to fetch multiple pages from SWAPI to satisfy a larger pageSize
 */
async function fetchMultiPage<T>(
  endpoint: string,
  page: number,
  search: string,
  pageSize: number
): Promise<SwapiResponse<T>> {
  const apiPagesToFetch = Math.ceil(pageSize / 10);
  const startApiPage = (page - 1) * apiPagesToFetch + 1;

  // 1. Fetch the first page to get the total count
  const firstResponse = await request<SwapiResponse<T>>(endpoint, { 
    page: startApiPage, 
    search 
  });

  const totalCount = firstResponse.count;
  const results = [...firstResponse.results];

  // 2. Calculate how many more pages we actually NEED based on the count
  // We already have 10 (or less) items from the first request.
  // We need to fetch pages until we either hit the pageSize OR the totalCount.
  const remainingToFetch = Math.min(pageSize, totalCount - (startApiPage - 1) * 10) - firstResponse.results.length;
  
  if (remainingToFetch <= 0) {
    return firstResponse;
  }

  const additionalPagesNeeded = Math.ceil(remainingToFetch / 10);
  const apiPagePromises = [];

  for (let i = 1; i <= additionalPagesNeeded; i++) {
    const nextApiPage = startApiPage + i;
    // Safety check: don't fetch if the page is beyond the total count
    if ((nextApiPage - 1) * 10 < totalCount) {
      apiPagePromises.push(
        request<SwapiResponse<T>>(endpoint, { page: nextApiPage, search })
      );
    }
  }

  if (apiPagePromises.length > 0) {
    const additionalResponses = await Promise.all(apiPagePromises);
    additionalResponses.forEach(r => results.push(...r.results));
  }

  return {
    count: totalCount,
    next: results.length < totalCount ? "has-more" : null, // Simplified next indicator
    previous: firstResponse.previous,
    results: results.slice(0, pageSize),
  };
}

export const fetchPeople = async (
  page = 1, 
  search = "", 
  pageSize = 10
): Promise<SwapiResponse<Person>> => {
  return fetchMultiPage<Person>("/people", page, search, pageSize);
};

export const fetchFilms = async (
  page = 1, 
  search = "", 
  pageSize = 10
): Promise<SwapiResponse<Film>> => {
  return fetchMultiPage<Film>("/films", page, search, pageSize);
};

export const fetchPerson = async (id: string): Promise<Person> => {
  return request<Person>(`/people/${id}/`);
};

export const fetchFilm = async (id: string): Promise<Film> => {
  return request<Film>(`/films/${id}/`);
};

export const fetchResource = async <T>(url: string): Promise<T> => {
  return request<T>(url);
};
