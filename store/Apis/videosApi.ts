// store/Apis/videosApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videosApi = createApi({
  reducerPath: "videosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getVideos: builder.query<
      { videos: any[]; nextPage: number | null },
      { page?: number; limit?: number; q?: string }
    >({
      query: ({ page = 1, limit = 12, q = "" }) =>
        `videos?page=${page}&limit=${limit}&query=${encodeURIComponent(q)}`,
    }),
  }),
});

export const { useGetVideosQuery } = videosApi;
export default videosApi;
