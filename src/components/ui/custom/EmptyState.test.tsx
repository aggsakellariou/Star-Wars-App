import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';
import { Search } from 'lucide-react';

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(<EmptyState title="No results" description="Try again later" />);
    expect(screen.getByText('No results')).toBeInTheDocument();
    expect(screen.getByText('Try again later')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<EmptyState title="Test" icon={<Search data-testid="search-icon" />} />);
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(
      <EmptyState 
        title="Test" 
        action={<button>Retry</button>} 
      />
    );
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });
});
