import axios from "axios";
import { returnErrors } from "./messages";

import {
  FILE_UPLOADING,
  PUBLIC_UPLOADED,
  UPLOAD_ERROR,
  GET_PUBLIC,
} from "./types";

// CHECK TOKEN & LOAD USER
export const uploadPublic = (file, seriesName, seriesType, note) => (
  dispatch
) => {
  //File Uploading
  dispatch({ type: FILE_UPLOADING });

  const formData = new FormData();
  formData.set("seriesType", seriesType);
  formData.set("seriesName", seriesName);
  formData.set("note", note);
  formData.append("file", file);

  const config = { headers: { "content-type": "multipart/form-data" } };

  axios
    .post("/api/upload/public", formData, config)
    .then((res) => {
      dispatch({
        type: PUBLIC_UPLOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: UPLOAD_ERROR });
    });
};

export const getPublic = () => (dispatch) => {
  axios
    .get("/api/upload/public")
    .then((res) => {
      dispatch({
        type: GET_PUBLIC,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: UPLOAD_ERROR });
    });
};
