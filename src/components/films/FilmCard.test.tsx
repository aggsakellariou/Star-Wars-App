import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FilmCard } from './FilmCard';
import { BrowserRouter } from 'react-router-dom';
import type { Film } from './FilmColumns';

const mockFilm: Film = {
  title: 'A New Hope',
  episode_id: 4,
  opening_crawl: 'It is a period of civil war...',
  director: 'George Lucas',
  producer: 'Gary Kurtz, Rick McCallum',
  release_date: '1977-05-25',
  characters: [],
  planets: [],
  starships: [],
  vehicles: [],
  species: [],
  created: '2014-12-10T14:23:31.880000Z',
  edited: '2014-12-20T19:49:45.256000Z',
  url: 'https://swapi.dev/api/films/1/',
};

describe('FilmCard', () => {
  it('renders film details correctly', () => {
    render(
      <BrowserRouter>
        <FilmCard film={mockFilm} />
      </BrowserRouter>
    );

    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('DIR. George Lucas')).toBeInTheDocument();
    expect(screen.getByText('25/05/1977')).toBeInTheDocument();
  });

  it('links to the correct detail page', () => {
    render(
      <BrowserRouter>
        <FilmCard film={mockFilm} />
      </BrowserRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/films/1');
  });
});
