"use client";

import Link from "next/link";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Video } from "@/types/videos";
import { adaptYouTubeVideo } from "@/adapters/youtubeAdapter";

const VideoCard = ({ videos }: { videos: Video[] }) => {
  return (
    <Grid container spacing={2}>
      {videos?.map((video) => {
        const {
          id,
          title,
          description,
          thumbnailUrl,
          channelTitle,
          publishedAt,
        } = adaptYouTubeVideo(video);
        return (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={id+title}>
            <Link href={`/watch/${id}`} style={{ textDecoration: "none" }}>
              <Card sx={{ height: "100%", cursor: "pointer" }}>
                <CardMedia component="img" image={thumbnailUrl} alt={title} />
                <CardContent>
                  <Typography variant="subtitle1">{title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {channelTitle}  
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default VideoCard;
