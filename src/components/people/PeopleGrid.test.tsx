import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PeopleGrid } from './PeopleGrid';
import { BrowserRouter } from 'react-router-dom';
import type { Person } from './PeopleColumns';

const mockPeople: Person[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '',
    edited: '',
    url: 'https://swapi.dev/api/people/1/',
  },
  {
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
    birth_year: '41.9BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '',
    edited: '',
    url: 'https://swapi.dev/api/people/4/',
  }
];

describe('PeopleGrid', () => {
  it('renders a list of characters', () => {
    render(
      <BrowserRouter>
        <PeopleGrid 
          data={mockPeople} 
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

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    render(
      <BrowserRouter>
        <PeopleGrid 
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

    expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
  });

  it('sets lower opacity when loading', () => {
    const { container } = render(
      <BrowserRouter>
        <PeopleGrid 
          data={mockPeople} 
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
