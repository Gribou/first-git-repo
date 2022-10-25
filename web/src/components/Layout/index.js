import React from "react";
import { CssBaseline, CircularProgress, Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import { useAutoRefresh } from "features/ui";
import { useCurrentProfile } from "features/profile";

import Theming from "./Theming";
import { TopToolbar, BottomToolbar } from "./Toolbars";
import ErrorMessage from "components/misc/ErrorMessage";
import Notifier from "./Notifier";

export default function Root() {
  const { current_profile, isLoading, isError } = useCurrentProfile();

  useAutoRefresh();

  return (
    <Theming
      theme={
        current_profile?.dark_theme || current_profile?.dark_theme == undefined
          ? "dark"
          : "light"
      }
    >
      <Stack
        justifyContent="center"
        alignItems="stretch"
        sx={{
          //do not use 100vh for Safari else bottom bar is out of screen
          //but Chrome does not handle fill-available properly either so should use 100vh
          //https://allthingssmitty.com/2020/05/11/css-fix-for-100vh-in-mobile-webkit/
          height: "100vh",
          "@supports (-webkit-touch-callout: none)": {
            //Safari only https://github.com/postcss/postcss-100vh-fix
            height: "-webkit-fill-available",
          },
          position: "fixed", // fixes bug in Safari iOS with overflow: "hidden" https://bugs.webkit.org/show_bug.cgi?id=153852#c43
          left: 0,
          right: 0,
          overflowY: "hidden", //let pages handle their scrollbar
        }}
      >
        <CssBaseline />
        <Notifier style={{ top: 0, marginTop: 64 }} />
        <TopToolbar />
        <Box
          component="main"
          sx={{
            display: "flex",
            flex: "1 1 0%",
            minHeight: "0%",
            overflowY: "hidden", //let pages handle their scrollbar
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading ? (
            <Box>
              <CircularProgress size={80} />
            </Box>
          ) : isError ? (
            <ErrorMessage />
          ) : (
            <Outlet />
          )}
        </Box>
        <BottomToolbar />
      </Stack>
    </Theming>
  );
}
