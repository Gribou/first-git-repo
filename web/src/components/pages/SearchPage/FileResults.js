import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Typography, ListItemText, ListItem } from "@mui/material";
import { Folder, FileMultiple, FileSearch } from "mdi-material-ui";
import { useCurrentProfile } from "features/profile";
import { ROUTES } from "routes";
import CardResults from "./CardResults";

function ItemRow({ pathname, item, ...props }) {
  const { color, title } = item;
  const current_location = useLocation();
  return (
    <ListItem
      button
      component={RouterLink}
      to={{
        pathname,
        state: { from: current_location },
      }}
      {...props}
    >
      <ListItemText
        sx={{ color: color || "text.primary" }}
        primaryTypographyProps={{ noWrap: true }}
      >
        {title}
      </ListItemText>
    </ListItem>
  );
}

function FileRow({ item, currentProfile, ...props }) {
  return (
    <ItemRow
      item={item}
      pathname={ROUTES.file_in_profile.path
        .replace(":profile", currentProfile?.url)
        .replace(":file", item?.url?.split("/media/files/")[1])}
      {...props}
    />
  );
}

function FolderRow({ item, currentProfile, ...props }) {
  return (
    <ItemRow
      item={item}
      pathname={ROUTES.folder_in_profile.path
        .replace(":profile", currentProfile?.url)
        .replace(":folder", item?.pk)}
      {...props}
    />
  );
}

function ItemResults({ results, count, title, icon, RowComponent }) {
  const { current_profile } = useCurrentProfile();

  const hidden_results = count - results?.length;

  return (
    <CardResults title={title} icon={icon}>
      {results?.map((item) => (
        <RowComponent
          key={item.title}
          item={item}
          currentProfile={current_profile}
        />
      ))}
      {hidden_results > 0 && (
        <Typography color="textSecondary" variant="caption" align="right">
          {`et ${hidden_results} autres résultats. Utilisez des critères de recherche plus précis.`}
        </Typography>
      )}
    </CardResults>
  );
}

export function PageResults({ results, count }) {
  return (
    <ItemResults
      results={results}
      count={count}
      title="Pages"
      icon={<FileSearch />}
      RowComponent={FileRow}
    />
  );
}

export function FileResults({ results, count }) {
  return (
    <ItemResults
      results={results}
      count={count}
      title="Fichiers"
      icon={<FileMultiple />}
      RowComponent={FileRow}
    />
  );
}

export function FolderResults({ results, count }) {
  return (
    <ItemResults
      results={results}
      count={count}
      title="Dossiers"
      icon={<Folder />}
      RowComponent={FolderRow}
    />
  );
}
