import { SET_PATHNAME } from "../actions/types";

const initialState = {
  pathname: "/",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PATHNAME:
      return {
        ...state,
        pathname: action.pathname,
      };
    default:
      return state;
  }
}
