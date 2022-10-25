import React from "react";
import {
  Stack,
  Container,
  CssBaseline,
  Alert,
  AlertTitle,
} from "@mui/material";

import Theming from "components/Layout/Theming";

export default function NotFoundPage() {
  return (
    <Theming theme="dark">
      <Stack
        justifyContent="center"
        alignItems="stretch"
        sx={{
          //do not use 100vh for Safari else bottom bar is out of screen
          height: "100vh",
          "@supports (-webkit-touch-callout: none)": {
            //Safari only https://github.com/postcss/postcss-100vh-fix
            height: "-webkit-fill-available",
          },
        }}
      >
        <CssBaseline />
        <Container
          maxWidth="md"
          component="main"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Alert severity="error" variant="outlined" sx={{ flexGrow: 1 }}>
            <AlertTitle>Page introuvable</AlertTitle>
            La page que vous cherchez n&apos;existe pas.
          </Alert>
        </Container>
      </Stack>
    </Theming>
  );
}
