import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, CircularProgress, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";

import { useSearchResults } from "features/search";
import { ROUTES } from "routes";
import { useCurrentProfile } from "features/profile";
import { displayMessage } from "features/messages";
import ErrorMessage from "components/misc/ErrorMessage";
import EngineResults from "./EngineResults";
import AppResults from "./AppResults";
import { PageResults, FileResults, FolderResults } from "./FileResults";
import GlobalSearchResults from "./GlobalSearchResults";

export default function Page() {
  const dispatch = useDispatch();
  const {
    others,
    apps,
    files,
    pages,
    folders,
    global,
    isEmpty,
    isLoading,
    isSuccess,
    isError,
  } = useSearchResults();
  const { current_profile } = useCurrentProfile();

  useEffect(() => {
    if (isSuccess && isEmpty) {
      dispatch(displayMessage("Aucun résultat"));
    }
  }, [isEmpty, isSuccess]);

  return isLoading ? (
    <CircularProgress size={80} sx={{ m: "auto" }} />
  ) : isEmpty && isSuccess ? (
    <Navigate
      to={ROUTES.profile.path.replace(":profile", current_profile?.url)}
    />
  ) : (
    <Grid
      container
      spacing={2}
      sx={{
        flex: "1 1 0%",
        minHeight: "0%",
        maxHeight: "100%",
        overflowY: "auto",
        alignSelf: "flex-start",
        px: 2,
      }}
    >
      {isError && (
        <Grid item xs={12}>
          <ErrorMessage />
        </Grid>
      )}
      {files?.count === 0 &&
        folders?.length === 0 &&
        apps?.length === 0 &&
        global?.isEmpty && (
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ mb: 4 }}
              gutterBottom
            >
              Aucun résultat
            </Typography>
          </Grid>
        )}

      {pages?.count > 0 && (
        <Grid item xs>
          <PageResults {...pages} />
        </Grid>
      )}
      {files?.count > 0 && (
        <Grid item xs>
          <FileResults {...files} />
        </Grid>
      )}
      {folders?.length > 0 && (
        <Grid item xs>
          <FolderResults results={folders} />
        </Grid>
      )}
      {global?.map((api_result, i) => (
        <Grid item xs key={i}>
          <GlobalSearchResults {...api_result} />
        </Grid>
      ))}
      {apps?.length > 0 && (
        <Grid item xs={12}>
          <AppResults apps={apps} />
        </Grid>
      )}
      {others?.length > 0 && (
        <Grid item xs={12}>
          <EngineResults others={others} />
        </Grid>
      )}
    </Grid>
  );
}
