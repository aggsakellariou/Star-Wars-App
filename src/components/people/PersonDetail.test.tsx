import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PersonDetail } from './PersonDetail';

const mockPersonDetail = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.dev/api/planets/1/',
  films: ['https://swapi.dev/api/films/1/'],
  species: [],
  vehicles: [],
  starships: [],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
  homeworldName: 'Tatooine',
  filmTitles: ['A New Hope'],
  speciesNames: [],
  vehicleNames: [],
  starshipNames: [],
};

describe('PersonDetail', () => {
  it('renders person details correctly', () => {
    render(<PersonDetail person={mockPersonDetail} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
    expect(screen.getByText('77')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('19')).toBeInTheDocument();
    expect(screen.getByText('BBY')).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
  });

  it('renders resource lists correctly', () => {
    render(<PersonDetail person={mockPersonDetail} />);

    expect(screen.getByText(/Films \(1\)/i)).toBeInTheDocument();
    expect(screen.getByText('A New Hope')).toBeInTheDocument();
  });

  it('renders NONE for empty resource lists', () => {
    render(<PersonDetail person={mockPersonDetail} />);

    expect(screen.getByText(/Species \(0\)/i)).toBeInTheDocument();
    expect(screen.getAllByText('NONE').length).toBeGreaterThan(0);
  });
});
