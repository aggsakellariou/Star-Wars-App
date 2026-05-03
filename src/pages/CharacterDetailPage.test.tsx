import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterDetailPage from './CharacterDetailPage';
import { useCharacterDetail } from '@/hooks/use-swapi';
import { BrowserRouter } from 'react-router-dom';
import type { Person } from '@/components/people/PeopleColumns';
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
  useCharacterDetail: vi.fn(),
}));

vi.mock('@/hooks/use-favorites', () => ({
  useFavorites: vi.fn(),
}));

vi.mock('@/components/people/PersonDetail', () => ({
  PersonDetail: ({ person }: { person: Person }) => <div data-testid="person-detail">{person.name}</div>
}));

vi.mock('@/components/ui/custom/Skeletons', () => ({
  DetailSkeleton: () => <div data-testid="skeleton">Loading...</div>
}));

vi.mock('@/components/ui/custom/ErrorStates', () => ({
  DetailErrorState: () => <div data-testid="error">Error!</div>
}));

describe('CharacterDetailPage', () => {
  it('renders skeleton while loading', () => {
    vi.mocked(useCharacterDetail).mockReturnValue({
      data: undefined as ReturnType<typeof useCharacterDetail>['data'],
      isLoading: true,
      isError: false,
    } as unknown as ReturnType<typeof useCharacterDetail>);

    render(
      <BrowserRouter>
        <CharacterDetailPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('renders error state on failure', () => {
    vi.mocked(useCharacterDetail).mockReturnValue({
      data: undefined as ReturnType<typeof useCharacterDetail>['data'],
      isLoading: false,
      isError: true,
    } as unknown as ReturnType<typeof useCharacterDetail>);

    render(
      <BrowserRouter>
        <CharacterDetailPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('renders character details and back button on success', () => {
    const mockData = {
      name: 'Luke Skywalker',
      url: 'https://swapi.dev/api/people/1/',
      speciesNames: ['Human'],
    };

    vi.mocked(useCharacterDetail).mockReturnValue({
      data: mockData as ReturnType<typeof useCharacterDetail>['data'],
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useCharacterDetail>);

    vi.mocked(useFavorites).mockReturnValue({
      isFavorite: vi.fn().mockReturnValue(false),
      toggleFavorite: vi.fn(),
      favorites: [],
    } as ReturnType<typeof useFavorites>);

    render(
      <BrowserRouter>
        <CharacterDetailPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('person-detail')).toHaveTextContent('Luke Skywalker');
    expect(screen.getByText(/back to characters/i)).toBeInTheDocument();
    expect(screen.getByText(/add to favorites/i)).toBeInTheDocument();
  });
});
