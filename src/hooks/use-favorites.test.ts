import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites, type FavoriteItem } from './use-favorites';

describe('useFavorites', () => {
  beforeEach(() => {
    act(() => {
      // Clear favorites before each test
      useFavorites.setState({ favorites: [] });
    });
  });

  const mockItem: FavoriteItem = {
    id: '1',
    type: 'character',
    name: 'Luke Skywalker',
    subtitle: '172cm, 77kg',
    url: 'https://swapi.dev/api/people/1/',
  };

  it('initializes with an empty favorites list', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('adds an item to favorites', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(mockItem);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0]).toEqual(mockItem);
    expect(result.current.isFavorite('1', 'character')).toBe(true);
  });

  it('removes an item from favorites if it already exists (toggle)', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(mockItem);
    });
    expect(result.current.favorites).toHaveLength(1);

    act(() => {
      result.current.toggleFavorite(mockItem);
    });
    expect(result.current.favorites).toHaveLength(0);
    expect(result.current.isFavorite('1', 'character')).toBe(false);
  });

  it('removes an item by id', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(mockItem);
    });
    expect(result.current.favorites).toHaveLength(1);

    act(() => {
      result.current.removeFavorite('1');
    });
    expect(result.current.favorites).toHaveLength(0);
  });
});
