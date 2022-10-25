import React from "react";
import { Grid, Typography, Stack } from "@mui/material";
import ElementCard from "components/misc/elements/ElementCard";
import ParentCard from "./ParentCard";

import { useCurrentProfile } from "features/profile";

function useCurrentFolder() {
  const { current_profile, current_folder } = useCurrentProfile();
  return (
    current_folder && {
      profile: current_profile?.url,
      ...current_profile?.folders[current_folder],
    }
  );
}

export default function Page() {
  const folder = useCurrentFolder();
  const { title, parent, children, profile } = folder || {};

  return (
    <Stack
      direction="column"
      sx={{
        flex: "1 1 0%",
        overflowY: "auto",
        maxWidth: "md",
        mx: "auto",
      }}
      spacing={2}
    >
      <Typography
        align="center"
        variant="h5"
        sx={{ fontVariant: "small-caps" }}
      >
        {title}
      </Typography>
      <Grid container direction="row">
        <Grid xs={6} sm={3} item sx={{ p: 1 }}>
          <ParentCard parent={parent} profile={profile} />
        </Grid>
        {children?.map((element, i) => (
          <Grid xs={6} sm={3} item key={i} sx={{ p: 1 }}>
            <ElementCard element={element} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
