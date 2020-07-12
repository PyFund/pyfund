import axios from "axios";
import { returnErrors } from "./messages";

import {
  FILE_UPLOADING,
  PUBLIC_UPLOADED,
  UPLOAD_ERROR,
  GET_PUBLIC,
  DELETE_PUBLIC,
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
    .post("/api/series/public", formData, config)
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
    .get("/api/series/public")
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

export const deletePublic = (id) => (dispatch) => {
  console.log("Received id" + id);
  axios
    .delete(`api/series/public/${id}/`)
    .then((res) =>
      dispatch({
        type: DELETE_PUBLIC,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
