import {
  GET_LOCATIONS,
  EDIT_LOCATION,
  ADD_LOCATION,
  DELETE_LOCATION,
  GET_COMPANY,
  GET_CONFIGS,
  EDIT_COMPANY,
  EDIT_CONFIG,
  GET_FIELDS,
  ADD_CUSTOM_FIELDS,
  GET_STATS,
  DELETE_CUSTOM_FIELD,
  ADD_CUSTOM_OPTION_FIELDS,
  ADD_FIELD_OPTION,
  DELETE_CUSTOM_FIELD_OPTION,
  GET_COMPANY_PURPOSE,
  GET_VISIT_PURPOSES,
  GET_DEFAULT_VISIT_PURPOSES,
  GET_SLIDES
} from '../actions/types';

const initialState = {
  locations: [],
  configs: {},
  company: {},
  fields: [],
  stats: {},
  purpose:[],
  visitPurposes: [],
  defaultVisitPurposes: [],
  slides: []
 
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.locations
      };
    case ADD_LOCATION:
      return {
        ...state,
        locations: state.locations.concat(action.location)
      };
    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(location => location.id !== action.locationId)
      };
    case EDIT_LOCATION:
      return {
        ...state,
        locations: state.locations.map(location => {
          if (location.id === action.payload.id) {
            return Object.assign({}, location, action.payload);
          } else {
            return location;
          }
        })
      };
    case GET_COMPANY:
      return {
        ...state,
        company: action.company
      };
    case EDIT_COMPANY:
      return {
        ...state,
        company: action.payload
      };
    case GET_CONFIGS:
      return {
        ...state,
        configs: action.configs
      };
    case EDIT_CONFIG:
      return {
        ...state,
        configs: action.configs
      };
    case GET_FIELDS:
      return {
        ...state,
        fields: action.payload
      };
    case ADD_CUSTOM_OPTION_FIELDS:
      return {
        ...state,
        fields: state.fields.concat(action.payload)
      };
    case ADD_CUSTOM_FIELDS:
      return {
        ...state,
        fields: state.fields.concat(action.payload)
      };
    case DELETE_CUSTOM_FIELD:
      return {
        ...state,
        fields: state.fields.filter(field => field.id !== action.payload)
      };
    case ADD_FIELD_OPTION:
      return {
        ...state,
        fields: state.fields.map(field =>
          field.id === action.payload.id
            ? Object.assign({}, field, { options: field.options.concat(action.payload.data) })
            : field
        )
      };
    case ADD_LOCATION:
      return {
        ...state,
        locations: state.locations.concat(action.location)
      };
    case GET_STATS:
      return {
        ...state,
        stats: action.payload
      };
      
      case GET_COMPANY_PURPOSE:
        return {
          ...state,
          purpose: action.payload
        };
      case GET_DEFAULT_VISIT_PURPOSES:
      return {
        ...state,
        defaultVisitPurposes: action.payload
      };
      case GET_VISIT_PURPOSES:
        return {
          ...state,
          visitPurposes: action.payload
        };
        case GET_SLIDES:
          return {
            ...state,
            slides: action.payload
          }
    case DELETE_CUSTOM_FIELD_OPTION:
      return {
        ...state,
        fields: state.fields.map(field =>
          field.id === action.payload.fieldId
            ? Object.assign({}, field, {
                options: field.options.filter(option => option.id !== action.payload.optionId)
              })
            : field
        )
      };
    default:
      return state;
  }
}
