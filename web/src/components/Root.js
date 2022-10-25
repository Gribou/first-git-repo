import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Worker } from "@react-pdf-viewer/core";
import { ErrorBoundary } from "react-error-boundary";
import { Alert } from "@mui/material";

import { BACKEND_HOST } from "constants";
import MainRouting from "components/Routing";

const pdfWorker = `${BACKEND_HOST}/static/front/pdfjs-dist/legacy/build/pdf.worker.min.js`;

function Fallback({ error }) {
  return <Alert severity="error">{error.message}</Alert>;
}

export default function Root({ store }) {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Provider store={store}>
        <Worker workerUrl={pdfWorker}>
          <BrowserRouter>
            <MainRouting />
          </BrowserRouter>
        </Worker>
      </Provider>
    </ErrorBoundary>
  );
}
