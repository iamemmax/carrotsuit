import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setAuthUser } from '../reducers/authReducer'

import { GET_ERRORS, SET_CURRENT_USER, TOGGLE_LOADER } from "./types";

/**
 * @desription User registration
 */
export const registerUser = (userData, history) => dispatch => {
  dispatch({type: TOGGLE_LOADER})
  axios
    .post("api/v1/users/sign-up", userData)
    .then(res => {
      console.log(res, 'jjjjjjjjjjjjjjjjjjj')
      dispatch({type: TOGGLE_LOADER})
      dispatch({
        type: GET_ERRORS,
        payload:   'Successfull Registration'
        
      })
      history.push("login")
    })
    .catch(err => {
      console.log(err.response.data)
      dispatch({type: TOGGLE_LOADER})
      dispatch({
        type: GET_ERRORS,
        payload:   err.response.data.message
        
      })
    }
  );
};

/**
 * @description Login and get user token
 */
export const loginUser = (userData, history, from) => dispatch => {
  dispatch({type: TOGGLE_LOADER})
  axios
    .post("/api/v1/users/sign-in", userData)
    .then(res => {
      // Save token to localStorage
      const { token } = res.data;
      // Set token in local storage
      localStorage.setItem("jwtToken", token);
      // Set token in authorization header
      console.log(token, 'token kay')
      setAuthToken(token);
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      // history.push(from.pathname || from.pathName);
      dispatch({type: TOGGLE_LOADER})
    })
    .catch(error => {
      console.log(error.response.data)
      dispatch({type: TOGGLE_LOADER})
      dispatch({
        type: GET_ERRORS,
        payload:    error.response.data
        ? error.response.data.message
        : error.message,
      })
    }
  );
};
export const verifyToken = token => {
  axios.get(`/api/v1/users/verify-token/${token}`)
  .then(result => {
    const {data} = result;
    if(data.isAuthenticated){
      const decoded = jwt_decode(token);
      // Set current user
      setAuthUser(decoded)

      //history.push(from.pathname || from.pathName);
    }
  })
}
/**
 * @description Login and get user token
 */
export const loginAdmin = (userData, history, from) => dispatch => {
  dispatch({type: TOGGLE_LOADER})
  return axios
    .post("/api/v1/admin/login", userData)
    .then(res => {
      // Save token to localStorage
      const { token } = res.data;
      // Set token in local storage
      localStorage.setItem("jwtToken", token);
      // Set token in authorization header
      setAuthToken(token);
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      history.push(from.pathname || from.pathName);
      dispatch({type: TOGGLE_LOADER})
      return res.data
    })
    .catch(err => {
      dispatch({type: TOGGLE_LOADER})
      throw err
    }
  );
};
export const getPlan = name => {
  return axios.get(`/api/v1/plans/${name}`)
  .then(result => {
    console.log(result.data.data)
    return result.data.data;
  })
  .catch(console.log)
}
export const getAppCountries = () => {
  return axios.get("/api/v1/app-country")
  .then(result => {
    return result.data.data;
  })
  .catch(console.log)
}

/**
 * @description Set logged in user
 */
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

/**
 * @description Log user out
 */
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
