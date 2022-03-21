import { GET_APPOINTMENTS } from '../actions/types';

const initialState = {
  appointments: [],
  count: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload.rows,
        count: action.payload.count
      };

    default:
      return state;
  }
}
