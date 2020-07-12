import {
  FILE_UPLOADING,
  PUBLIC_UPLOADED,
  UPLOAD_ERROR,
  GET_PUBLIC,
} from "../actions/types";

const initialState = {
  isLoading: false,
  public: [],
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
        public: [...state.public, action.payload],
      };
    case GET_PUBLIC:
      return {
        ...state,
        public: action.payload,
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
