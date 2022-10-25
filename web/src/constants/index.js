export const DEBUG = `${process.env.REACT_APP_DEBUG}` === "1";
export const PUBLIC_URL = `${process.env.PUBLIC_URL}`;
export const URL_ROOT = PUBLIC_URL === "." ? "" : PUBLIC_URL;

export const BACKEND_HOST = `${process.env.REACT_APP_BACKEND_HOST}`;
export const API_URI = `${BACKEND_HOST}/api`;
