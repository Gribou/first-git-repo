import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import useElementProps from "./ElementProps";
import { useDialog } from "features/ui";
import {
  InformationOutline,
  AlertCircleOutline,
  OpenInNew,
} from "mdi-material-ui";

function useInfoDialog({ info }) {
  const { isOpen, open, close } = useDialog();

  const display = (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>Informations</DialogTitle>
      <DialogContent>
        {info?.split("<br/>").map((m, i) => (
          <DialogContentText
            key={i}
            align="justify"
            dangerouslySetInnerHTML={{
              __html: m,
            }}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
  return { open, display };
}

function useInternalOnlyDialog() {
  const { isOpen, open, close } = useDialog();

  const display = (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>Avertissement</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Cette application n&apos;est pas accessible depuis l&apos;extérieur.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
  return { open, display };
}

export default function ElementCard({ element, sx = [], ...props }) {
  const { info, ...rest } = element;
  const dialog = useInfoDialog({ info });
  const internalwarning = useInternalOnlyDialog();
  const {
    disabled,
    props: element_props,
    color,
    textColor,
    title,
    icon,
    external_indicators,
  } = useElementProps(rest);

  return (
    <Card
      sx={[
        {
          bgcolor: color,
          backgroundImage: "none",
          minWidth: { md: "20vh" },
          minHeight: { md: "20vh" },
          height: "100%",
          position: "relative",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      <CardActionArea
        {...element_props}
        disabled={disabled}
        sx={{
          p: 1,
          color: textColor,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          src={icon}
          sx={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
            p: 1,
            ml: "auto",
            mr: "auto",
          }}
        />
        <CardContent sx={{ p: 0 }}>
          <Typography
            variant="h6"
            align="center"
            display="block"
            sx={{ width: "100%" }}
            color="inherit"
            noWrap
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      {!disabled && info && (
        <IconButton
          size="small"
          style={{ position: "absolute", right: 0, top: 0 }}
          onClick={dialog.open}
        >
          <InformationOutline style={{ color: textColor }} />
        </IconButton>
      )}
      {!disabled && external_indicators && !!element_props?.href && (
        <IconButton
          disabled
          size="small"
          style={{ position: "absolute", right: 0, bottom: 0 }}
        >
          <OpenInNew style={{ color: textColor }} />
        </IconButton>
      )}
      {info && dialog.display}
      {disabled && (
        <IconButton
          size="small"
          style={{ position: "absolute", right: 0, top: 0 }}
          onClick={internalwarning.open}
        >
          <AlertCircleOutline style={{ color: textColor }} />
        </IconButton>
      )}
      {disabled && internalwarning.display}
    </Card>
  );
}
