import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedItemsState {
  selectedItems: string[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const index = state.selectedItems.indexOf(itemId);
      if (index === -1) {
        state.selectedItems.push(itemId);
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
