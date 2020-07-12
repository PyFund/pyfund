import { SET_PATHNAME } from "./types";

// CREATE MESSAGE
export const setPathname = (pathname) => {
  return {
    type: SET_PATHNAME,
    pathname,
  };
};
