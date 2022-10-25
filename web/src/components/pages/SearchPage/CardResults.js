import React from "react";
import { Card, CardHeader, CardContent, List, Avatar } from "@mui/material";

export default function CardResults({
  title,
  children,
  color,
  textColor,
  icon,
  action,
}) {
  return (
    <Card sx={{ height: "100%" }} variant="outlined">
      <CardHeader
        title={title}
        action={action}
        titleTypographyProps={{ noWrap: true, variant: "h6" }}
        avatar={
          icon && (
            <Avatar
              sx={{
                bgcolor: color || "background.default",
                color: textColor || "common.white",
              }}
              variant="rounded"
            >
              {typeof icon === "string" ? (
                <img
                  src={icon}
                  style={{
                    width: "24px",
                    height: "24px",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
              ) : (
                icon
              )}
            </Avatar>
          )
        }
      />
      <CardContent sx={{ p: 0, "&:last-child": { pb: 1 } }}>
        <List dense>{children}</List>
      </CardContent>
    </Card>
  );
}
