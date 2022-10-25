import React from "react";
import { Container, Tooltip, IconButton } from "@mui/material";
import {
  MagnifyPlusOutline,
  MagnifyMinusOutline,
  ChevronUp,
  ChevronDown,
  Fullscreen,
} from "mdi-material-ui";

//inner span is needed for when IconButton is disabled
const makeButton = (icon, label, { isDisabled, ...props }) => (
  <Tooltip title={label}>
    <span>
      <IconButton {...props} size="small" color="inherit" disabled={isDisabled}>
        {icon}
      </IconButton>
    </span>
  </Tooltip>
);

export default function renderToolbar(slots) {
  const {
    CurrentPageInput,
    EnterFullScreen,
    GoToNextPage,
    GoToPreviousPage,
    NumberOfPages,
    Zoom,
    ZoomIn,
    ZoomOut,
  } = slots;
  return (
    <Container className="rpv-toolbar" disableGutters>
      <div className="rpv-toolbar__left">
        <div className="rpv-toolbar__item">
          <GoToPreviousPage>
            {(props) => makeButton(<ChevronUp />, "Page précédente", props)}
          </GoToPreviousPage>
        </div>
        <div className="rpv-toolbar__item">
          <CurrentPageInput /> / <NumberOfPages />
        </div>
        <div className="rpv-toolbar__item">
          <GoToNextPage>
            {(props) => makeButton(<ChevronDown />, "Page suivante", props)}
          </GoToNextPage>
        </div>
      </div>
      <div className="rpv-toolbar__center">
        <div className="rpv-toolbar__item">
          <ZoomOut>
            {(props) =>
              makeButton(<MagnifyMinusOutline />, "Zoom arrière", props)
            }
          </ZoomOut>
        </div>
        <div className="rpv-toolbar__item">
          <Zoom />
        </div>
        <div className="rpv-toolbar__item">
          <ZoomIn>
            {(props) => makeButton(<MagnifyPlusOutline />, "Zoom avant", props)}
          </ZoomIn>
        </div>
      </div>
      <div className="rpv-toolbar__right">
        <div className="rpv-toolbar__item">
          <EnterFullScreen>
            {(props) => makeButton(<Fullscreen />, "Plein écran", props)}
          </EnterFullScreen>
        </div>
      </div>
    </Container>
  );
}
