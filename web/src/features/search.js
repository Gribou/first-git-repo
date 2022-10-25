import { useReducer, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCurrentProfile } from "features/profile";
import { useSearchQuery, generateErrorMessage } from "api";
import { DEBUG, BACKEND_HOST } from "constants";

const MAX_API_RESULTS = 6;

function format_api_results(data, api_type) {
  if (api_type === "DIAPASON") {
    if (data?.results) {
      return {
        count: data?.count || 0,
        results: data?.results
          ?.slice(0, MAX_API_RESULTS)
          ?.filter(({ global_search }) => global_search)
          ?.map(({ global_search }) => global_search),
      };
    } else if (Array.isArray(data)) {
      return {
        count: data?.length || 0,
        results: (data || [])
          ?.slice(0, MAX_API_RESULTS)
          ?.filter(({ global_search }) => global_search)
          ?.map(({ global_search }) => global_search),
      };
    } else {
      return {
        count: 0,
        results: [],
      };
    }
  } else if (api_type === "MEDIAWIKI") {
    return {
      count: data?.[1]?.length || 0,
      results: data?.[1]
        ?.slice(0, MAX_API_RESULTS)
        ?.map((title, i) => ({ title, url: data?.[3]?.[i] })),
    };
  } else {
    console.warn("Unknown API type", api_type);
    return {};
  }
}

async function makeApiCall(url, params, api_type, dispatch) {
  try {
    dispatch({ type: "pending" });
    const response = await axios.request({
      params:
        api_type === "MEDIAWIKI"
          ? { action: "opensearch", origin: "*", ...params }
          : params,
      url,
      withCredentials: false,
      baseURL: BACKEND_HOST,
    });
    dispatch({
      type: "success",
      data: format_api_results(response.data, api_type),
    });
  } catch (error) {
    const { response } = error;
    if (DEBUG) {
      console.error(error, response);
    }
    dispatch({ type: "failure", error: generateErrorMessage(error) });
  }
}

function api_result_reducer(state, action) {
  switch (action.type) {
    case "reset":
      return [...action.data];
    case "pending":
      return state?.map((item, i) =>
        i === action.index ? { ...item, isLoading: true } : item
      );
    case "success":
      return state?.map((item, i) =>
        i === action.index
          ? { ...item, isLoading: false, data: action.data, isSuccess: true }
          : item
      );
    case "failure":
      return state?.map((item, i) =>
        i === action.index
          ? { ...item, isLoading: false, error: action.error, isError: true }
          : item
      );
    default:
      throw new Error();
  }
}

const useApiCall = (api_endpoints, params) => {
  const current_search = useRef();
  const [result, dispatch] = useReducer(api_result_reducer, api_endpoints);

  useEffect(() => {
    if (params?.search !== current_search.current) {
      //trigger search only once when params changes
      current_search.current = params?.search;
      dispatch({ type: "reset", data: api_endpoints });
      api_endpoints?.map(({ url, api_type }, index) =>
        makeApiCall(url, params, api_type, (action) =>
          dispatch({ ...action, index })
        )
      );
    }
  }, [params]);

  //how to manage errors ? just log in console and hide in display ?
  // do not show results if error or no result
  // order results by count (less first)
  const pretty_result = result
    ?.filter(({ isError, data }) => !isError && !!data?.count)
    ?.sort((a, b) => a?.data?.count - b?.data?.count);
  return {
    data: pretty_result,
    isEmpty: !pretty_result?.length,
    isLoading: result.some(({ isLoading }) => isLoading),
    isSuccess: result.every(({ isSuccess }) => isSuccess),
  };
};

export function useSearchResults() {
  const { search } = useParams();
  const { current_profile } = useCurrentProfile();
  const { data: profile_search, ...status } = useSearchQuery({
    search,
    profile: current_profile?.url,
  });
  const { data: global_search, ...global_status } = useApiCall(
    current_profile?.search_api_endpoints,
    { search }
  );

  return {
    ...(profile_search || {}),
    global: global_search,
    isEmpty: profile_search?.is_empty && global_status?.isEmpty,
    isLoading: status?.isLoading || global_status?.isLoading,
    isError: status?.isError,
    isSuccess: status?.isSuccess,
  };
}
