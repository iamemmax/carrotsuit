import axios from 'axios';
import Toast from '../components/common/SwalToaste';
import {
  GET_APPOINTMENTS,
  TOGGLE_LOADER,
  GET_FORM_DATA,
  GET_ERRORS,
  REGISTER_VISITOR
} from './types';

export const setAppointment = credentials => dispatch => {
  dispatch({ type: TOGGLE_LOADER });
  return axios
    .post('/api/v1/visitor/set-appointment', credentials)
    .then(res => {
      dispatch({ type: TOGGLE_LOADER });
      Toast.fire({
        icon: 'success',
        title: 'Appointment sent!'
      });
      return res;
    })
    .catch(err => {
      dispatch({ type: TOGGLE_LOADER });
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const getFormData = token => dispatch => {
  axios
    .get(`/api/v1/visitor/appointment/formdata/${token}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_FORM_DATA,
        payload: data.data
      });
    })
    .catch(err => {
      return err;
    });
};
export const getVisitorAppointment = token => {
  return axios
    .get(`/api/v1/visitor/appointment-redirect/${token}`)
    .then(result => {
      const { data } = result;
      return data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const acknowledgeAppointment = (token, credentials) => dispatch => {
  dispatch({ type: TOGGLE_LOADER });
  return axios
    .post(`/api/v1/visitor/appointment/${token}`, credentials)
    .then(res => {
      const { data } = res.data;
      dispatch({ type: TOGGLE_LOADER });
      return data;
    })
    .catch(err => {
      dispatch({ type: TOGGLE_LOADER });
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const getTodayAppointment = (page = 1, limit = 30) => dispatch => {
  return axios
    .get(`/api/v1/visitor/get/today-appointment?page=${page}&limit=${limit}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_APPOINTMENTS,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getWeekAgoAppointment = (page = 1, limit = 30) => dispatch => {
  return axios
    .get(`/api/v1/visitor/get/week-ago-appointment?page=${page}&limit=${limit}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_APPOINTMENTS,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getAllInvites = (page = 1, limit = 30) => dispatch => {
  return axios
    .get(`/api/v1/visitor/get/all-invites?page=${page}&limit=${limit}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_APPOINTMENTS,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getCustomAppointment = (from, to, page = 1, limit = 30) => dispatch => {
  return axios
    .get(
      `/api/v1/visitor/get/date-range-appointment?from=${from}&to=${to}&page=${page}&limit=${limit}`
    )
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_APPOINTMENTS,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const attendAppointment = uid => dispatch => {
  return axios
    .get(`/api/v1/visitor/attend/appointment/${uid}`)
    .then(result => {
      const { data } = result;
      return data;
    })
    .catch(err => {
      dispatch({ type: TOGGLE_LOADER });
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const searchAppointments = search => dispatch => {
  axios
    .get(`/api/v1/visitor/appointment/search/${search}`)
    .then(result => {
      dispatch({
        type: GET_APPOINTMENTS,
        payload: result.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const bulkImportVisitors = data => {
  return axios
    .post(`/api/v1/visitor/import`, data)
    .then(result => {
      console.log(result.data);
      Toast.fire({
        icon: 'success',
        title: result.data.message
      });
      return result.data;
    })
    .catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const downloadInviteSample = () => {
  axios
    .get(`/api/v1/visitor/invite-sample`)
    .then(result => {
      window.open('http://dashboard.carrotsuite.space/api/v1/visitor/invite-sample');
    })
    .catch(err => {
      console.log(err);
    });
};
export const getScheduleFormData = (token, visit_type) => dispatch => {
  axios
    .get(`/api/v1/visitor/schedule/formdata/${token}/${visit_type}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_FORM_DATA,
        payload: data.data
      });
    })
    .catch(err => {
      return err;
    });
};
export const sendSchedule = (token, data) => {
  return axios
    .post(`/api/v1/visitor/schedule/${token}`, data)
    .then(result => {
      Toast.fire({
        icon: 'success',
        title: 'Schedule sent!'
      });
      return result;
    })
    .catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const getPurposes = token => {
  return axios
    .get(`/api/v1/visitor/purpose/${token}`)
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const getClientSchedule = id => {
  return axios
    .get(`/api/v1/visitor/get/scheduled-appointment/${id}`)
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const acceptClientSchedule = id => {
  axios
    .put(`/api/v1/visitor/accept/scheduled-appointment/${id}`)
    .then(result => {
      Toast.fire({
        icon: 'success',
        title: result.data.message
      });
    })
    .catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const declineClientSchedule = id => {
  axios
    .delete(`/api/v1/visitor/decline/scheduled-appointment/${id}`)
    .then(result => {
      Toast.fire({
        icon: 'success',
        title: result.data.message
      });
    })
    .catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const exportTodayInvites = currentUser => {
  window.open(`http://dashboard.carrotsuite.space/api/v1/visitor/export?user=${currentUser}`);
};
export const addRecurringVisit = (short_id, days) => {
  axios
    .post(`/api/v1/visitor/${short_id}/recurring-visit`, { visit_days: days })
    .then(result => {
      Toast.fire({
        icon: 'success',
        title: result.data.message
      });
    })
    .catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const getRecurringVisits = short_id => {
  return axios
    .get(`/api/v1/visitor/${short_id}/recurring-visit`)
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};



export const getInviteesByLocation = (company_location, page = 1, limit = 30) => dispatch => {
  return axios
    .get(`/api/v1/visitor/location-appointment/${company_location}?page=${page}&limit=${limit}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_APPOINTMENTS,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};


export const getAppointmentByPurpose = (purpose, page = 1, limit = 30) => dispatch => {
  return axios
    .get(`/api/v1/visitor/appointment/purposes/${purpose}?page=${page}&limit=${limit}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_APPOINTMENTS,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};



// export const getInviteesByLocation = (company_location, page = 1, limit = 30) => dispatch => {
//   return axios
//     .get(`/api/v1/users/company/location/${company_location}?page=${page}&limit=${limit}`)
//     .then(result => {
//       const { data } = result;
//       console.log(data, 'kijhhyyyyyyyyyyyyyyyyyyyyyyyy')
//       dispatch({
//         type: GET_STAFF,
//         payload: data.data
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
