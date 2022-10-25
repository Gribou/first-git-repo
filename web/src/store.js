import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { logger } from "redux-logger";

import { DEBUG } from "./constants";
import messagesReducer from "features/messages";
import api from "api";

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, ...(DEBUG ? [logger] : [])),
});

setupListeners(store.dispatch);

export default { store };
