import React from "react";
import { Stack } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";

import { BACKEND_HOST } from "constants";
import PdfViewer from "./PdfViewer";

function useCurrentFile() {
  const { file } = useParams();
  const { hash } = useLocation();

  return { file, hash };
}

export default function FilePage() {
  const { file, hash } = useCurrentFile();

  return (
    <Stack
      sx={{
        verticalAlign: "middle",
        overflowY: "hidden",
        alignSelf: "flex-start",
        width: "100%",
      }}
    >
      {file && (
        <PdfViewer
          fileName={file}
          fileUrl={`${BACKEND_HOST}/media/files/${file}${hash}`}
        />
      )}
    </Stack>
  );
}
