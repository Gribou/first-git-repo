import React from "react";
import { Typography, Stack, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getStaticFile } from "features/ui";

export default function NavigationBar({ fileName }) {
  const navigate = useNavigate();
  const back_icon = getStaticFile("/defaults/icons/back.svg");

  return (
    <Stack
      direction="row"
      sx={{
        p: 0.5,
        color: "text.secondary",
        bgcolor: "background.paper",
      }}
      alignItems="center"
    >
      <Tooltip title="Retour">
        <IconButton size="small" onClick={() => navigate(-1)}>
          <img src={back_icon} />
        </IconButton>
      </Tooltip>
      <Typography variant="button" sx={{ ml: 1 }}>
        {fileName}
      </Typography>
    </Stack>
  );
}
