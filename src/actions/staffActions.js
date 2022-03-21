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
  // GET_COMPANY
} from './types';
import setAuthToken from '../utils/setAuthToken';
import Swal from 'sweetalert2';

/**
 * @desription staff registration
 */
export const registerStaff = staffData => dispatch => {
  dispatch({ type: TOGGLE_LOADER });
  return axios
    .post('/api/v1/settings/add-staff', staffData)
    .then(result => {
      dispatch({
        type: REGISTER_STAFF,
        payload: result.data.data
      });
      Toast.fire({
        icon: 'success',
        title: result.data.message
      });
      dispatch({ type: TOGGLE_LOADER });
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: TOGGLE_LOADER });
      if (err.response.status === 401) {
        Swal.fire('oops', err.response.data);
      } else
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
export const getStaff = (page = 1, limit = 10) => dispatch => {
  dispatch({ type: GET_STAFF });
  axios
    .get(`/api/v1/users/get?page=${page}&limit=${limit}`)
    .then(result => {
      console.log(result.data.data.rows, 'hjjjjjjjjjjjjjjjjjjjjjjj')
      if (result.data.data) {
        dispatch({
          type: GET_STAFF,
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
 * @param {*} search search query
 * @return obj --arrays of staffs
 */
export const searchStaff = search => dispatch => {
  axios
    .get(`/api/v1/users/search/${search}`)
    .then(result => {
      dispatch({
        type: GET_STAFF,
        payload: result.data.data
      });
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
export const getOneStaff = id => dispatch => {
  dispatch({ type: GET_SINGLE_STAFF });
  return axios
    .get(`/api/v1/users/${id}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_SINGLE_STAFF,
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
export const editStaff = (id, credentials) => dispatch => {
  dispatch({ type: TOGGLE_LOADER });
  return axios
    .put(`/api/v1/users/edit-profile/${id}`, credentials)
    .then(result => {
      dispatch({
        type: EDIT_STAFF,
        payload: result.data.data
      });
      Toast.fire({
        icon: 'success',
        title: 'Changes saved'
      });
      dispatch({ type: TOGGLE_LOADER });
      return result.data.data;
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
 *
 * @param {*} id staff id
 * @return string -success message
 */
export const deleteStaff = id => dispatch => {
  axios
    .delete(`/api/v1/users/${id}`)
    .then(result => {
      dispatch({
        type: DELETE_STAFF,
        payload: id
      });
    })
    .catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const bulkImportStaff = data => dispatch => {
  return axios
    .post(`/api/v1/users/bulk-import`, data)
    .then(result => {
      Toast.fire({
        icon: 'success',
        title: result.data.message
      });
      console.log(result.data)
      return result.data;
    })
    .catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};

export const bulkExportStaff = async (currentUser) => {

  try{



    // const tempLink = document.createElement('a')
    // tempLink.href = 'http://localhost:5000/api/v1/users/export?user=${currentUser}'
    // tempLink.click()


    const res = await axios.get(`/api/v1/users/export?user=${currentUser}`)
    if(res){

      console.log(res.data, 'jsjkjsksjk')
      download(res.data, new Date().toLocaleDateString() + '-data.csv')
    }else{
      alert('data not found')
    }
  }catch(err){
    console.log(err, 'sjskkss')
  }
    

      // .get(`http://localhost:5000/api/v1/users/export?user=${currentUser}`)
      // .then(result => {

      //   console.log(result, 'csv')
      //   Toast.fire({
      //     icon: 'success',
      //     title: result.data.message
      //   });
      //   return result.data.message;
      // })
      // .catch(err => {
      //   Toast.fire({
      //     icon: 'error',
      //     title: err.response.data
      //   });
      // });
  

  // console.log(currentUser, 'jsjlllllss')
  // window.open(`http://api.carrotsuite.space/api/v1/users/export?user=${currentUser}`);





  // window.open('http://localhost:5000/api/v1/users/staff-sample');

};
/**
 *
 * @param {*} search search query
 * @return obj --arrays of staffs
 */
export const searchStaff2 = search => dispatch => {
  return axios
    .get(`/api/v1/users/search/${search}`)
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const sendAdminInvite = (id, data) => {
  return axios
    .post(`/api/v1/users/send-invite/${id}`, data)
    .then(result => {
      Toast.fire({
        icon: 'success',
        title: result.data.message
      });
      return result.data.message;
    })
    .catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const getAdminInvite = id => {
  return axios
    .get(`/api/v1/users/get-invite/${id}`)
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const updateRole = data => {
  return axios
    .post(`/api/v1/users/update-role`, data)
    .then(result => {
      Toast.fire({
        icon: 'success',
        title: result.data.message
      });
      return result.data.message;
    })
    .catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const downloadStaffCsvSample = () => {
  axios
    .get(`/api/v1/users/staff-sample`)
    .then(result => {

      console.log(result.data, 'jsjkjsksjk')
      download(result.data, new Date().toLocaleDateString() + '-data.csv')
      // window.open('http://api.carrotsuite.space/api/v1/users/staff-sample');
    })
    .catch(err => {
      console.log(err);
    });
};

export const getRoles = () => {
  return axios
    .get(`/api/v1/users/roles`)
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const setRole = (id, data) => {
  return axios
    .put(`/api/v1/users/role/${id}`, data)
    .then(result => {
      Toast.fire({
        icon: 'success',
        title: result.data.message
      });
      return result.data.message;
    })
    .catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const editProfilePix = data => dispatch => {
  axios
    .put(`/api/v1/users/edit-profile/picture`, data)
    .then(result => {
      Toast.fire({
        icon: 'success',
        title: result.data.message
      });
      const { token } = result.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      });
    })
    .catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const sendInviteLink = email => {
  return axios
    .post('/api/v1/users/invite-link', { email })
    .then(result => {
      Toast.fire({
        icon: 'success',
        title: result.data.message
      });
      return result.data.message;
    })
    .catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};

export const getStaffAssistant = (id, token) => {
  return axios
    .get(`/api/v1/users/${id}/assistant?token=${token}`)
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const addWorkspaceCompany = data => dispatch => {
  dispatch({ type: TOGGLE_LOADER });
  return axios
    .post('/api/v1/users/add/workspace-companies', data)
    .then(result => {

      console.log(result, 'result')
      dispatch({
        type: ADD_COMPANY,
        payload: result.data.data
      });
      Toast.fire({
        icon: 'success',
        title: result.data.message
      });
      dispatch({ type: TOGGLE_LOADER });
      return result.data.data;
    })
    .catch(err => {
      console.log(err.response.data[0], 'fweuwiw')
      // Toast.fire({
      //   icon: 'error',
      //   title: err.response.data
      // });
      dispatch({ type: TOGGLE_LOADER });
      // return err.response.data
      // throw err.response.data[0];
    });
};
export const getWorkspaceCompanies = (page = 1, limit = 30) => dispatch => {
  axios
    .get(`/api/v1/users/workspace-companies?page=${page}&limit=${limit}`)
    .then(result => {
      dispatch({
        type: GET_COMPANIES,
        payload: result.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const searchCompany = search => dispatch => {
  axios
    .get(`/api/v1/users/workspace-companies/search/${search}`)
    .then(result => {
      dispatch({
        type: GET_COMPANIES,
        payload: result.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getWorkspaceCompany = id => dispatch => {
  dispatch({ type: GET_SINGLE_COMPANY });
  return axios
    .get(`/api/v1/users/workspace-companies/${id}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_SINGLE_COMPANY,
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
 * @param {*} id company id
 * @param {*} credentials edit credentials
 * @return -- updated staff obj
 */
export const editCompany = (id, credentials) => dispatch => {
  dispatch({ type: TOGGLE_LOADER });
  return axios
    .put(`/api/v1/users/workspace-companies/${id}`, credentials)
    .then(result => {
      dispatch({
        type: EDIT_WORKSPACE_COMPANY,
        payload: result.data.data
      });
      Toast.fire({
        icon: 'success',
        title: 'Changes saved'
      });
      dispatch({ type: TOGGLE_LOADER });
      return result.data.data;
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
 *
 * @param {*} id company id
 * @return string -success message
 */
export const deleteCompany = id => dispatch => {
  axios
    .delete(`/api/v1/users/workspace-companies/${id}`)
    .then(result => {
      dispatch({
        type: DELETE_COMPANY,
        payload: id
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const updateNotifOption = option => {
  return axios
    .put(`/api/v1/users/notif-options`, { option })
    .then(result => {
      Toast.fire({
        icon: 'success',
        title: result.data.message
      });
      return result.data.message;
    })
    .catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const getAttendance = id => {
  return axios
    .put(`/api/v1/users/${id}/attendance`)
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const getTodayAttendance = (id, page = 1, limit = 10) => dispatch => {
  return axios
    .get(`/api/v1/users/${id}/attendance/today?page=${page}&limit=${limit}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_ATTENDANCE,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getWeekAttendance = (id, page = 1, limit = 10) => dispatch => {
  return axios
    .get(`/api/v1/users/${id}/attendance/week-ago?page=${page}&limit=${limit}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_ATTENDANCE,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getCustomAttendance = (id, from, to, page = 1, limit = 10) => dispatch => {
  return axios
    .get(
      `/api/v1/users/${id}/attendance/date-range?from=${from}&to=${to}&page=${page}&limit=${limit}`
    )
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_ATTENDANCE,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const addEstateHouse = data => dispatch => {
  dispatch({ type: TOGGLE_LOADER });
  return axios
    .post('/api/v1/users/estate-houses', data)
    .then(result => {
      dispatch({
        type: ADD_HOUSE,
        payload: result.data.data
      });
      Toast.fire({
        icon: 'success',
        title: result.data.message
      });
      dispatch({ type: TOGGLE_LOADER });
      return result.data.data;
    })
    .catch(err => {
      dispatch({ type: TOGGLE_LOADER });
      throw err;
    });
};
export const getEstateHouses = (page = 1, limit = 30) => dispatch => {
  axios
    .get(`/api/v1/users/estate-houses?page=${page}&limit=${limit}`)
    .then(result => {
      dispatch({
        type: GET_HOUSES,
        payload: result.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const searchHouse = search => dispatch => {
  axios
    .get(`/api/v1/users/estate-houses/search/${search}`)
    .then(result => {
      dispatch({
        type: GET_HOUSES,
        payload: result.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getEstateHouse = id => dispatch => {
  dispatch({ type: GET_SINGLE_HOUSE });
  return axios
    .get(`/api/v1/users/estate-houses/${id}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_SINGLE_HOUSE,
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
 * @param {*} id company id
 * @param {*} credentials edit credentials
 * @return -- updated staff obj
 */
export const editHouse = (id, credentials) => dispatch => {
  dispatch({ type: TOGGLE_LOADER });
  return axios
    .put(`/api/v1/users/estate-houses/${id}`, credentials)
    .then(result => {
      dispatch({
        type: EDIT_HOUSE,
        payload: result.data.data
      });
      Toast.fire({
        icon: 'success',
        title: 'Changes saved'
      });
      dispatch({ type: TOGGLE_LOADER });
      return result.data.data;
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
 *
 * @param {*} id company id
 * @return string -success message
 */
export const deleteHouse = id => dispatch => {
  axios
    .delete(`/api/v1/users/estate-houses/${id}`)
    .then(result => {
      dispatch({
        type: DELETE_HOUSE,
        payload: id
      });
    })
    .catch(err => {
      console.log(err);
    });
};
/**
 *
 * @param {*} email user email
 * @return string -success message
 */
export const forgotPassword = email => {
  axios
    .post(`/api/v1/users/${email}/forgot-password`)
    .then(result => {
      const { data } = result;
      Swal.fire('Forgot Password', data.message);
    })
    .catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
      throw err;
    });
};
/**
 * reset user password
 * @param {*} credentials password reset credentials
 * @param {*} history router history
 * @return string -success message
 */
export const resetPassword = (credentials, history) => {
  axios
    .post(`/api/v1/users/password-reset`, credentials)
    .then(result => {
      const { data } = result;
      Swal.fire('Password Reset', data.message);
    })
    .catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
      throw err;
    });
};
export const subscribe = async (data) => {
  return await axios
    .post('/api/v1/subscriptions/subscribe', data)
    .then(result => {
      const { data } = result;
      console.log(data.data, 'kkkkkkkk')
      return data.data
      // window.open(data.data, '_blank');
    })
    .catch(err => {
      console.log(err);
    });
};
export const getBillings = () => {
  return axios
    .get('/api/v1/subscriptions/billings')
    .then(result => {
      const { data } = result;
      console.log(data, 'djdjjjdd')
      return data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const getCurrentPlan = () => {
  return axios
    .get('/api/v1/subscriptions/plan')
    .then(result => {
      const { data } = result;
      console.log(data, 'djdjdjuiiwwiojjdd')
      return data.data;
    })
    .catch(err => {
      console.log(err, 'ejkksss');
    });
};
export const sendStaffMessage = data => {
  axios.post('/api/v1/users/message', data)
  .then(result => {
    Toast.fire({
      icon: 'success',
      title: result.data.message
    });
  })
  .catch(err => {
    console.log(err, 'kslsleiles');
    Toast.fire({
      icon: 'error',
      title: err.response.data
    });
  });
}
export const sendCompanyMessage = data => {
  axios.post('/api/v1/users/workspace-companies/message', data)
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
}

export const bulkImportAccountOfficer = data => {
  return axios
    .post(`/api/v1/users/bulk-import-account-officer`, data, )
    .then(result => {
      Toast.fire({
        icon: 'success',
        title: result.data.message
      });
      console.log(result.data)
      return result.data;
    })
    .catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};


export const getAllDepartments = async () => {
  return await axios
    .get(`/api/v1/users/company/all-departments`)
    .then(result => {
     
      const { data } = result;
      console.log(data.data.rows, 'jjjjjjjj al depa')
      return data.data.rows
    

      // dispatch({
      //   type: GET_DEPARTMENT,
      //   payload: data.data
      // });
    })
    .catch(err => {
      console.log(err);
    });
};




export const getStaffsByDepartment = (department, page = 1, limit = 30) => dispatch => {
  return axios
    .get(`/api/v1/users/company/department/${department}?page=${page}&limit=${limit}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_STAFF,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};



export const getAllLocations = async () => {
  return await axios
    .get(`/api/v1/users/company/all-locations`)
    .then(result => {
     
      const { data } = result;
      console.log(data.data.rows, 'jjjjjjjj al depa')
      return data.data.rows
    

      // dispatch({
      //   type: GET_DEPARTMENT,
      //   payload: data.data
      // });
    })
    .catch(err => {
      console.log(err);
    });
};




export const getStaffsByLocation = (company_location, page = 1, limit = 30) => dispatch => {
  return axios
    .get(`/api/v1/users/company/location/${company_location}?page=${page}&limit=${limit}`)
    .then(result => {
      const { data } = result;
      console.log(data, 'kijhhyyyyyyyyyyyyyyyyyyyyyyyy')
      dispatch({
        type: GET_STAFF,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};







// export const getCompany = () => dispatch => {
//   console.log("herrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
// axios.get(`/api/v1/settings/get-company`)
// .then( res => {
//     dispatch({ type: GET_COMPANY, payload: res.data.company })
//   })
//   .catch(err =>{
//       console.log(err, "..................ooooooo")
//      dispatch({ type: GET_COMPANY, payload: {} })
//     })
// }


export const sendMailMessages = async (purpose) => {
  //    console.log(id, "jjjjjjjjjjjjj")
    return await axios
      .post(`/api/v1/settings/send-email-messages-attach`, {purpose: purpose})
      .then(result => {
          console.log(result.data.data, 'siiiimm')
        return result.data.data;
      })
      .catch(err => {
       console.log(err, 'errororo')
        throw err;
      });
  };



  /**
 * get all all company staffs
 *
 *@return  obj ...returns arrays of staffs
 */
export const getMobStaff = (page = 1, limit = 10) => dispatch => {
  dispatch({ type: GET_MOBILE_STAFF });
  axios
    .get(`/api/v1/users/get?page=${page}&limit=${limit}`)
    .then(result => {
      console.log(result.data.data.rows, 'hjjjjjjjjjjjjjjjjjjjjjjj')
      if (result.data.data) {
        dispatch({
          type: GET_MOBILE_STAFF,
          payload: result.data.data
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};


export const signin = id => {
  return axios.post(`/api/v1/users/${id}/sign-in`)
  .then( res => {
        console.log(res.data.message, 'staf sin innnnnnnnnnnn')
      return res.data.message
    })
    .catch(err =>{

    console.log(err, 'ssssingn in errrroe')
       throw err
      })
}
export const signout = id => {
  return axios.post(`/api/v1/users/${id}/sign-out`)
  .then( res => {
      return res.data.message
    })
    .catch(err =>{
        console.log(err.response.data, 'errorer staff signoutt')
       throw err
      })
}









export const verifyPayment = async (reference, company, metadata, billing_Id) => {

  console.log(metadata, 'dsjsjkkuekww')
  return await axios
    .post(`/api/v1/subscriptions/verify-payment/${reference}`, {company: company, metadata:metadata, billing_Id: billing_Id})
    .then(result => {
      const { data } = result;
      console.log(data, 'kkkkkkkk')
      console.log(data.data, 'kkkkkkkk')

    //     const tempLink = document.createElement('a')
    // tempLink.href = 'data.data'
    // tempLink.click()
    
      window.open(data.data, '_blank');
      return data.data
      
    })
    .catch(err => {
      console.log(err);
    });
};




export const exportCompanies = currentUser => {

  
  window.open(`http://api.carrotsuite.space/api/v1/users/workspace-companies/export?user=${currentUser}`);
};