import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/Api/apiSlice';
import selectedItemsReducer from './selectedItemsSlice';

const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
