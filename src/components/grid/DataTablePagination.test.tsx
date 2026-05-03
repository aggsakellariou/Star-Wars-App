import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTablePagination } from './DataTablePagination';
import type { Table } from '@tanstack/react-table';

const mockTable = {
  getState: () => ({
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  }),
  getPageCount: () => 5,
  getCanPreviousPage: () => false,
  getCanNextPage: () => true,
  setPageIndex: vi.fn(),
  setPageSize: vi.fn(),
} as unknown as Table<unknown>;

describe('DataTablePagination', () => {
  it('renders correctly with initial state', () => {
    render(<DataTablePagination table={mockTable} />);
    
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('disables previous buttons on first page', () => {
    render(<DataTablePagination table={mockTable} />);
    
    const buttons = screen.getAllByRole('button');
    // ChevronsLeft, ChevronLeft are disabled
    expect(buttons[1]).toBeDisabled(); // ChevronsLeft
    expect(buttons[2]).toBeDisabled(); // ChevronLeft
    expect(buttons[3]).not.toBeDisabled(); // ChevronRight
    expect(buttons[4]).not.toBeDisabled(); // ChevronsRight
  });

  it('calls setPageIndex when navigation buttons are clicked', () => {
    render(<DataTablePagination table={mockTable} />);
    
    const nextButton = screen.getAllByRole('button')[3];
    fireEvent.click(nextButton);
    
    expect(mockTable.setPageIndex).toHaveBeenCalledWith(1);
  });
});
