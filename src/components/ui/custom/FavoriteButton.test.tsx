import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteButton } from './FavoriteButton';
import { useFavorites, type FavoriteItem } from '@/hooks/use-favorites';
import { toast } from 'sonner';

// Mock hooks and libraries
vi.mock('@/hooks/use-favorites', () => ({
  useFavorites: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
  },
}));

describe('FavoriteButton', () => {
  const mockItem: FavoriteItem = {
    id: '1',
    type: 'character',
    name: 'Luke Skywalker',
    subtitle: '19BBY',
    url: 'https://swapi.dev/api/people/1/',
  };

  it('renders correctly when not favorited', () => {
    vi.mocked(useFavorites).mockReturnValue({
      isFavorite: vi.fn().mockReturnValue(false),
      toggleFavorite: vi.fn(),
      favorites: [],
    } as ReturnType<typeof useFavorites>);

    render(<FavoriteButton item={mockItem} />);
    
    const button = screen.getByRole('button');
    // Should have secondary bg (black) based on the code logic
    expect(button).toHaveClass('bg-secondary');
    expect(screen.getByText(/add to favorites/i)).toBeInTheDocument();
  });

  it('renders correctly when favorited', () => {
    vi.mocked(useFavorites).mockReturnValue({
      isFavorite: vi.fn().mockReturnValue(true),
      toggleFavorite: vi.fn(),
      favorites: [],
    } as ReturnType<typeof useFavorites>);

    render(<FavoriteButton item={mockItem} />);
    
    const button = screen.getByRole('button');
    // Should have primary bg (yellow) based on the code logic
    expect(button).toHaveClass('bg-primary');
    expect(screen.getByText(/favorited/i)).toBeInTheDocument();
    
    // Check for filled heart (represented by fill-current class)
    const heart = button.querySelector('svg');
    expect(heart).toHaveClass('fill-current');
  });

  it('toggles favorite and shows success toast when adding', () => {
    const toggleFavorite = vi.fn();
    vi.mocked(useFavorites).mockReturnValue({
      isFavorite: vi.fn().mockReturnValue(false),
      toggleFavorite,
      favorites: [],
    } as ReturnType<typeof useFavorites>);

    render(<FavoriteButton item={mockItem} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(toggleFavorite).toHaveBeenCalledWith(mockItem);
    expect(toast.success).toHaveBeenCalledWith('Added Luke Skywalker to favorites');
  });

  it('toggles favorite and shows info toast when removing', () => {
    const toggleFavorite = vi.fn();
    vi.mocked(useFavorites).mockReturnValue({
      isFavorite: vi.fn().mockReturnValue(true),
      toggleFavorite,
      favorites: [],
    } as ReturnType<typeof useFavorites>);

    render(<FavoriteButton item={mockItem} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(toggleFavorite).toHaveBeenCalledWith(mockItem);
    expect(toast.info).toHaveBeenCalledWith('Removed Luke Skywalker from favorites');
  });
});
