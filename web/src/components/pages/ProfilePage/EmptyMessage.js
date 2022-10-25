import React from "react";
import { Alert, AlertTitle } from "@mui/material";

export default function EmptyMessage(props) {
  return (
    <Alert severity="warning" variant="outlined" {...props}>
      <AlertTitle>Cette page n&apos;a pas été configurée.</AlertTitle>
      Si vous êtes administrateur, veuillez utiliser l&apos;interface
      d&apos;administration pour configurer ce profil.
      <br />
      Sinon, contactez l&apos;administrateur.
    </Alert>
  );
}
