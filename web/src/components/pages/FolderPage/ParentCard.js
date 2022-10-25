import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";

import { getStaticFile } from "features/ui";
import { ROUTES } from "routes";

export default function ParentCard({ parent, profile, sx = [], ...props }) {
  const back_route = parent
    ? ROUTES.folder_in_profile.path
        .replace(":profile", profile)
        .replace(":folder", parent)
    : ROUTES.profile.path.replace(":profile", profile);
  const back_icon = getStaticFile("/defaults/icons/back.svg");
  return (
    <Card
      sx={[
        { minHeight: { md: "20vh" }, height: "100%" },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      <CardActionArea
        component={RouterLink}
        to={back_route}
        sx={{
          p: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          src={back_icon}
          sx={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
            p: 1,
            mx: "auto",
          }}
        />
        <CardContent sx={{ p: 0 }}>
          <Typography
            variant="h6"
            align="center"
            display="block"
            color="inherit"
            noWrap
            sx={{ width: "100%" }}
          >
            ..
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
