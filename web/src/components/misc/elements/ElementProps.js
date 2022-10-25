import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Link } from "@mui/material";

import { ROUTES } from "routes";
import { getStaticFile } from "features/ui";
import { useCurrentProfile } from "features/profile";

export default function useElementProps({
  title,
  url,
  color,
  textColor,
  icon,
  is_file,
  is_folder,
  folder_pk,
}) {
  const theme = useTheme();
  const { current_profile } = useCurrentProfile();

  const default_icon = getStaticFile(
    `/defaults/icons/${is_folder ? "folder" : is_file ? "file" : "app"}.svg`
  );

  const disabled = !is_folder && !url;

  const actions_props = is_folder
    ? {
        component: RouterLink,
        to: ROUTES.folder_in_profile.path
          .replace(":profile", current_profile?.url)
          .replace(":folder", folder_pk),
      }
    : is_file
    ? {
        component: RouterLink,
        to: ROUTES.file_in_profile.path
          .replace(":profile", current_profile?.url)
          .replace(":file", url?.split("/media/files/")[1]),
      }
    : {
        component: disabled ? undefined : Link,
        href: url,
        underline: "none",
        rel: "noopener noreferrer",
        target: "_blank",
      };

  return {
    disabled,
    props: actions_props,
    color: disabled
      ? theme.palette.divider
      : color || theme.palette.background.paper,
    textColor:
      textColor ||
      (color && theme.palette.getContrastText(color)) ||
      theme.palette.text.primary,
    title,
    icon: icon || default_icon,
    external_indicators: current_profile?.show_external_indicators,
  };
}
