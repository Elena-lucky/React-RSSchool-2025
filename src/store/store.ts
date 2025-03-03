import type { Store } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { apiSlice } from '../services/Api/apiSlice';
import { selectedItemsSlice } from './selectedItemsSlice';

const rootReducer = combineReducers({
  selectedItems: selectedItemsSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export function setupStore(
  preloadedState?: Partial<RootState>
): Store<RootState> {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
}

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore);
