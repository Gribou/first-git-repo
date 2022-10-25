import React from "react";
import { Stack, Box } from "@mui/material";
import { Viewer } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { searchPlugin } from "@react-pdf-viewer/search";
import renderError from "./renderError";
import renderLoader from "./renderLoader";
import renderToolbar from "./renderToolbar";
import NavigationBar from "./NavigationBar";
import ToolbarContainer from "./ToolbarContainer";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "@react-pdf-viewer/search/lib/styles/index.css";

function usePdfProps(url = "") {
  const { page, search } =
    url
      ?.split("#")?.[1]
      ?.split("&")
      ?.reduce((params, hash) => {
        let [key, val] = hash.split("=");
        return Object.assign(params, { [key]: decodeURIComponent(val) });
      }, {}) || {};

  return {
    initialPage: Math.max(0, page && page - 1),
    keyword: search,
  };
}

export default function PdfViewer({ fileName, fileUrl, ...props }) {
  const { initialPage, keyword } = usePdfProps(fileUrl);
  const toolbarPluginInstance = toolbarPlugin();
  const searchPluginInstance = searchPlugin({ keyword });

  return (
    <Stack
      {...props}
      sx={{
        overflow: "hidden",
        width: "100%",
        maxWidth: "md",
        mx: "auto",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          maxWidth: "md",
          mx: "auto",
        }}
      >
        <NavigationBar fileName={fileName} />
        <ToolbarContainer toolbarPluginInstance={toolbarPluginInstance}>
          {renderToolbar}
        </ToolbarContainer>
      </Box>
      <Box
        sx={{
          mt: "84px", //toolbars height
          width: "100%",
          height: "1000px", //height must be fixed for gotopage buttons and initialPage to work
          maxHeight: "100%",
          overflowY: "auto",
          "& .rpv-search__highlight": {
            bgcolor: "primary.dark",
            borderRadius: 0,
          },
        }}
      >
        <Viewer
          theme="dark"
          fileUrl={fileUrl}
          renderError={renderError}
          renderLoader={renderLoader}
          plugins={[toolbarPluginInstance, searchPluginInstance]}
          initialPage={initialPage}
        />
      </Box>
    </Stack>
  );
}
