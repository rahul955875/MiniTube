"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import VideoCard from "@/components/VideoCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Box } from "@mui/material";
import { useGetVideosQuery } from "@/store/Apis/videosApi";

type Props = {
  initialVideos?: any[];
  nextPageToken?: string | number;
  source?: "youtube" | "backend";
};

const HomeFeedClient = ({
  initialVideos = [],
  nextPageToken,
  source = "backend",
}: Props) => {
  const query = useSelector((state: RootState) => state.search.query);
  const isDefaultHome = !query;

  // Page starts from nextPageToken or 1
  const [page, setPage] = useState<number>(Number(nextPageToken ?? 1));
  const [videos, setVideos] = useState<any[]>(initialVideos);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Track last successfully loaded page
  const lastLoadedPage = useRef<number>(initialVideos.length ? page : 0);

  // Skip first API fetch if initialVideos already cover page 1
  const shouldSkip =
    source !== "backend" || (page === 1 && initialVideos.length > 0);

  const { data, isFetching, error } = useGetVideosQuery(
    { page, limit: 12, q: query || "" },
    { skip: shouldSkip }
  );

  console.log("videos==>", data);
  // Load more when observer triggers
  const handleObserver = useCallback(() => {
    if (!hasMore || isFetching) return;
    setPage((prev) => prev + 1);
  }, [hasMore, isFetching]);

  const { observerRef, startObserving } = useInfiniteScroll({
    handleObserver,
    observerConfig: { root: null, rootMargin: "300px", threshold: 0 },
  });

  // Start observing after videos are loaded
  useEffect(() => {
    if (!isFetching && videos.length > 0) {
      startObserving();
    }
  }, [isFetching, videos.length, startObserving]);

  // Update videos when new data arrives
  useEffect(() => {
    if (source !== "backend" || !data) return;

    const newVideos = data.videos ?? [];
    setVideos((prev) => (page === 1 ? newVideos : [...prev, ...newVideos]));
    setHasMore(Boolean(data.nextPage));
    lastLoadedPage.current = page;
  }, [data, page, source]);

  if (error && source === "youtube") {
    return <p>Error loading home feed.</p>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <VideoCard videos={videos} />
      <div ref={observerRef} style={{ height: 20, width: "100%" }} />
      {isFetching && <p>Loading more...</p>}
    </Box>
  );
};

export default HomeFeedClient;
