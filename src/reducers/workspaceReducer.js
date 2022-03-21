import { GET_COMPANIES, ADD_COMPANY, GET_SINGLE_COMPANY, EDIT_WORKSPACE_COMPANY, DELETE_COMPANY } from '../actions/types';

const initialState = {
  companies: [],
  count: 0,
  company: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANIES:
      if (action.payload)
      return {
        ...state,
        companies: action.payload.rows,
        count: action.payload.count
      };
      return state
    case ADD_COMPANY:
      return {
        ...state,
        companies: state.companies.concat(action.payload)
      };
    case GET_SINGLE_COMPANY:
      return {
        ...state,
        company: action.payload
      };
    case EDIT_WORKSPACE_COMPANY:
      const { payload } = action;
      return {
        ...state,
        companies: state.companies.map(company =>
          company.id === payload.id ? Object.assign({}, company, payload) : company
        )
      };
      case DELETE_COMPANY:
      return {
        ...state,
        companies: state.companies.filter(company => company.id !== action.payload)
      };
    default:
      return state;
  }
}
