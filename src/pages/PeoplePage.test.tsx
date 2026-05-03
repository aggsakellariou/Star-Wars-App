import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PeoplePage from './PeoplePage';
import { usePeople } from '@/hooks/use-swapi';
import { useGridStore } from '@/hooks/use-grid-store';
import { BrowserRouter } from 'react-router-dom';

vi.mock('@/hooks/use-swapi');
vi.mock('@/hooks/use-grid-store');
vi.mock('use-debounce', () => ({
  useDebounce: (val: string) => [val],
}));

describe('PeoplePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useGridStore).mockReturnValue({
      people: { page: 1, pageSize: 10, search: '' },
      updatePeople: vi.fn(),
    } as unknown as ReturnType<typeof useGridStore>);
  });

  it('renders loading state', () => {
    vi.mocked(usePeople).mockReturnValue({
      isLoading: true,
      data: undefined,
    } as unknown as ReturnType<typeof usePeople>);

    render(
      <BrowserRouter>
        <PeoplePage />
      </BrowserRouter>
    );

    // ListPageContainer handles the loading state (e.g., with skeletons)
    // We just check if the title is there for now
    expect(screen.getByText('Characters')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(usePeople).mockReturnValue({
      isLoading: false,
      isError: true,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof usePeople>);

    render(
      <BrowserRouter>
        <PeoplePage />
      </BrowserRouter>
    );

    expect(screen.getByText(/connection failed/i)).toBeInTheDocument();
  });

  it('renders people data', () => {
    vi.mocked(usePeople).mockReturnValue({
      isLoading: false,
      data: {
        count: 1,
        results: [
          {
            name: 'Luke Skywalker',
            url: 'https://swapi.dev/api/people/1/',
            height: '172',
            mass: '77',
            gender: 'male',
            birth_year: '19BBY',
            films: [],
          },
        ],
      },
    } as unknown as ReturnType<typeof usePeople>);

    render(
      <BrowserRouter>
        <PeoplePage />
      </BrowserRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('renders "No results found" when search has no matches', () => {
    vi.mocked(useGridStore).mockReturnValue({
      people: { page: 1, pageSize: 10, search: 'NonExistent' },
      updatePeople: vi.fn(),
    } as unknown as ReturnType<typeof useGridStore>);

    vi.mocked(usePeople).mockReturnValue({
      isLoading: false,
      data: {
        count: 0,
        results: [],
      },
    } as unknown as ReturnType<typeof usePeople>);

    render(
      <BrowserRouter>
        <PeoplePage />
      </BrowserRouter>
    );

    expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
  });

  it('calls updatePeople with empty string when reset button is clicked', () => {
    const updatePeople = vi.fn();
    vi.mocked(useGridStore).mockReturnValue({
      people: { page: 1, pageSize: 10, search: 'Luke' },
      updatePeople,
    } as unknown as ReturnType<typeof useGridStore>);

    vi.mocked(usePeople).mockReturnValue({
      isLoading: false,
      data: { count: 1, results: [] },
    } as unknown as ReturnType<typeof usePeople>);

    render(
      <BrowserRouter>
        <PeoplePage />
      </BrowserRouter>
    );

    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    expect(updatePeople).toHaveBeenCalledWith({ search: '', page: 1 });
  });
});
