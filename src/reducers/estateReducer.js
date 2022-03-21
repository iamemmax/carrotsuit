import { GET_HOUSES, ADD_HOUSE, GET_SINGLE_HOUSE, EDIT_HOUSE, DELETE_HOUSE } from '../actions/types';

const initialState = {
  houses: [],
  count: 0,
  house: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HOUSES:
      if (action.payload)
      return {
        ...state,
        houses: action.payload.rows,
        count: action.payload.count
      };
      return state
    case ADD_HOUSE:
      return {
        ...state,
        houses: state.houses.concat(action.payload)
      };
    case GET_SINGLE_HOUSE:
      return {
        ...state,
        house: action.payload
      };
    case EDIT_HOUSE:
      const { payload } = action;
      return {
        ...state,
        houses: state.houses.map(house =>
          house.id === payload.id ? Object.assign({}, house, payload) : house
        )
      };
      case DELETE_HOUSE:
      return {
        ...state,
        houses: state.houses.filter(house => house.id !== action.payload)
      };
    default:
      return state;
  }
}
