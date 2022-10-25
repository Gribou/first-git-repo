import React from "react";
import { Alert } from "@mui/material";

export default function renderError(error) {
  let message = "";
  console.error(error);
  switch (error.name) {
    case "InvalidPDFException":
      message = "Le document est invalide ou corrompu.";
      break;
    case "MissingPDFException":
      message = "Le document est introuvable.";
      break;
    case "UnexpectedResponseException":
      message = "Réponse inattendu du serveur.";
      break;
    default:
      message = "Le chargement du document a échoué.";
      break;
  }

  return (
    <Alert severity="error" variant="filled" sx={{ m: 2 }}>
      {message}
    </Alert>
  );
}
