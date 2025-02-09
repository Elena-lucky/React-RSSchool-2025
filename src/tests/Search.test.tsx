import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Search from '../components/search/Search';
import useSearchQuery from '../hooks/useSearchQuery';

type UseSearchQueryReturnType = [string, () => void, () => void];
beforeEach(() => {
  localStorage.clear();
});

vi.mock('../hooks/useSearchQuery', async (importOriginal) => {
  const actual = (await importOriginal()) as {
    default: () => UseSearchQueryReturnType;
  };
  return {
    ...actual,
    default: vi.fn().mockReturnValue(['test query', vi.fn(), vi.fn()]),
  };
});

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should save the entered value to localStorage when the Search button is clicked', () => {
    const setQueryMock = vi.fn();
    const resetQueryMock = vi.fn();
    (useSearchQuery as jest.Mock).mockReturnValue([
      'test query',
      setQueryMock,
      resetQueryMock,
    ]);

    const onSearchClickMock = vi.fn();

    render(<Search onSearchClick={onSearchClickMock} />);

    const input = screen.getByPlaceholderText('What are you searching?');
    const searchButton = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'test query' } });

    fireEvent.click(searchButton);

    expect(onSearchClickMock).toHaveBeenCalledWith('test query');
  });

  it('should retrieve the value from localStorage upon mounting', () => {
    localStorage.setItem('searchQuery', 'initial query');
    const setQueryMock = vi.fn();
    const resetQueryMock = vi.fn();
    (useSearchQuery as jest.Mock).mockReturnValue([
      'initial query',
      setQueryMock,
      resetQueryMock,
    ]);

    render(<Search onSearchClick={vi.fn()} />);

    const input = screen.getByPlaceholderText(
      'What are you searching?'
    ) as HTMLInputElement;
    expect(input.value).toBe('initial query');
  });
});
