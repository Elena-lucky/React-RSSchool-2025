import { renderHook, act } from '@testing-library/react';
import useSearchQuery from '../hooks/useSearchQuery';

describe('useSearchQuery', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return an initial query from localStorage', () => {
    localStorage.setItem('searchQuery', 'test query');

    const { result } = renderHook(() => useSearchQuery());

    expect(result.current[0]).toBe('test query');
  });

  it('should update query and store it in localStorage', () => {
    const { result } = renderHook(() => useSearchQuery());

    act(() => {
      result.current[1]('new query');
    });

    expect(result.current[0]).toBe('new query');
    expect(localStorage.getItem('searchQuery')).toBe('new query');
  });

  it('should reset query and store empty string in localStorage', () => {
    localStorage.setItem('searchQuery', 'some value');

    const { result } = renderHook(() => useSearchQuery());

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBe('');
    expect(localStorage.getItem('searchQuery')).toBe('');
  });
});
