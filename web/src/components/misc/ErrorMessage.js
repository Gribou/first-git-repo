import React from "react";
import { Alert, AlertTitle } from "@mui/material";

export default function ErrorMessage(props) {
  return (
    <Alert severity="error" variant="outlined" {...props}>
      <AlertTitle>Le chargement de cette page a échoué.</AlertTitle>
      Veuillez rafraîchir cette page. Si le problème est toujours présent,
      contactez l&apos;administrateur.
    </Alert>
  );
}
