// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const firebaseApi = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: "https://lafrontapp.firebaseio.com" }),
//   endpoints: (builder) => ({
//     getCollection: builder.query({
//       query: (collectionName) => `${collectionName}`,
//     }),
//   }),
// });

// export default firebaseApi;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addEventToFirestore = createAsyncThunk()

const firebaseSlice = createSlice({
  name: 'Events',
  initialState: {
    eventArray: [], 
  },
  reducers: {

  },
  extraReducers: {

  }
});

export default firebaseSlice.reducer;