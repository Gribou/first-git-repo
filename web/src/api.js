import axios from "axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import { endpoints as gallery, GALLERY_TAG } from "features/gallery/api";
import { API_URI, DEBUG } from "./constants";

axios.defaults.baseURL = `${API_URI}/`;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = `application/json`;

const axiosBaseQuery = () => async (call) => {
  try {
    const result = await axios(call);
    return { data: result.data };
  } catch (error) {
    const { response } = error;
    if (DEBUG) {
      console.error(error, response);
    }
    if (response && response.status === 503) {
      //503 Service Unavailable
      window.location.reload();
      return;
    }
    return { error: generateErrorMessage(error) };
  }
};

export function generateErrorMessage(error) {
  const { response, message } = error;
  if (response) {
    if (response.data) {
      if (
        typeof response.data === "string" ||
        response.data instanceof String
      ) {
        return {
          non_field_errors: `${response.status} - ${response.statusText}`,
        };
      } else {
        return response.data;
      }
    } else if (response.status >= 500) {
      return {
        non_field_errors: `Erreur serveur (${response.status} ${response.statusText}) : rafraîchissez la page ou réessayez plus tard.`,
      };
    } else {
      return {
        non_field_errors: `${response.status} - ${response.statusText}`,
      };
    }
  } else {
    return {
      non_field_errors: `Erreur serveur (${message}) : rafraîchissez la page ou réessayez plus tard.`,
    };
  }
}

const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => "profile/",
    }),
    search: builder.query({
      query: (params) => ({
        url: "search/",
        params,
      }),
    }),
  }),
});

export const { useProfileQuery, useSearchQuery } = api;

export default api
  .enhanceEndpoints({ addTagTypes: [GALLERY_TAG] })
  .injectEndpoints({
    endpoints: gallery,
    overrideExisting: false,
  });
