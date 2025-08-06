"use client";

import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const VideoCard = ({ videos }: { videos: any[] }) => {
  console.log(videos);
  return (
    <Grid container spacing={2}>
      {videos &&
        videos.map((video, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={video.id + index}>
            <Card>
              <CardMedia
                component="img"
                image={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
              />
              <CardContent>
                <Typography variant="subtitle1">
                  {video.snippet.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {video.snippet.channelTitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default VideoCard;
