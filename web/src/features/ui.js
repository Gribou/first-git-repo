import { useState, useEffect } from "react";
import { PUBLIC_URL, DEBUG } from "../constants";

const AUTO_REFRESH_DELAY_IN_MS = 60 * 60 * 1000; //1h

export function getStaticFile(path) {
  return `${PUBLIC_URL}${DEBUG ? "" : "/static"}${path}`;
}

export function useAutoRefresh() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, AUTO_REFRESH_DELAY_IN_MS);
    return () => clearTimeout(timer);
  }, []);
}

export function useDialog() {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);

  const close = () => setOpen(false);

  return { isOpen, open, close };
}

export function useMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = () => Boolean(anchorEl);
  const open = (event) => setAnchorEl(event.currentTarget);
  const close = () => setAnchorEl(null);
  return { isOpen, anchor: anchorEl, open, close };
}
