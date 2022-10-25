import React from "react";
import { ListItem, Link, ListItemText, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { OpenInNew } from "mdi-material-ui";
import CardResults from "./CardResults";

function Item({ title, subtitle, url, ...props }) {
  return (
    <ListItem button component={Link} href={url} target="_blank" {...props}>
      {/* <ListItemIcon>
        <Magnify sx={{ color: color || "text.primary" }} />
      </ListItemIcon> */}
      <ListItemText
        sx={{ color: "text.primary" }}
        primaryTypographyProps={{ noWrap: true }}
        primary={title}
        secondary={subtitle}
      />
    </ListItem>
  );
}

export default function GlobalSearchResults({
  label,
  icon,
  color,
  textColor,
  data,
  app_url,
}) {
  const { count, results } = data;
  const { search } = useParams();
  return (
    <CardResults
      title={`${label} (${count})`}
      icon={icon}
      color={color}
      textColor={textColor}
      action={
        <IconButton
          component={Link}
          href={app_url?.replace("{search_query}", search)}
          target="_blank"
        >
          <OpenInNew />
        </IconButton>
      }
    >
      {results?.map((item, i) => (
        <Item {...item} key={i} />
      ))}
    </CardResults>
  );
}
