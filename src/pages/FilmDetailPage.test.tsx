import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FilmDetailPage from './FilmDetailPage';
import { useFilmDetail } from '@/hooks/use-swapi';
import { BrowserRouter } from 'react-router-dom';
import type { Film } from '@/components/films/FilmColumns';
import { useFavorites } from '@/hooks/use-favorites';

// Mock hooks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
  };
});

vi.mock('@/hooks/use-swapi', () => ({
  useFilmDetail: vi.fn(),
}));

vi.mock('@/hooks/use-favorites', () => ({
  useFavorites: vi.fn(),
}));

vi.mock('@/components/films/FilmDetail', () => ({
  FilmDetail: ({ film }: { film: Film }) => <div data-testid="film-detail">{film.title}</div>
}));

vi.mock('@/components/ui/custom/Skeletons', () => ({
  DetailSkeleton: () => <div data-testid="skeleton">Loading...</div>
}));

vi.mock('@/components/ui/custom/ErrorStates', () => ({
  DetailErrorState: () => <div data-testid="error">Error!</div>
}));

describe('FilmDetailPage', () => {
  it('renders skeleton while loading', () => {
    vi.mocked(useFilmDetail).mockReturnValue({
      data: undefined as ReturnType<typeof useFilmDetail>['data'],
      isLoading: true,
      isError: false,
    } as unknown as ReturnType<typeof useFilmDetail>);

    render(
      <BrowserRouter>
        <FilmDetailPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('renders error state on failure', () => {
    vi.mocked(useFilmDetail).mockReturnValue({
      data: undefined as ReturnType<typeof useFilmDetail>['data'],
      isLoading: false,
      isError: true,
    } as unknown as ReturnType<typeof useFilmDetail>);

    render(
      <BrowserRouter>
        <FilmDetailPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('renders film details and back button on success', () => {
    const mockData = {
      title: 'A New Hope',
      release_date: '1977-05-25',
      url: 'https://swapi.dev/api/films/1/',
    };

    vi.mocked(useFilmDetail).mockReturnValue({
      data: mockData as ReturnType<typeof useFilmDetail>['data'],
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useFilmDetail>);

    vi.mocked(useFavorites).mockReturnValue({
      isFavorite: vi.fn().mockReturnValue(false),
      toggleFavorite: vi.fn(),
      favorites: [],
    } as ReturnType<typeof useFavorites>);

    render(
      <BrowserRouter>
        <FilmDetailPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('film-detail')).toHaveTextContent('A New Hope');
    expect(screen.getByText(/back to films/i)).toBeInTheDocument();
    expect(screen.getByText(/add to favorites/i)).toBeInTheDocument();
  });
});
