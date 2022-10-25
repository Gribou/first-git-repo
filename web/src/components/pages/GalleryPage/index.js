import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import ErrorMessage from "components/misc/ErrorMessage";
import { useGalleryQuery } from "features/gallery/hooks";
import PhotoCard from "./PhotoCard";
import EmptyMessage from "./EmptyMessage";

export default function Page() {
  const { data: gallery, isLoading, isError } = useGalleryQuery();

  return isLoading ? (
    <CircularProgress size={80} sx={{ m: "auto" }} />
  ) : (
    <Grid
      container
      justifyContent="flex-start"
      alignItems="stretch"
      sx={{
        flex: "1 1 0%",
        maxHeight: "100%",
        overflowY: "auto",
        maxWidth: "md",
      }}
    >
      {isError ? (
        <Grid item xs>
          <ErrorMessage />
        </Grid>
      ) : (
        gallery?.length === 0 && (
          <Grid item xs>
            <EmptyMessage />
          </Grid>
        )
      )}
      {(gallery || []).map((photo, i) => (
        <Grid item xs={4} md={3} key={i} sx={{ p: 1, minWidth: "20vh" }}>
          <PhotoCard {...photo} />
        </Grid>
      ))}
    </Grid>
  );
}
