// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { youtubeApi } from "./Apis/youtubeApi";
import { videosApi } from "./Apis/videosApi";
import searchReducer from "./Slices/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
    [videosApi.reducerPath]: videosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(youtubeApi.middleware, videosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
