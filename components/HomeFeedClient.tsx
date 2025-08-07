"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useSearchVideosQuery } from "@/store/Apis/youtubeApi";
import VideoCard from "@/components/VideoCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Box } from "@mui/material";

type Props = {
  initialVideos: any[];
  nextPageToken?: string;
};

const HomeFeedClient = ({ initialVideos, nextPageToken }: Props) => {
  const query = useSelector((state: RootState) => state.search.query);
  const [videos, setVideos] = useState<any[]>(initialVideos || []);
  const [pageToken, setPageToken] = useState<string | undefined>(nextPageToken);
  const [hasMore, setHasMore] = useState(Boolean(nextPageToken));

  const lastLoadedPageToken = useRef<string | undefined>(nextPageToken);

  const isDefaultHome = query === "" || query === undefined;

  const { data, isFetching, error } = useSearchVideosQuery(
    { query: query || "popular", pageToken },
    {
      skip: isDefaultHome && !pageToken, // Skip fetching if on home and already have initialVideos
    }
  );

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

  // Reset videos when query changes
  useEffect(() => {
    if (!isDefaultHome) {
      setVideos([]);
      setPageToken(undefined);
      setHasMore(true);
      lastLoadedPageToken.current = undefined;
    }
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
console.log('videosss',videos)
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <VideoCard videos={videos} />
      <div ref={observerRef} style={{ height: 20, width: "100%" }} />
      {isFetching && <p>Loading more...</p>}
    </Box>
  );
};

export default HomeFeedClient;
