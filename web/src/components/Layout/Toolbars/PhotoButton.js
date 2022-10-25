import React, { Fragment } from "react";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { Camera } from "mdi-material-ui";
import { usePictureImport } from "features/gallery/hooks";

export default function PhotoButton({ ...props }) {
  const [importPicture, { isLoading }] = usePictureImport();

  const handleChange = (e) => {
    if (e.target.files[0] && !isLoading) {
      importPicture(e.target.files[0]);
    }
  };

  return (
    <Tooltip title="Prendre une photo">
      <IconButton
        component="label"
        color="inherit"
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          <Fragment>
            <Camera />
            <input
              hidden
              type="file"
              accept="image/*;capture=camera"
              onChange={handleChange}
            />
          </Fragment>
        )}
      </IconButton>
    </Tooltip>
  );
}
