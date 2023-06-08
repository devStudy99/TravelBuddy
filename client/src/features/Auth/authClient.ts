import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authClient = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}/auth`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({}),
});

export default authClient;
