import axios from "axios";
import { toast } from "sonner";
import type { Person } from "@/components/people/PeopleColumns";
import type { Film } from "@/components/films/FilmColumns";

const BASE_URLS = [
  "https://swapi.dev/api",
  "https://swapi-api.hbtn.io/api"
];

// Simple health tracking for the primary API
const COOLDOWN_DURATION = 60 * 1000; // 1 minute
let primaryApiLastFailure = 0;

export const resetApiCooldown = () => {
  primaryApiLastFailure = 0;
};

export interface SwapiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

const fetchWithFallback = async <T>(
  endpoint: string,
  params: Record<string, unknown>
): Promise<SwapiResponse<T>> => {
  const now = Date.now();
  const isPrimaryInCooldown = now - primaryApiLastFailure < COOLDOWN_DURATION;

  // 1. Try Primary API (unless in cooldown)
  if (!isPrimaryInCooldown) {
    try {
      const { data } = await axios.get(`${BASE_URLS[0]}${endpoint}`, { params });
      return data;
    } catch (error) {
      console.warn(`Failed to fetch from Primary (${BASE_URLS[0]}):`, error);
      primaryApiLastFailure = Date.now();
      
      toast.error("Primary server failed", {
        id: "api-fallback",
        description: "Attempting to fetch from backup server...",
        duration: 3000,
      });
    }
  }

  // 2. Try Backup API
  try {
    const { data } = await axios.get(`${BASE_URLS[1]}${endpoint}`, { params });
    
    toast.success("Backup fetch successful", {
      id: "api-backup-success",
      description: "Data loaded from mirror. We will try the main server again in 1 minute.",
      duration: 5000,
    });

    return data;
  } catch (error) {
    console.warn(`Failed to fetch from Backup (${BASE_URLS[1]}):`, error);
    
    toast.error("Backup server failed", {
      id: "api-backup-fail",
      description: "All available servers are currently unreachable.",
      duration: 4000,
    });
    
    throw error;
  }
};

export const fetchPeople = async (
  page = 1, 
  search = "", 
  pageSize = 10
): Promise<SwapiResponse<Person>> => {
  const apiPagesToFetch = Math.ceil(pageSize / 10);
  const startApiPage = (page - 1) * apiPagesToFetch + 1;
  
  const apiPagePromises = [];
  for (let i = 0; i < apiPagesToFetch; i++) {
    apiPagePromises.push(
      fetchWithFallback<Person>("/people", { page: startApiPage + i, search })
    );
  }

  const responses = await Promise.all(apiPagePromises);
  
  return {
    count: responses[0].count,
    next: responses[responses.length - 1].next,
    previous: responses[0].previous,
    results: responses.flatMap(r => r.results),
  };
};

export const fetchFilms = async (
  page = 1, 
  search = "", 
  pageSize = 10
): Promise<SwapiResponse<Film>> => {
  const apiPagesToFetch = Math.ceil(pageSize / 10);
  const startApiPage = (page - 1) * apiPagesToFetch + 1;
  
  const apiPagePromises = [];
  for (let i = 0; i < apiPagesToFetch; i++) {
    apiPagePromises.push(
      fetchWithFallback<Film>("/films", { page: startApiPage + i, search })
    );
  }

  const responses = await Promise.all(apiPagePromises);
  
  return {
    count: responses[0].count,
    next: responses[responses.length - 1].next,
    previous: responses[0].previous,
    results: responses.flatMap(r => r.results),
  };
};
