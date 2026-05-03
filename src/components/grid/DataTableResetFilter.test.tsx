import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTableResetFilter } from './DataTableResetFilter';

describe('DataTableResetFilter', () => {
  it('renders nothing when not filtered', () => {
    const { container } = render(
      <DataTableResetFilter isFiltered={false} onReset={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders reset button when filtered', () => {
    render(<DataTableResetFilter isFiltered={true} onReset={vi.fn()} />);
    expect(screen.getByText(/reset/i)).toBeInTheDocument();
  });

  it('calls onReset when clicked', () => {
    const onReset = vi.fn();
    render(<DataTableResetFilter isFiltered={true} onReset={onReset} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
