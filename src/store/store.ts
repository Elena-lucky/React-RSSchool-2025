import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import countriesReducer from './countriesSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    countries: countriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
