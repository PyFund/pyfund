import { SET_PATHNAME } from "./types";

// CREATE MESSAGE
export const setPathname = (pathname) => {
  console.log(pathname);
  return {
    type: SET_PATHNAME,
    pathname,
  };
};
