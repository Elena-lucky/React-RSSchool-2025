import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData, FormState } from '../utils/types';

const initialState: FormState = {
  submittedData: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    submitForm: (state, action: PayloadAction<FormData>) => {
      state.submittedData.push(action.payload);
    },
  },
});

export const { submitForm } = formSlice.actions;
export default formSlice.reducer;
