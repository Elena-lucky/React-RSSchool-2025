import { describe, it, expect } from 'vitest';
import store, { RootState } from '../store/store';
import { apiSlice } from '../services/Api/apiSlice';
import { clearSelectedItems } from '../store/selectedItemsSlice';

describe('Redux Store', () => {
  it('should have the correct initial state', () => {
    const state: RootState = store.getState();

    expect(state.selectedItems).toEqual({ selectedItems: [] });
    expect(apiSlice.reducerPath in state).toBe(true);
  });

  it('should handle dispatching actions to selectedItems reducer', () => {
    store.dispatch(clearSelectedItems());

    const state = store.getState();
    expect(state.selectedItems.selectedItems).toEqual([]);
  });

  it('should allow dispatching API actions', () => {
    const action = apiSlice.endpoints.getPerson.initiate({
      query: 'luke',
      page: 1,
    });
    const result = store.dispatch(action);

    expect(result).toHaveProperty('requestId');
  });
});
