import React from "react";
import { CircularProgress } from "@mui/material";

export default function renderLoader(percentages) {
  return (
    <CircularProgress
      variant="determinate"
      value={percentages}
      color="primary"
    />
  );
}
