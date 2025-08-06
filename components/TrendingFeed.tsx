"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  useGetTrendingVideosQuery,
  useSearchVideosQuery,
} from "@/store/Apis/youtubeApi";
import VideoCard from "@/components/VideoCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll"; // your custom hook
import { Box } from "@mui/material";

const TrendingFeed = () => {
  const query = useSelector((state: RootState) => state.search.query);
  const [videos, setVideos] = useState<any[]>([]);
  const [pageToken, setPageToken] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);

  const lastLoadedPageToken = useRef<string | undefined>(undefined);

  const {
    data: trendingData,
    isFetching: isFetchingTrending,
    error: trendingError,
  } = useGetTrendingVideosQuery({ pageToken }, { skip: !!query || !hasMore });

  const {
    data: searchData,
    isFetching: isFetchingSearch,
    error: searchError,
  } = useSearchVideosQuery({ query, pageToken }, { skip: !query || !hasMore });

  const data = query ? searchData : trendingData;
  const isFetching = query ? isFetchingSearch : isFetchingTrending;
  const error = query ? searchError : trendingError;

  // Fetch & append videos
  useEffect(() => {
    if (data && data.items) {
      const normalizedItems = data.items.map((item: any) =>
        item.id.videoId ? { ...item, id: item.id.videoId } : item
      );

      setVideos((prev) => [...prev, ...normalizedItems]);
      setHasMore(Boolean(data.nextPageToken));
      lastLoadedPageToken.current = pageToken;
    }
  }, [data, pageToken]);

  // Reset videos on new query
  useEffect(() => {
    setVideos([]);
    setPageToken(undefined);
    setHasMore(true);
    lastLoadedPageToken.current = undefined;
  }, [query]);

  // Intersection Observer callback
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        hasMore &&
        !isFetching &&
        data?.nextPageToken &&
        data?.nextPageToken !== lastLoadedPageToken.current
      ) {
        setPageToken(data.nextPageToken);
      }
    },
    [hasMore, isFetching, data?.nextPageToken]
  );

  const observerRef = useInfiniteScroll({
    handleObserver,
    observerConfig: {
      root: null,
      rootMargin: "300px",
      threshold: 0,
    },
  });

  if (error) return <p>Error loading videos.</p>;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      <VideoCard videos={videos} />
      <div ref={observerRef} style={{ height: 20, width: "100%" }} />
      {isFetching && <p>Loading more...</p>}
    </Box>
  );
};

export default TrendingFeed;
