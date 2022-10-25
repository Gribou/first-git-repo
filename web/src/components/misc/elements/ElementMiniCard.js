import React from "react";
import { Card, Typography, CardMedia, CardActionArea } from "@mui/material";
import useElementProps from "./ElementProps";

export default function MiniAppCard({ element, ...props }) {
  const {
    disabled,
    props: element_props,
    color,
    textColor,
    title,
    icon,
  } = useElementProps(element);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        bgcolor: color,
        width: "92px",
        height: "92px",
      }}
      {...props}
    >
      <CardActionArea
        {...element_props}
        disabled={disabled}
        sx={{
          color: textColor,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          src={icon}
          sx={{
            mx: "auto",
            mt: "3px",
            mb: "4px",
            width: "48px",
            height: "48px",
            objectFit: "contain",
          }}
        />
        <Typography
          variant="caption"
          align="center"
          display="block"
          color="inherit"
          noWrap
        >
          {title}
        </Typography>
      </CardActionArea>
    </Card>
  );
}
