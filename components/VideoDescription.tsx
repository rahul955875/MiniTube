// components/VideoDescription.tsx
"use client";

import { useState } from "react";
import { Typography, Button, Stack } from "@mui/material";
import { Video } from "@/types/videos";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function VideoDescription({ video }: { video: Video }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Stack spacing={1} sx={{ mt: 2 }}>
      <Typography variant="h6">{video.title}</Typography>
      <Typography variant="subtitle2" color="text.secondary">
        {video.channelTitle} •{" "}
        {video?.publishedAt ? formatDate(video.publishedAt) : ""}
      </Typography>
      <Typography variant="body2" noWrap={!expanded}>
        {video.description}
      </Typography>
      <Button
        size="small"
        onClick={() => setExpanded((prev) => !prev)}
        sx={{ textTransform: "none", alignSelf: "start" }}
      >
        {expanded ? "Show Less" : "Show More"}
      </Button>
    </Stack>
  );
}
