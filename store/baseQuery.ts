import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://www.googleapis.com/youtube/v3/",
  prepareHeaders: (headers) => {
    headers.set("Accept", "application/json");
    return headers;
  },
});
export default baseQuery