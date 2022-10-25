import React from "react";
import { Box } from "@mui/material";

export default function ToolbarContainer({ children, toolbarPluginInstance }) {
  const { Toolbar } = toolbarPluginInstance;
  return (
    <Box
      sx={{
        p: 0.5,
        width: "100%",
        position: "absolute",
        alignItems: "center",
        color: "text.secondary",
        bgcolor: "background.paper",
        "& .rpv-toolbar": {
          display: "flex",
          flexDirection: "row",
        },
        "& span.rpv-zoom__popover-target-scale": {
          color: "text.secondary",
        },
        "& span.rpv-zoom__popover-target-arrow": {
          borderTopColor: "text.secondary",
        },
        "& div.rpv-core__popover-body": {
          bgcolor: "background.default",
          borderColor: "divider",
          "& .rpv-core__popover-body-arrow": {
            bgcolor: "background.default",
          },
          "& .rpv-core__menu-item": {
            color: "text.secondary",
          },
          "& .rpv-core__menu-divider": {
            borderColor: "divider",
          },
        },
      }}
    >
      <Toolbar>{children}</Toolbar>
    </Box>
  );
}
