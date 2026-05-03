import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FilmDetail } from './FilmDetail';

const mockFilmDetail = {
  title: 'A New Hope',
  episode_id: 4,
  opening_crawl: 'It is a period of civil war...',
  director: 'George Lucas',
  producer: 'Gary Kurtz, Rick McCallum',
  release_date: '1977-05-25',
  characters: ['url1', 'url2'],
  planets: ['url1'],
  starships: [],
  vehicles: [],
  species: [],
  created: '2014-12-10T14:23:31.880000Z',
  edited: '2014-12-20T19:49:45.256000Z',
  url: 'https://swapi.dev/api/films/1/',
  characterNames: ['Luke Skywalker', 'Darth Vader'],
  planetNames: ['Tatooine'],
  starshipNames: [],
  vehicleNames: [],
  speciesNames: [],
};

describe('FilmDetail', () => {
  it('renders film details correctly', () => {
    render(<FilmDetail film={mockFilmDetail} />);

    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('DIR. George Lucas')).toBeInTheDocument();
    expect(screen.getByText('PROD. Gary Kurtz, Rick McCallum')).toBeInTheDocument();
    expect(screen.getByText('It is a period of civil war...')).toBeInTheDocument();
    expect(screen.getAllByText('25/05/1977').length).toBeGreaterThan(0);
  });

  it('renders resource lists correctly', () => {
    render(<FilmDetail film={mockFilmDetail} />);

    expect(screen.getByText(/Cast \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    
    expect(screen.getByText(/Planets \(1\)/i)).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
  });
});
