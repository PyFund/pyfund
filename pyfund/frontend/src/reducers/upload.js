import {
  FILE_UPLOADING,
  PUBLIC_UPLOADED,
  UPLOAD_ERROR,
  GET_PUBLIC,
  DELETE_PUBLIC,
} from "../actions/types";

const initialState = {
  isLoading: false,
  publicSeries: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FILE_UPLOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PUBLIC_UPLOADED:
      return {
        ...state,
        isLoading: false,
        publicSeries: [...state.publicSeries, action.payload],
      };
    case GET_PUBLIC:
      return {
        ...state,
        publicSeries: action.payload,
      };
    case DELETE_PUBLIC:
      return {
        ...state,
        publicSeries: state.publicSeries.filter(
          (publicSeries) => publicSeries.id !== action.payload
        ),
      };
    case UPLOAD_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
