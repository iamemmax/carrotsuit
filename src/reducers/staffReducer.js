import { GET_STAFF, REGISTER_STAFF, 
  GET_SINGLE_STAFF, 
  EDIT_STAFF, 
  DELETE_STAFF, 
  GET_ATTENDANCE,
  GET_DEPARTMENT,
  GET_MOBILE_STAFF,
} from '../actions/types';

const initialState = {
  staffs: [],
  count: 0,
  staff: null,
  attendance: [],
  departments:[],
  mobStaffs: [],
  mobStaffsCount: 0,
};


export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STAFF:
      if (action.payload)
      return {
        ...state,
        staffs: action.payload.rows,
        count: action.payload.count
      };
      return state
      case GET_DEPARTMENT:
        if (action.payload)
        return {
          ...state,
          departments: action.payload.data,
          // count: action.payload.count
        };
        return state
      case GET_ATTENDANCE:
      if (action.payload)
      return {
        ...state,
        attendance: action.payload.rows,
        count: action.payload.count
      };
      return state
    case REGISTER_STAFF:
      return {
        ...state,
        staffs: state.staffs.concat(action.payload)
      };
    case GET_SINGLE_STAFF:
      return {
        ...state,
        staff: action.payload
      };
    case EDIT_STAFF:
      const { payload } = action;
      return {
        ...state,
        staffs: state.staffs.map(staff =>
          staff.id === payload.id ? Object.assign({}, staff, payload) : staff
        )
      };
      case DELETE_STAFF:
      return {
        ...state,
        staffs: state.staffs.filter(staff => staff.id !== action.payload)
      };
      case GET_MOBILE_STAFF:
        if (action.payload)
        return {
          ...state,
          mobStaffs: action.payload.rows[0],
          mobStaffsCount: action.payload.count
        };
        return state
    default:
      return state;
  }
}
