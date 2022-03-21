
import { 
    GET_EVENTS,
    GET_SINGLE_EVENT,
    GET_ALL_ATTENDEES

  } from '../actions/types';
  
  const initialState = {
    events: [],
    count: 0,
    event: [],
    attendees: []

  };



  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_EVENTS:
        if (action.payload)
        return {
          ...state,
          events: action.payload.rows,
          count: action.payload.count
        };
        return state
        
         case GET_SINGLE_EVENT:
        return {
            ...state,
            event: action.payload
        };
        case GET_ALL_ATTENDEES:
          return {
              ...state,
              attendees: action.payload
          };
        
      default:
        return state;
    }
  }
  