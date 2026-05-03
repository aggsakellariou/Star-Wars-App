import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FavoritesPage from './FavoritesPage';
import { useFavorites } from '@/hooks/use-favorites';
import { BrowserRouter } from 'react-router-dom';

vi.mock('@/hooks/use-favorites');
vi.mock('sonner', () => ({
  toast: {
    info: vi.fn(),
  },
}));

describe('FavoritesPage', () => {
  const mockFavorites = [
    { id: '1', type: 'character', name: 'Luke Skywalker', subtitle: 'Test', url: '' },
    { id: '2', type: 'film', name: 'A New Hope', subtitle: 'Test', url: '' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders empty state when no favorites', () => {
    vi.mocked(useFavorites).mockReturnValue({
      favorites: [],
      toggleFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      isFavorite: vi.fn(),
    });

    render(
      <BrowserRouter>
        <FavoritesPage />
      </BrowserRouter>
    );

    expect(screen.getByText('NO LEGENDS SAVED')).toBeInTheDocument();
  });

  it('renders favorites list', () => {
    vi.mocked(useFavorites).mockReturnValue({
      favorites: mockFavorites,
      toggleFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      isFavorite: vi.fn(),
    });

    render(
      <BrowserRouter>
        <FavoritesPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('A New Hope')).toBeInTheDocument();
  });

  it('filters favorites by type', () => {
    vi.mocked(useFavorites).mockReturnValue({
      favorites: mockFavorites,
      toggleFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      isFavorite: vi.fn(),
    });

    render(
      <BrowserRouter>
        <FavoritesPage />
      </BrowserRouter>
    );

    const charactersFilter = screen.getByRole('button', { name: /characters/i });
    fireEvent.click(charactersFilter);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.queryByText('A New Hope')).not.toBeInTheDocument();
  });

  it('calls toggleFavorite when remove button is clicked', () => {
    const toggleFavorite = vi.fn();
    vi.mocked(useFavorites).mockReturnValue({
      favorites: mockFavorites,
      toggleFavorite,
      removeFavorite: vi.fn(),
      isFavorite: vi.fn(),
    });

    render(
      <BrowserRouter>
        <FavoritesPage />
      </BrowserRouter>
    );

    const removeButtons = screen.getAllByTitle('Remove from favorites');
    fireEvent.click(removeButtons[0]);

    expect(toggleFavorite).toHaveBeenCalledWith(mockFavorites[0]);
  });
});
