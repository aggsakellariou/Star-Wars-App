import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PersonCard } from './PersonCard';
import { BrowserRouter } from 'react-router-dom';
import type { Person } from './PeopleColumns';

const mockPerson: Person = {
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
};

describe('PersonCard', () => {
  it('renders person details correctly', () => {
    render(
      <BrowserRouter>
        <PersonCard person={mockPerson} />
      </BrowserRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('19 BBY')).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
    expect(screen.getByText('77')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // Film count
  });

  it('handles unknown birth year', () => {
    const unknownPerson = { ...mockPerson, birth_year: 'unknown' };
    render(
      <BrowserRouter>
        <PersonCard person={unknownPerson} />
      </BrowserRouter>
    );
    expect(screen.getByText('?? BBY')).toBeInTheDocument();
  });

  it('links to the correct detail page', () => {
    render(
      <BrowserRouter>
        <PersonCard person={mockPerson} />
      </BrowserRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/characters/1');
  });
});
