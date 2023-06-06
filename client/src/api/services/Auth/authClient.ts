import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authClient = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_BASE_URL}/auth` }),
  endpoints: (builder) => ({}),
});

export default authClient;
