import axios from 'axios';
import SwalToaste from '../components/common/SwalToaste';

import {
  GET_COMPANY,
  GET_LOCATIONS,
  EDIT_COMPANY,
  GET_CONFIGS,
  ADD_LOCATION,
  EDIT_LOCATION,
  EDIT_CONFIG,
  GET_FIELDS,
  ADD_CUSTOM_FIELDS,
  GET_STATS,
  EDIT_CUSTOM_FIELD,
  DELETE_CUSTOM_FIELD,
  ADD_CUSTOM_OPTION_FIELDS,
  ADD_FIELD_OPTION,
  DELETE_CUSTOM_FIELD_OPTION,
  GET_COMPANY_PURPOSE,
  GET_VISIT_PURPOSES,
  GET_DEFAULT_VISIT_PURPOSES,
  GET_SLIDES
} from './types';
import Swal from 'sweetalert2';

/**
 * @desription get company locations
 */
export const getLocations = () => dispatch => {
  axios
    .get('/api/v1/settings/view-location')
    .then(result => {
      console.log(result)
      dispatch({
        type: GET_LOCATIONS,
        locations: result.data.locations
      });
    })
    .catch(err => console.log(err));
};
/**
 * @desription add new company location
 */
export const addLocation = data => dispatch => {
  axios
    .post('/api/v1/settings/add-location', data)
    .then(result => {
      dispatch({
        type: ADD_LOCATION,
        location: result.data.location
      });
    })
    .catch(err => {
      if(err.response.status === 401){
        Swal.fire('oops', err.response.data)
      }else
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
/**
 * @desription add new company location
 */
export const editLocation = (id, data) => dispatch => {
  axios
    .post(`/api/v1/settings/edit-location/${id}`, data)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
      dispatch({
        type: EDIT_LOCATION,
        payload: result.data.data
      });
    })
    .catch(err => console.log(err));
};
export const editCompany = data => dispatch => {
  axios
    .put(`/api/v1/settings/edit-company`, data)
    .then(result => {
      dispatch({
        type: EDIT_COMPANY,
        payload: result.data.data
      });
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
    })
    .catch(err => {
      console.log(err.response, 'fjfjfjf')
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data.data
      });
      console.log(err);
    });
};
// get single company
export const getCompany = () => dispatch => {
  axios
    .get(`/api/v1/settings/get-company`)
    .then(result => {
      dispatch({
        type: GET_COMPANY,
        company: result.data.company
      });
    })
    .catch(err => console.log(err));
};
export const editCofigurations = data => dispatch => {
  axios
    .put(`/api/v1/settings/edit-configurations`, data)
    .then(result => {
      dispatch({
        type: EDIT_CONFIG,
        configs: result.data.configs
      });
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
    })
    .catch(err => console.log(err));
};
export const getCofigurations = () => dispatch => {
  axios
    .get(`/api/v1/settings/configurations`)
    .then(result => {
      dispatch({
        type: GET_CONFIGS,
        configs: result.data.configs
      });
    })
    .catch(err => console.log(err));
};

// gets the visitor fields
export const getFields = (type) => dispatch => {
  axios
    .get(`/api/v1/settings/fields/${type}`)
    .then(result => {
      console.log(result.data.data, 'get fields....')
      dispatch({
        type: GET_FIELDS,
        payload: result.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const editCustomField = (id, data) => dispatch => {
  axios
    .put(`/api/v1/settings/fields/${id}`, data)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
      dispatch({
        type: EDIT_CUSTOM_FIELD,
        payload: result.data.data
      });
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const deleteCustomField = id => dispatch => {
  axios
    .delete(`/api/v1/settings/fields/${id}`)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
      dispatch({
        type: DELETE_CUSTOM_FIELD,
        payload: id
      });
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const toggleField = (id, data) => dispatch => {
  axios
    .put(`/api/v1/settings/fields/${id}/toggle`, data)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const addCustomField = (type, data) => dispatch => {
  axios
    .post(`/api/v1/settings/fields/${type}`, data)
    .then(result => {
      dispatch({
        type: ADD_CUSTOM_FIELDS,
        payload: result.data.data
      });
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const addCustomOptionField = (type, data) => dispatch => {
  axios
    .post(`/api/v1/settings/option-fields/${type}`, data)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
      dispatch({
        type: ADD_CUSTOM_OPTION_FIELDS,
        payload: result.data.data
      });
    })
    .catch(err => {
      console.log(err, 'errrr')
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const addFieldOption = (id, data) => dispatch => {
  axios
    .post(`/api/v1/settings/option-fields/${id}/options`, data)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
      dispatch({
        type: ADD_FIELD_OPTION,
        payload: { id, data: result.data.data }
      });
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const deleteFieldOption = (optionId) => {
  
  return axios
    .delete(`/api/v1/settings/option-fields/${optionId}/options`)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
      return result.data
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const getStats = () => dispatch => {
  axios
    .get(`/api/v1/settings/stats`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_STATS,
        payload: data.data
      });
    })
    .catch(err => console.log(err));
};
export const saveStaffNotif = message => {
  return axios
    .put('/api/v1/settings/staff-notif', { message })
    .then(() => {
      SwalToaste.fire({
        icon: 'success',
        title: 'Changes saved'
      });
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const getStaffNotif = () => {
  return axios
    .get('/api/v1/settings/staff-notif')
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const saveWelcomeNotif = message => {
  return axios
    .put('/api/v1/settings/welcome-notif', { message })
    .then(() => {
      SwalToaste.fire({
        icon: 'success',
        title: 'Changes saved'
      });
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const getWelcomeNotif = () => {
  return axios
    .get('/api/v1/settings/welcome-notif')
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const saveDefaultHostNotif = message => {
  return axios
    .put('/api/v1/settings/default-notif', { message })
    .then(() => {
      SwalToaste.fire({
        icon: 'success',
        title: 'Changes saved'
      });
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const getDefaultHostNotif = () => {
  return axios
    .get('/api/v1/settings/default-notif')
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const saveSignOutTime = time => {
  axios
    .put('/api/v1/settings/signout-time', { time })
    .then(() => {
      SwalToaste.fire({
        icon: 'success',
        title: 'Changes saved'
      });
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const getSignOutTime = () => {
  return axios
    .get('/api/v1/settings/signout-time')
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const saveInviteNotif = message => {
  return axios
    .put('/api/v1/settings/invite-notif', { message })
    .then(() => {
      SwalToaste.fire({
        icon: 'success',
        title: 'Changes saved'
      });
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const getInviteNotif = () => {
  return axios
    .get('/api/v1/settings/invite-notif')
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const saveDefaultHost = data => {
  return axios
    .post('/api/v1/settings/default-host', data)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: 'saved'
      });
      return result.data.data;
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};

export const saveDefaultHostCc = data => {
  return axios
    .post('/api/v1/settings/default-host-cc', data)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: 'saved'
      });
      return result.data.data;
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};

export const interviewRole = data => {
  console.log(data, 'interrr..........')
  return axios
    .post('/api/v1/settings/interview-role-field', data= data)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: 'saved'
      });
      return result.data.data;
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};

export const removeDefaultHost = id => {
  return axios
    .delete(`/api/v1/settings/default-host/${id}`)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
      return result.data.message;
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};


export const removeDefaultHostCc = id => {
  return axios
    .delete(`/api/v1/settings/default-host-cc/${id}`)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
      return result.data.message;
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};


export const getDefaultHost = () => {
  return axios
    .get('/api/v1/settings/default-host')
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getDefaultHostCc = () => {
  return axios
    .get('/api/v1/settings/default-host-cc')
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const enableSms = () => {
  return axios
    .put(`/api/v1/settings/notifcation/sms`)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
      return result.data.message;
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: 'error'
      });
    });
};
export const enableEmail = () => {
  return axios
    .put(`/api/v1/settings/notifcation/email`)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
      return result.data.message;
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: 'error'
      });
    });
};
export const saveIpadAdmin = data => {
  return axios
    .post('/api/v1/settings/ipad-admin', data)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: 'saved'
      });
      return result.data.data;
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const removeIpadAdmin = id => {
  return axios
    .delete(`/api/v1/settings/ipad-admin/${id}`)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
      return result.data.message;
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const getIpadAdmin = () => {
  return axios
    .get('/api/v1/settings/ipad-admin')
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const uploadWelcomeImage = data => {
  return axios
    .post('/api/v1/settings/welcome-images', data)
    .then(result => {
      const { data } = result;

      SwalToaste.fire({
        icon: 'success',
        title: data.message
      });
      return data.data
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
      throw err;
    });
};
export const getWelcomeImage = type => {
  return axios
    .get(`/api/v1/settings/welcome-images/${type}`)
    .then(result => {
      return result.data.data
    })
    .catch(err => {
      console.log(err)
    })
}
export const deleteWelcomeImage = (id) => {
  return axios
    .delete(`/api/v1/settings/welcome-images/${id}`)
    .then(result => {
      const { data } = result;
      SwalToaste.fire({
        icon: 'success',
        title: data.message
      });
      return data
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const deleteSlideImage = id => {
  axios
    .delete(`/api/v1/settings/slide-images/${id}`)
    .then(result => {
      const { data } = result;
      SwalToaste.fire({
        icon: 'success',
        title: data.message
      });
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const getSlideImages = () => {
  return axios
    .get(`/api/v1/settings/slide-images`)
    .then(result => {
      return result.data.data;
    })
    .catch(err => console.log(err));
};

export const getSlideImagesMobDashboard = () => dispatch => {
  axios.get(`/api/v1/settings/slide-images`)
  .then(result => {
    dispatch({
      type: GET_SLIDES,
      payload: result.data.data
    })
  })
  .catch(err => console.log(err))
}


export const editCountry = data => dispatch => {
  axios
    .put(`/api/v1/settings/company-country`, data)
    .then(result => {
      dispatch({
        type: EDIT_COMPANY,
        payload: result.data.data
      });
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
      console.log(err);
    });
};
export const addVisitType = data => {
  return axios
    .post(`/api/v1/settings/visit-types`, data)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
      return result.data.data;
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const addWelcomeMessage = (type, data) => {
  axios
    .post(`/api/v1/settings/welcome-message/${type}`, data)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const getVisitTypeConfigs = type => {
  return axios.get(`/api/v1/settings/visit-type-configs/${type}`)
  .then(result => {
    return result.data.data
  })
  .catch(err => {
    console.log(err)
  })
}
export const saveVisitTypeConfigs = (type, data) => {
  axios.post(`/api/v1/settings/visit-type-configs/${type}`, data)
  .then(result => {
    SwalToaste.fire({
      icon: 'success',
      title: result.data.message
    })
  })
  .catch(err => {
    SwalToaste.fire({
      icon: 'error',
      title: err.response.data
    })
  })
}
export const getVisitTypeWelcomeMessage = type => {
  return axios.get(`/api/v1/settings/welcome-message/${type}`)
  .then(result => {
    return result.data.data
  })
  .catch(err => {
    console.log(err)
  })
}


// get single company
export const getPurpose = () => dispatch => {
  axios
    .get(`/api/v1/settings/visit-types`)
    .then(result => {
      dispatch({
        type: GET_COMPANY_PURPOSE,
        company: result.data.company
      });
    })
    .catch(err => console.log(err));
};


// get single company
export const getVisitPurposes = () => dispatch => {
  axios
    .get(`/api/v1/settings/get-purpose`)
    .then(result => {
      console.log(result)
      dispatch({
        type: GET_VISIT_PURPOSES,
        payload: result.data
      });
    })
    .catch(err => console.log(err));
};


// get single company
export const getDefaultVisitPurposes = () => dispatch => {
  axios
    .get(`/api/v1/settings/get-default-purposes`)
    .then(result => {
      console.log(result, ' ')
      dispatch({
        type: GET_DEFAULT_VISIT_PURPOSES,
        payload: result.data
      });
    })
    .catch(err => console.log(err));
};



export const deleteCustomizedPurpose = (purpose) => {
  console.log(purpose, 'pppppppppppppppppppp')
  axios.delete(`/api/v1/settings/default-purposes/${purpose}`)
  .then(result => {
    SwalToaste.fire({
      icon: 'success',
      title: result.data.message
    })
  })
  .catch(err => {
    SwalToaste.fire({
      icon: 'error',
      title: err.response.data
    })
  })
}


export const disableDefaultPurpose = (purpose) => {
  console.log(purpose, 'pppppppppppppppppppp')
  axios.delete(`/api/v1/settings/default-purposes/${purpose}`)
  .then(result => {
    SwalToaste.fire({
      icon: 'success',
      title: result.data.message
    })
  })
  .catch(err => {
    SwalToaste.fire({
      icon: 'error',
      title: err.response.data
    })
  })
}



// get single company
export const getVisitPurposesFetch = async() => {
  return await axios
    .get(`/api/v1/settings/get-purpose`)
    .then(result => {
      console.log(result)
      return result.data;
  
    })
    .catch(err => console.log(err));
};


export const getDefaultVisitPurposesFetch = async() => {
  console.log('heeeee')
  return await axios
    .get(`/api/v1/settings/get-default-purposes`)
    .then(result => {

      console.log("actikkkkkkkkkkkkkkkkkkkkkkkon",result.data)
      return result.data;
    })
    .catch(err => {
      console.log(err);
    });
};






// get single company
// export const getDefaultVisitPurposesFetch = async() => {
//   await axios
//     .get(`/api/v1/settings/get-default-purposes`)
//     .then(result => {

//       return result.data;
      
//     })
//     .catch(err => console.log(err));
// };



// export const addVisitType = data => {
//   return axios
//     .post(`/api/v1/settings/visit-types`, data)
//     .then(result => {
//       SwalToaste.fire({
//         icon: 'success',
//         title: result.data.message
//       });
//       return result.data.data;
//     })
//     .catch(err => {
//       SwalToaste.fire({
//         icon: 'error',
//         title: err.response.data
//       });
//     });
// };





// // get single company
// export const getDefaultVisitPurposes = () => dispatch => {
//   axios
//     .get(`/api/v1/settings/get-default-purposes`)
//     .then(result => {
//       console.log(result, ' ')
//       dispatch({
//         type: GET_DEFAULT_VISIT_PURPOSES,
//         payload: result.data
//       });
//     })
//     .catch(err => console.log(err));
// };


export const editMobileTimeout = async(data) => {
  await axios
    .put(`/api/v1/settings/set-mobile-timeouts`, {timeOut: data})
    .then(result => {
      // dispatch({
      //   type: EDIT_COMPANY,
      //   payload: result.data.data
      // });
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
    })
    .catch(err => {
      console.log(err.response, 'fjfjfjf')
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data.data
      });
      console.log(err);
    });
};


export const setBranchCode = async(data) => {
  return await axios
    .put(`/api/v1/settings/company/branch/set-code`, data)
    .then(result => {
      // dispatch({
      //   type: EDIT_COMPANY,
      //   payload: result.data.data
      // });

      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
      return result.data.message
    })
    .catch(err => {
      console.log(err.response, 'fjfjfjf')
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data.data
      });
      console.log(err);
    });
};



export const getBranchCode = async() => {

  console.log( 'kllllkkiiii')
  return await axios
    .get(`/api/v1/settings/get/company/branch/set/set-code`)
    .then(result => {
      // dispatch({
      //   type: EDIT_COMPANY,
      //   payload: result.data.data
      // });

      console.log(result.data.data, 'kkkiiii')
      return result.data.data
      // SwalToaste.fire({
      //   icon: 'success',
      //   title: result.data.message
      // });
    })
    .catch(err => {
      console.log(err.response, 'fjfjfjf')
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data.data
      });
      console.log(err);
      throw err
    });
};






export const addDepartment = async(data) => {
  await axios
    .post(`/api/v1/settings/add-department`, {department: data})
    .then(result => {
      // dispatch({
      //   type: EDIT_COMPANY,
      //   payload: result.data.data
      // });
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
    })
    .catch(err => {
      console.log(err.response, 'fjfjfjf')
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data.data
      });
      console.log(err);
    });
};


export const getDepartment = async(data) => {
   return await axios
    .get(`/api/v1/settings/get-department`)
    .then(result => {
      // dispatch({
      //   type: EDIT_COMPANY,
      //   payload: result.data.data
      // });
        console.log(result.data.data, 'na')
      return result.data.data
   
    })
    .catch(err => {
      console.log(err.response, 'fjfjfjf')
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data.data
      });
      console.log(err);
    });
};


export const mobileColorUpdate = async(data, type) => {
  await axios
    .put(`/api/v1/settings/color/welm-txt`, {color: data, type: type })
    .then(result => {
      // dispatch({
      //   type: EDIT_COMPANY,
      //   payload: result.data.data
      // });
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
    })
    .catch(err => {
      console.log(err.response, 'fjfjfjf')
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data.data
      });
      console.log(err);
    });
};



export const qrcodeSelection = async(data) => {
  await axios
    .put(`/api/v1/settings/set-mobile-qrcode`, {qrcode: data})
    .then(result => {
      // dispatch({
      //   type: EDIT_COMPANY,
      //   payload: result.data.data
      // });
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
    })
    .catch(err => {
      console.log(err.response, 'fjfjfjf')
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data.data
      });
      console.log(err);
    });
};


export const getQRState = async(data) => {
  return await axios
   .get(`/api/v1/settings/get/qr/code`)
   .then(result => {
     // dispatch({
     //   type: EDIT_COMPANY,
     //   payload: result.data.data
     // });
       console.log(result.data.data, 'npppa')
     return result.data.data
  
   })
   .catch(err => {
     console.log(err.response, 'fjfjfjf')
     SwalToaste.fire({
       icon: 'error',
       title: err.response.data.data
     });
     console.log(err);
   });
};


// export const handlePurposeSubt = async(addPurpose)=> {


//   try{

//     await axios.post('/api/v1/settings/add-purpose', {purpose: addPurpose})
//     .then(response=>{

//       console.log(response);
//       // setPurposeError(response.data.message);

//       SwalToaste.fire({
//         icon: 'success',
//         title: response.data.message
//       });

//     }

//   )
//   }catch(err){

//     // setPurposeError(err.response.data,)
//     console.log(err.response.data, 'eerrrre')

//   }


// }