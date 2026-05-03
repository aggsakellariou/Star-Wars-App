import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ListPageContainer } from './ListPageContainer';

// Mock the sub-components to make testing easier
vi.mock('@/components/ui/custom/Skeletons', () => ({
  GridSkeleton: () => <div data-testid="skeleton">Loading...</div>
}));

vi.mock('@/components/ui/custom/ErrorStates', () => ({
  GridErrorState: ({ refetch }: { refetch: () => void }) => (
    <div data-testid="error">
      Error! <button onClick={refetch}>Retry</button>
    </div>
  )
}));

describe('ListPageContainer', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description',
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
  };

  it('renders title and description', () => {
    render(
      <ListPageContainer {...defaultProps}>
        <div>Main Content</div>
      </ListPageContainer>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });

  it('renders skeleton when loading', () => {
    render(
      <ListPageContainer {...defaultProps} isLoading={true}>
        <div>Main Content</div>
      </ListPageContainer>
    );

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.queryByText('Main Content')).not.toBeInTheDocument();
  });

  it('renders error state when there is an error', () => {
    render(
      <ListPageContainer {...defaultProps} isError={true}>
        <div>Main Content</div>
      </ListPageContainer>
    );

    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.queryByText('Main Content')).not.toBeInTheDocument();
  });

  it('calls refetch when retry button in error state is clicked', () => {
    const refetch = vi.fn();
    render(
      <ListPageContainer {...defaultProps} isError={true} refetch={refetch}>
        <div>Main Content</div>
      </ListPageContainer>
    );

    const retryButton = screen.getByText('Retry');
    retryButton.click();
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
