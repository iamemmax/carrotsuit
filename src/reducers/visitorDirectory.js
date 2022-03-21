import { GET_DIR, ADD_DIR, EDIT_DIR, DELETE_DIR, GET_ONE_DIR } from '../actions/types';

const initialState = {
  directory: [],
  count: 0,
  dirRecord: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DIR:
      if (action.payload)
      return {
        ...state,
        directory: action.payload.rows,
        count: action.payload.count
      };
      return state
    case ADD_DIR:
      return {
        ...state,
        directory: state.directory.concat(action.payload)
      };
    case GET_ONE_DIR:
      return {
        ...state,
        dirRecord: action.payload
      };
    case EDIT_DIR:
      const { payload } = action;
      return {
        ...state,
        directory: state.directory.map(dir =>
          dir.id === payload.id ? Object.assign({}, dir, payload) : dir
        )
      };
      case DELETE_DIR:
      return {
        ...state,
        directory: state.directory.filter(dir => dir.id !== action.payload)
      };
    default:
      return state;
  }
}
