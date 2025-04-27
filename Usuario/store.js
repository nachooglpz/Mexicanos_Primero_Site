import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice.js';


export const store = configureStore({
    reducer: {
        usuario: userReducer,
    },
  });
  