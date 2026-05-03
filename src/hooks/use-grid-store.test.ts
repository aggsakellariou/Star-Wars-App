import { describe, it, expect, beforeEach } from 'vitest';
import { useGridStore } from './use-grid-store';

describe('useGridStore', () => {
  beforeEach(() => {
    useGridStore.getState().resetPeople();
    useGridStore.getState().resetFilms();
  });

  it('initializes with default settings', () => {
    const state = useGridStore.getState();
    expect(state.people).toEqual({
      page: 1,
      pageSize: 10,
      search: '',
    });
    expect(state.films).toEqual({
      page: 1,
      pageSize: 10,
      search: '',
    });
  });

  it('updates people settings correctly', () => {
    useGridStore.getState().updatePeople({ page: 2, search: 'Luke' });
    
    const state = useGridStore.getState();
    expect(state.people.page).toBe(2);
    expect(state.people.search).toBe('Luke');
    expect(state.people.pageSize).toBe(10); // remains default
  });

  it('updates films settings correctly', () => {
    useGridStore.getState().updateFilms({ pageSize: 20 });
    
    const state = useGridStore.getState();
    expect(state.films.pageSize).toBe(20);
    expect(state.films.page).toBe(1); // remains default
  });

  it('resets people settings', () => {
    useGridStore.getState().updatePeople({ page: 5, search: 'Vader' });
    useGridStore.getState().resetPeople();
    
    const state = useGridStore.getState();
    expect(state.people).toEqual({
      page: 1,
      pageSize: 10,
      search: '',
    });
  });

  it('resets films settings', () => {
    useGridStore.getState().updateFilms({ page: 3 });
    useGridStore.getState().resetFilms();
    
    const state = useGridStore.getState();
    expect(state.films).toEqual({
      page: 1,
      pageSize: 10,
      search: '',
    });
  });
});
