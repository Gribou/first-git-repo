import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { URL_ROOT } from "constants";

import { ERROR_ROUTES, ROUTES } from "routes";
import Layout from "components/Layout";

export default function MainRouting() {
  return (
    <Routes>
      <Route path={`${URL_ROOT}/`} element={<Layout />}>
        {Object.values(ROUTES).map((props, i) => (
          <Route key={i} {...props} />
        ))}
        {Object.values(ERROR_ROUTES).map((props, i) => (
          <Route key={i} {...props} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.default_profile.path} />} />
    </Routes>
  );
}
