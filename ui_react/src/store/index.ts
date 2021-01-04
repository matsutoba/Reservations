import { configureStore } from '@reduxjs/toolkit';
import { RootReducer } from '../recuders';

export const store = configureStore({
    reducer: RootReducer
  });

