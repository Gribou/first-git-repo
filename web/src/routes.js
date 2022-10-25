import React from "react";
import { URL_ROOT } from "constants";
import {
  NotFoundPage,
  TabletFilePage,
  TabletFolderPage,
  TabletGalleryPage,
  TabletProfilePage,
  TabletSearchPage,
} from "components/pages";

export const TABLET_ROUTES = {
  file_in_profile: {
    path: `${URL_ROOT}/:profile/file/:file`,
    element: <TabletFilePage />,
  },
  folder_in_profile: {
    path: `${URL_ROOT}/:profile/folder/:folder`,
    element: <TabletFolderPage />,
  },
  gallery_in_profile: {
    path: `${URL_ROOT}/:profile/gallery`,
    element: <TabletGalleryPage />,
  },
  search_in_profile: {
    path: `${URL_ROOT}/:profile/search/:search`,
    element: <TabletSearchPage />,
  },
  profile: {
    path: `${URL_ROOT}/:profile`,
    element: <TabletProfilePage />,
  },
  default_profile: {
    path: `${URL_ROOT}/`,
    element: <TabletProfilePage />,
  },
};

export const ERROR_ROUTES = {
  not_found: {
    path: "*",
    element: <NotFoundPage />,
  },
};

export const ROUTES = TABLET_ROUTES;
