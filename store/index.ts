import { configureStore } from "@reduxjs/toolkit";
import { youtubeApi } from "./Apis/youtubeApi";
import searchReducer from "./Slices/searchSlice";
export const store = configureStore({
  reducer: {
    search: searchReducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(youtubeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
