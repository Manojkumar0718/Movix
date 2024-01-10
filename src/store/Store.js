import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './HomeSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});
