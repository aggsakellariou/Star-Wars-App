import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FilmGrid } from './FilmGrid';
import { BrowserRouter } from 'react-router-dom';
import type { Film } from './FilmColumns';

const mockFilms: Film[] = [
  {
    title: 'A New Hope',
    episode_id: 4,
    opening_crawl: '',
    director: 'George Lucas',
    producer: '',
    release_date: '1977-05-25',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: '',
    edited: '',
    url: 'https://swapi.dev/api/films/1/',
  },
  {
    title: 'The Empire Strikes Back',
    episode_id: 5,
    opening_crawl: '',
    director: 'Irvin Kershner',
    producer: '',
    release_date: '1980-05-17',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: '',
    edited: '',
    url: 'https://swapi.dev/api/films/2/',
  }
];

describe('FilmGrid', () => {
  it('renders a list of films', () => {
    render(
      <BrowserRouter>
        <FilmGrid
          data={mockFilms}
          rowCount={2}
          page={1}
          pageSize={10}
          onPageChange={vi.fn()}
          onPageSizeChange={vi.fn()}
          onSearchChange={vi.fn()}
          search=""
          isLoading={false}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    render(
      <BrowserRouter>
        <FilmGrid
          data={[]}
          rowCount={0}
          page={1}
          pageSize={10}
          onPageChange={vi.fn()}
          onPageSizeChange={vi.fn()}
          onSearchChange={vi.fn()}
          search=""
          isLoading={false}
        />
      </BrowserRouter>
    );

    expect(screen.getByText(/no films found/i)).toBeInTheDocument();
  });

  it('sets lower opacity when loading', () => {
    const { container } = render(
      <BrowserRouter>
        <FilmGrid
          data={mockFilms}
          rowCount={2}
          page={1}
          pageSize={10}
          onPageChange={vi.fn()}
          onPageSizeChange={vi.fn()}
          onSearchChange={vi.fn()}
          search=""
          isLoading={true}
        />
      </BrowserRouter>
    );

    expect(container.firstChild).toHaveClass('opacity-50');
  });
});
