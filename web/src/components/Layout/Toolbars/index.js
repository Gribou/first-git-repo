import React from "react";
import { alpha } from "@mui/material";
import { Toolbar, IconButton, Typography, Tooltip, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Home, ImageMultiple } from "mdi-material-ui";

import { useCurrentProfile } from "features/profile";
import { ROUTES } from "routes";

import SearchField from "./SearchField";
import ElementButton from "components/misc/elements/ElementButton";
import ProfileSwitcher from "./ProfileSwitcher";
import PhotoButton from "./PhotoButton";

export function TopToolbar() {
  const { current_profile } = useCurrentProfile();
  const { show_search_field, show_photo_button, url, toolbar } =
    current_profile || {};

  const search_field = show_search_field && (
    <Box
      sx={{
        position: "relative",
        borderRadius: 1,
        color: (theme) => theme.palette.common.white,
        bgcolor: (theme) => alpha(theme.palette.common.white, 0.15),
        "&:hover": {
          bgcolor: (theme) => alpha(theme.palette.common.white, 0.25),
        },
      }}
    >
      <SearchField />
    </Box>
  );

  const home_button = (show_search_field || show_photo_button) && (
    <IconButton
      component={RouterLink}
      to={ROUTES.profile.path.replace(":profile", url)}
      color="inherit"
      size="large"
    >
      <Home />
    </IconButton>
  );

  const toolbar_zone = toolbar?.map(({ element }, i) => (
    <ElementButton element={element} key={i} sx={{ mr: 1 }} />
  ));

  return (
    <Toolbar disableGutters>
      {home_button}
      {search_field}
      <Box sx={{ flexGrow: 1 }} />
      {toolbar_zone}
    </Toolbar>
  );
}

export function BottomToolbar() {
  const { current_profile, client_ip } = useCurrentProfile();
  const { show_photo_button, url } = current_profile || {};

  const photo_button = show_photo_button && <PhotoButton size="large" />;

  const gallery_button = show_photo_button && (
    <Tooltip title="Phototèque">
      <IconButton
        color="inherit"
        component={RouterLink}
        size="large"
        to={ROUTES.gallery_in_profile.path.replace(":profile", url)}
      >
        <ImageMultiple />
      </IconButton>
    </Tooltip>
  );

  const profile_switcher = !!url && <ProfileSwitcher edge="end" />;

  const client_display = (
    <Typography color="textSecondary" variant="caption" sx={{ mr: 2 }}>
      {client_ip}
    </Typography>
  );

  return (
    <Toolbar variant="dense" disableGutters>
      {photo_button}
      {gallery_button}
      <Box sx={{ flexGrow: 1 }} />
      {client_display}
      {profile_switcher}
    </Toolbar>
  );
}
