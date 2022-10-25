import React from "react";
import {
  Card,
  CardMedia,
  CardActions,
  CardActionArea,
  IconButton,
  Link,
} from "@mui/material";
import { Delete } from "mdi-material-ui";
import { useDestroyPictureMutation } from "features/gallery/hooks";

export default function PhotoCard({ file, pk }) {
  const [destroyPicture] = useDestroyPictureMutation();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea
        component={Link}
        href={file}
        target="_blank"
        sx={{ flexGrow: 1, minHeight: "20vh" }}
      >
        <CardMedia component="img" image={file} sx={{ height: "100%" }} />
      </CardActionArea>
      <CardActions>
        <IconButton
          size="small"
          onClick={() => destroyPicture(pk)}
          sx={{ ml: "auto" }}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}
