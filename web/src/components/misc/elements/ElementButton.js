import React from "react";
import { Button, useMediaQuery } from "@mui/material";
import { darken } from "@mui/material/styles";
import useElementProps from "./ElementProps";

const makeButtonStyle = (color, textColor) => ({
  whiteSpace: "nowrap",
  minWidth: "max-content",
  color: (theme) => textColor || theme.palette.getContrastText(color),
  bgcolor: color,
  "&:hover": {
    bgcolor: (theme) => (0, darken)(color, theme.palette.tonalOffset),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      bgcolor: color,
    },
  },
});

export default function ElementButton({ element, sx = [], ...props }) {
  const xsDown = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const {
    disabled,
    props: element_props,
    color,
    textColor,
    title,
    icon,
  } = useElementProps(element);

  return (
    <Button
      variant="contained"
      {...element_props}
      disabled={disabled}
      startIcon={
        typeof icon === "string" ? (
          <img
            src={icon}
            style={{
              width: "1em",
              height: "1em",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
        ) : (
          icon
        )
      }
      sx={[
        makeButtonStyle(color, textColor),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {xsDown ? "" : title}
    </Button>
  );
}
