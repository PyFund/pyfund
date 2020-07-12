import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import pathname from "./pathname";
import upload from "./upload";

export default combineReducers({
  errors,
  messages,
  auth,
  pathname,
  upload,
});
