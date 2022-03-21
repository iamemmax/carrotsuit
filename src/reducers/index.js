import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import settingsReducer from "./settingsReducer";
import visitorReducer from "./visitorReducer";
import staffReducer from './staffReducer';
import appointmentsReducer from './appointmentsReducer';
import workspaceReducer from "./workspaceReducer";
import estateReducer from "./estateReducer";
import directories from "./visitorDirectory";
import eventsReducers from './eventsReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  settings: settingsReducer,
  visitor: visitorReducer,
  staff: staffReducer,
  appointment: appointmentsReducer,
  workspace: workspaceReducer,
  estate: estateReducer,
  events: eventsReducers,
  directories
});
