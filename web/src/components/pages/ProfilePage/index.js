import React from "react";
import { Stack, Grid, Typography } from "@mui/material";

import { useCurrentProfile } from "features/profile";
import ElementCard from "components/misc/elements/ElementCard";
import EmptyMessage from "./EmptyMessage";

export default function Page({ ...props }) {
  const { current_profile } = useCurrentProfile();

  return (
    <Stack
      direction="column"
      {...props}
      sx={{
        flex: "1 1 0%",
        overflowY: "auto",
        maxWidth: "md",
      }}
    >
      {current_profile?.admin_message && (
        <Grid item xs={12}>
          <Typography fullWidth align="center" noWrap variant="h6">
            {current_profile?.admin_message}
          </Typography>
        </Grid>
      )}
      {!current_profile?.layout ? (
        <EmptyMessage sx={{ m: "auto" }} />
      ) : (
        current_profile?.layout?.map((row, i) => (
          <Grid container direction="row" key={i} justifyContent="center">
            {row?.map((element, i) => (
              <Grid key={i} item xs={6} sm={3} sx={{ p: 1 }}>
                <ElementCard element={element} />
              </Grid>
            ))}
          </Grid>
        ))
      )}
    </Stack>
  );
}
