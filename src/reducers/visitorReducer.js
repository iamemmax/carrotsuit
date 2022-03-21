import {
  GET_FORM_DATA,
  REGISTER_VISITOR,
  GET_VISITORS,
  GET_VISITOR,
  VISITOR_SIGN_OUT,
  DELETE_VISITOR,
  SOUGHT_STAFF,
  SET_NEW_VISITOR,
  GET_VISITOR_BY_NUMBER,
  GET_VISITORS_BY_LOCATION
} from '../actions/types';

const initialState = {
  formData: [],
  visitors: [],
  count: 0,
  newVisitor: [],
  currentVisitor: null,
  newVisitor: [],
  checkedInVisitorRetrieved: false,
  checkedInVisitor: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FORM_DATA:
      return {
        ...state,
        formData: action.payload
      };
    case GET_VISITORS:
      return {
        ...state,
        visitors: action.payload.rows,
        count: action.payload.count
      };

      case GET_VISITORS_BY_LOCATION:
        return {
          ...state,
          visitors: action.payload.visitors,
          count: action.payload.count
        };
    case REGISTER_VISITOR:
      return {
        ...state,
        //visitors: state.visitors.concat(action.payload.data),
        newVisitor: action.payload.data
      };
    case GET_VISITOR:
      return {
        ...state,
        currentVisitor: action.payload,
       
      };

      case SOUGHT_STAFF:
        return {
          ...state,
          soughtVisitor: action.payload,
         
        };
      case DELETE_VISITOR:
      return {
        ...state,
        visitors: state.visitors.filter(visitor => visitor.id !== action.payload)
      };
    case VISITOR_SIGN_OUT:
      return {
        ...state,
        visitors: state.visitors.map(element =>
          element.id === action.payload.id
            ? Object.assign({}, element, { leaving_date: action.payload.leaving_date })
            : element
        )
      };
      case SET_NEW_VISITOR:
        return {
          ...state,
          newVisitor: action.payload.data,
          loading: false
        };
      case GET_VISITOR_BY_NUMBER:
      return {
        ...state,
        checkedInVisitor: action.payload,
        loading: false
      };
        
    default:
      return state;
  }
}
