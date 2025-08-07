// store/Apis/youtubeApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export const youtubeApi = createApi({
  reducerPath: "youtubeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/youtube/v3/",
  }),
  endpoints: (builder) => ({
    getTrendingVideos: builder.query<any, { pageToken?: string }>({
      query: ({ pageToken }) =>
        `videos?part=snippet&chart=mostPopular&maxResults=1&regionCode=IN&key=${YOUTUBE_API_KEY}${
          pageToken ? `&pageToken=${pageToken}` : ""
        }`,
    }),
    searchVideos: builder.query<any, { query: string; pageToken?: string }>({
      query: ({ query, pageToken }) =>
        `search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
          query
        )}&regionCode=IN&key=${YOUTUBE_API_KEY}${
          pageToken ? `&pageToken=${pageToken}` : ""
        }`,
    }),
  }),
});

export const { useGetTrendingVideosQuery, useSearchVideosQuery } = youtubeApi;
