import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = [{error: "fff"}];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {errors: action.payload};
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
