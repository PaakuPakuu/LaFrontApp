import {configureStore} from "@reduxjs/toolkit";
import {movieApi} from "./movieAPi";
import {setupListeners} from "@reduxjs/toolkit/query";
import likeReducer from "./likesSlice";

export const store = configureStore({
    reducer: {
        [movieApi.reducerPath]: movieApi.reducer,
        likes: likeReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(movieApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch