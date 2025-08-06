"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useSearchVideosQuery } from "@/store/Apis/youtubeApi";
import VideoCard from "@/components/VideoCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Box } from "@mui/material";

const HomeFeed = () => {
  const query = useSelector((state: RootState) => state.search.query);
  const [videos, setVideos] = useState<any[]>([]);
  const [pageToken, setPageToken] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);

  const lastLoadedPageToken = useRef<string | undefined>(undefined);

  // Query string: use fallback "popular" for home
  const effectiveQuery = query || "popular";

  const {
    data,
    isFetching,
    error,
  } = useSearchVideosQuery({ query: effectiveQuery, pageToken }, {
    skip: !hasMore,
  });

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

  // Reset when query changes
  useEffect(() => {
    setVideos([]);
    setPageToken(undefined);
    setHasMore(true);
    lastLoadedPageToken.current = undefined;
  }, [query]);

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

  if (error) return <p>Error loading home feed.</p>;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      <VideoCard videos={videos} />
      <div ref={observerRef} style={{ height: 20, width: "100%" }} />
      {isFetching && <p>Loading more...</p>}
    </Box>
  );
};

export default HomeFeed;
