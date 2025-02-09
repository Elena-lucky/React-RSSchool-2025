import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/pagination/Pagination';
import { vi } from 'vitest';

describe('Pagination Component', () => {
  const onPageChangeMock = vi.fn();

  const renderPagination = (props: {
    currentPage: number;
    hasPrevious: boolean;
    hasNext: boolean;
  }) => {
    return render(
      <Pagination
        currentPage={props.currentPage}
        hasPrevious={props.hasPrevious}
        hasNext={props.hasNext}
        onPageChange={onPageChangeMock}
      />
    );
  };

  beforeEach(() => {
    onPageChangeMock.mockClear();
  });

  it('should render the current page number', () => {
    renderPagination({ currentPage: 3, hasPrevious: true, hasNext: true });
    expect(screen.getByText('Page 3')).toBeInTheDocument();
  });

  it('should disable the Previous button when hasPrevious is false', () => {
    renderPagination({ currentPage: 1, hasPrevious: false, hasNext: true });
    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('should disable the Next button when hasNext is false', () => {
    renderPagination({ currentPage: 5, hasPrevious: true, hasNext: false });

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('should enable the Previous button when hasPrevious is true', () => {
    renderPagination({ currentPage: 2, hasPrevious: true, hasNext: true });

    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeEnabled();
  });

  it('should enable the Next button when hasNext is true', () => {
    renderPagination({ currentPage: 2, hasPrevious: true, hasNext: true });

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeEnabled();
  });

  it('should call onPageChange with the correct page number when Previous is clicked', () => {
    renderPagination({ currentPage: 3, hasPrevious: true, hasNext: true });

    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange with the correct page number when Next is clicked', () => {
    renderPagination({ currentPage: 3, hasPrevious: true, hasNext: true });

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });
});
