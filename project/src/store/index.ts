import { rootReducer } from './root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { createSixCitiesApi } from '../services/api';

export const api = createSixCitiesApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
