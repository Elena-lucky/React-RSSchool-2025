import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '../utils/types';

export interface SelectedItemsState {
  selectedItems: Person[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<Person>) => {
      const item = action.payload;
      const index = state.selectedItems.findIndex((i) => i.url === item.url);
      if (index === -1) {
        state.selectedItems.push(item);
      } else {
        state.selectedItems.splice(index, 1);
      }
    },
    clearSelectedItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { toggleItem, clearSelectedItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
