import React from "react";
import { Alert, AlertTitle } from "@mui/material";

export default function EmptyMessage() {
  return (
    <Alert severity="info" variant="outlined">
      <AlertTitle>Aucune photo dans la phototèque</AlertTitle>
      Utilisez le bouton Appareil photo pour enregistrer une nouvelle image.
    </Alert>
  );
}
