// components/VideoCard.tsx
"use client";
import Link from "next/link";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const VideoCard = ({ videos }: { videos: any[] }) => {
  return (
    <Grid container spacing={2}>
      {videos.map((video) => (
        <Grid key={video.id} size={{ xs: 12, sm: 6, md: 3 }}>
          <Link href={`/watch/${video.id}`} style={{ textDecoration: "none" }}>
            <Card sx={{ height: "100%", cursor: "pointer" }}>
              <CardMedia component="img" height="180" image={video.thumbnailUrl} alt={video.title} />
              <CardContent>
                <Typography variant="subtitle1" noWrap>
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {video.channelTitle}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default VideoCard;
