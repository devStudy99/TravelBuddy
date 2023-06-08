import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authClient from '@features/Auth/authClient';

const store = configureStore({
  reducer: {
    [authClient.reducerPath]: authClient.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authClient.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export default store;
