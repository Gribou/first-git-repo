import React from "react";
import { Typography, Stack } from "@mui/material";

export default function SingleRowResults({ title, children, sx, footer }) {
  return (
    <Stack sx={sx}>
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        {`${title} :`}
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ flexWrap: "noWrap", overflow: "hidden" }}
      >
        {children}
      </Stack>
      {footer}
    </Stack>
  );
}
