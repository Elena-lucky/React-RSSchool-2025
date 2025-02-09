import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchSearchResults } from '../services/Api';

describe('fetchSearchResults', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch search results with a query and page number', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        results: [{ name: 'Luke Skywalker' }],
        count: 1,
        next: null,
        previous: null,
      }),
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as any);

    const result = await fetchSearchResults('Luke', 1);

    expect(fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/?search=Luke&page=1'
    );

    expect(result).toEqual({
      results: [{ name: 'Luke Skywalker' }],
      count: 1,
      next: null,
      previous: null,
    });
  });

  it('should fetch search results without a query', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        results: [{ name: 'Leia Organa' }],
        count: 1,
        next: null,
        previous: null,
      }),
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as any);

    const result = await fetchSearchResults('', 1);

    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?page=1');

    expect(result).toEqual({
      results: [{ name: 'Leia Organa' }],
      count: 1,
      next: null,
      previous: null,
    });
  });

  it('should handle fetch errors and return an empty result', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

    const result = await fetchSearchResults('Luke', 1);

    expect(result).toEqual({
      results: [],
      count: 0,
      next: null,
      previous: null,
    });
  });

  it('should handle non-OK responses and return an empty result', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: 'Not Found',
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as any);

    const result = await fetchSearchResults('Luke', 1);

    expect(result).toEqual({
      results: [],
      count: 0,
      next: null,
      previous: null,
    });
  });
});
