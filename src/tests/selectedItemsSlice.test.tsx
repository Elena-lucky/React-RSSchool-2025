import { describe, it, expect } from 'vitest';
import reducer, {
  toggleItem,
  clearSelectedItems,
  SelectedItemsState,
} from '../store/selectedItemsSlice';
import { Person } from '../utils/types';

describe('selectedItemsSlice', () => {
  const mockPerson: Person = {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: 'male',
    hair_color: 'blond',
    eye_color: 'blue',
    height: '172',
    mass: '77',
    skin_color: 'fair',
    homeworld: 'Tatooine',
    url: 'http://swapi.dev/api/people/1/',
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
  };

  it('should return the initial state', () => {
    const initialState: SelectedItemsState = { selectedItems: [] };
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should add a person when toggleItem is called for a new item', () => {
    const previousState: SelectedItemsState = { selectedItems: [] };
    const newState = reducer(previousState, toggleItem(mockPerson));

    expect(newState.selectedItems).toHaveLength(1);
    expect(newState.selectedItems[0]).toEqual(mockPerson);
  });

  it('should remove a person when toggleItem is called for an existing item', () => {
    const previousState: SelectedItemsState = { selectedItems: [mockPerson] };
    const newState = reducer(previousState, toggleItem(mockPerson));

    expect(newState.selectedItems).toHaveLength(0);
  });

  it('should clear all selected items when clearSelectedItems is called', () => {
    const previousState: SelectedItemsState = { selectedItems: [mockPerson] };
    const newState = reducer(previousState, clearSelectedItems());

    expect(newState.selectedItems).toHaveLength(0);
  });
});
