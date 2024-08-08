import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { CategoryApi } from '../features/api/apiSlice';
import categoryReducer from '../features/Category/CategorySlice';

export const store = configureStore({
  reducer: {
    [CategoryApi.reducerPath]: CategoryApi.reducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CategoryApi.middleware),
});

setupListeners(store.dispatch);
