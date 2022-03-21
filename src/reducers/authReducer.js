import isEmpty from "../validations/is-empty";

import { SET_CURRENT_USER , TOGGLE_LOADER, GET_ERRORS} from "../actions/types";

const initialState = {
isAuthenticated: false,
user: {},
isLoading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case TOGGLE_LOADER: 
    return {
      ...state,
      isLoading: !state.isLoading
    };
    default:
      return state;
  }
}
export const setAuthUser = currentUser => {
  initialState.user = currentUser
  initialState.isAuthenticated = true;

}
export const getAuthStatus = () => initialState.isAuthenticated
