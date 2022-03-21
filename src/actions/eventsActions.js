import axios from 'axios';
import Toast from '../components/common/SwalToaste';
import jwt_decode from 'jwt-decode';
import download from 'downloadjs'

import {
  REGISTER_STAFF,
  EDIT_STAFF,
  TOGGLE_LOADER,
  GET_ERRORS,
  GET_STAFF,
  GET_SINGLE_STAFF,
  DELETE_STAFF,
  SET_CURRENT_USER,
  ADD_COMPANY,
  GET_SINGLE_COMPANY,
  DELETE_COMPANY,
  GET_COMPANIES,
  EDIT_COMPANY,
  ADD_HOUSE,
  GET_SINGLE_HOUSE,
  DELETE_HOUSE,
  GET_HOUSES,
  EDIT_HOUSE,
  GET_ATTENDANCE,
  EDIT_WORKSPACE_COMPANY,
  GET_DEPARTMENT,
  GET_MOBILE_STAFF,
  GET_EVENTS,
  GET_SINGLE_EVENT,
  GET_ALL_ATTENDEES
  // GET_COMPANY
} from './types';
import setAuthToken from '../utils/setAuthToken';
import Swal from 'sweetalert2';


export const createEvent = (data) => dispatch => {
    console.log('jjjj')
      dispatch({ type: TOGGLE_LOADER });
      return axios.post(`/api/v1/events/create`, data )
      .then( res => {
        console.log(res.data.message, 'jjjj')
    
        Toast.fire({
          icon: 'success',
          title: res.data.message
        });
        dispatch({ type: TOGGLE_LOADER });
          return res.data.message
        })
        .catch(err =>{
          dispatch({ type: TOGGLE_LOADER });
          Toast.fire({
            icon: 'opps!',
            title: err.response.data.message
          });
            console.log(err.response.data, 'errorer staff signoutt')
           throw err
          })
    }
    
    
    
    
    /**
     * get all all company staffs
     *
     *@return  obj ...returns arrays of staffs
     */
     export const getEvents = (page = 1, limit = 10) => dispatch => {

        console.log('johnsoooooo')
      dispatch({ type: GET_EVENTS });
      axios
        .get(`/api/v1/events/get/events?page=${page}&limit=${limit}`)
        .then(result => {
          console.log(result.data.data.rows, 'hjjjjjjjjjjjjjjjjjjjjjjj')
          if (result.data.data) {
            dispatch({
              type: GET_EVENTS,
              payload: result.data.data
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    };


/**
 *
 * @param {*} id staff id
 * @return obj --staff obj
 */
export const getOneEvent = id => dispatch => {

    console.log(id, 'popopopp')
  dispatch({ type: GET_SINGLE_EVENT });
  return axios
    .get(`/api/v1/events/events/single/${id}`)
    .then(result => {
      const { data } = result;

      console.log(data, 'kkk')
      dispatch({
        type: GET_SINGLE_EVENT,
        payload: data.data
      });
      return data.data;
    })
    .catch(err => {
      console.log(err);
    });
};


/**
 *
 * @param {*} id staff id
 * @param {*} credentials edit credentials
 * @return -- updated staff obj
 */
 export const editEvent = (id, credentials) => dispatch => {
  dispatch({ type: TOGGLE_LOADER });
  return axios
    .put(`/api/v1/events/edit-event/${id}`, credentials)
    .then(result => {
      
      console.log(result, 'loss')
      dispatch({
        type: EDIT_STAFF,
        payload: result.data.data
      });
      Toast.fire({
        icon: 'success',
        title: 'Changes saved'
      });
      dispatch({ type: TOGGLE_LOADER });
      return result.data.meessage;
    })
    .catch(err => {
      dispatch({ type: TOGGLE_LOADER });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};



    /**
     * get all all company staffs
     *
     *@return  obj ...returns arrays of staffs
     */
     export const getAllAttendees = (page = 1, limit = 10) => dispatch => {

      console.log('mibjj')
    dispatch({ type: GET_ALL_ATTENDEES });
    axios
      .get(`/api/v1/events/get/all/attendees?page=${page}&limit=${limit}`)
      .then(result => {
        console.log(result.data.data.rows, 'llllllllllllliiiiiii')
        if (result.data.data) {
          dispatch({
            type: GET_ALL_ATTENDEES,
            payload: result.data.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };



  export const createEventTicket = (data) => dispatch => {
    console.log('jjjj')
      dispatch({ type: TOGGLE_LOADER });
      return axios.post(`/api/v1/events/ticket/create`, data )
      .then( res => {
        console.log(res.data.message, 'jjjj')
    
        Toast.fire({
          icon: 'success',
          title: res.data.message
        });
        dispatch({ type: TOGGLE_LOADER });
          return res.data.message
        })
        .catch(err =>{
          dispatch({ type: TOGGLE_LOADER });
          Toast.fire({
            icon: 'opps!',
            title: err.response.data.message
          });
            console.log(err.response.data, 'errorer staff signoutt')
           throw err
          })
    }



  export const publishEvent = (data) => dispatch => {
    console.log('jjjj')
      dispatch({ type: TOGGLE_LOADER });
      return axios.post(`/api/v1/events/publish-event`, data )
      .then( res => {
        console.log(res.data.message, 'jjjj')
    
        Toast.fire({
          icon: 'success',
          title: res.data.message
        });
        dispatch({ type: TOGGLE_LOADER });
          return res.data.message
        })
        .catch(err =>{
          dispatch({ type: TOGGLE_LOADER });
          Toast.fire({
            icon: 'opps!',
            title: err.response.data.message
          });
            console.log(err.response.data, 'errorer staff signoutt')
           throw err
          })
    }


  


    export const bulkExportEvents = async (currentUser) => {

      console.log('hetuwjjkw')

      try{
    
    
    
        // const tempLink = document.createElement('a')
        // tempLink.href = 'http://localhost:5000/api/v1/users/export?user=${currentUser}'
        // tempLink.click()
    
    
        const res = await axios.get(`/api/v1/events/export/events?user=${currentUser}`)
        if(res){
    
          console.log(res.data, 'jsjkjsksjk')
          download(res.data, new Date().toLocaleDateString() + '-data.csv')
        }else{
          alert('data not found')
        }
      }catch(err){
        console.log(err, 'sjskkss')
      }

    }




