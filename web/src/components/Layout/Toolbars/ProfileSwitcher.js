import React, { Fragment } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { MenuDown } from "mdi-material-ui";

import { ROUTES } from "routes";
import { useMenu } from "features/ui";
import { useProfileQuery } from "api";
import { useCurrentProfile } from "features/profile";

function useProfileMenu(choices) {
  const { isOpen, anchor, open, close } = useMenu();

  const make_link = (url) =>
    url === null
      ? ROUTES.default_profile.path
      : ROUTES.profile.path.replace(":profile", url);

  const display = (
    <Menu
      anchorEl={anchor}
      keepMounted
      open={isOpen()}
      onClose={close}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      {choices?.length > 1 && (
        <MenuItem
          component={RouterLink}
          to={ROUTES.default_profile.path}
          onClick={close}
        >
          Défaut
        </MenuItem>
      )}
      {choices?.map(({ title, url }, i) => (
        <MenuItem
          key={i}
          component={RouterLink}
          to={make_link(url)}
          onClick={close}
        >
          {title}
        </MenuItem>
      ))}
    </Menu>
  );

  return { display, open };
}

export default function ProfileSwitcher(props) {
  const { data: profiles_config } = useProfileQuery();
  const { profiles } = profiles_config || {};
  const { current_profile } = useCurrentProfile();
  const profile_menu = useProfileMenu(profiles);

  const menu_is_empty = profiles?.length <= 1;

  return (
    <Fragment>
      {!menu_is_empty && current_profile?.show_profile_switch && (
        <Button
          endIcon={<MenuDown />}
          onClick={profile_menu.open}
          color="inherit"
          {...props}
        >
          {current_profile?.title || "Profil inconnu"}
        </Button>
      )}
      {profile_menu.display}
    </Fragment>
  );
}
