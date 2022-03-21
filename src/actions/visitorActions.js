import axios from 'axios';
import SwalToaste from '../components/common/SwalToaste';
import download from 'downloadjs'

import {
  GET_FORM_DATA,
  TOGGLE_LOADER,
  GET_ERRORS,
  REGISTER_VISITOR,
  GET_VISITORS,
  GET_VISITOR,
  VISITOR_SIGN_OUT,
  DELETE_VISITOR,
  GET_ONE_DIR,
  GET_DIR,
  EDIT_DIR,
  ADD_DIR,
  DELETE_DIR,
  SOUGHT_STAFF,
  SET_NEW_VISITOR,
  GET_VISITOR_BY_NUMBER,
  GET_VISITORS_BY_LOCATION
} from './types';

// gets the visitor suite fields
export const getFormData = (phone, visit_type, visitorName) => dispatch => {
  return axios
    .get(`/api/v1/visitor/verify-if-new-visitor/${phone}/${visit_type}?name=${visitorName}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_FORM_DATA,
        payload: data.data
      });
      return data.isNewVisitor;
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'info',
        title: err.response.data
      });
      throw err;
    });
};

export const registerVisitor = credentials => dispatch => {
  dispatch({ type: TOGGLE_LOADER });
  return axios
    .post('/api/v1/visitor', credentials)
    .then(result => {
      const { data } = result;
      dispatch({ type: TOGGLE_LOADER });
      dispatch({
        type: REGISTER_VISITOR,
        payload: data
      });
      return data;
    })
    .catch(err => {
      dispatch({ type: TOGGLE_LOADER });
      throw err;
    });
};
export const uploadVisitorPhotor = (vistorId, data) => dispatch => {
  return axios
    .post(`/api/v1/visitor/picture/${vistorId}`, data)
    .then(result => {
      const { data } = result;
      return data;
    })
    .catch(err => {
      throw err;
      console.log(err);
    });
};
export const getVisitors = (page = 1, limit = 30) => dispatch => {
  return axios
    .get(`/api/v1/visitor?page=${page}&limit=${limit}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_VISITORS,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getVisitorByHost = (hostId, page = 1, limit = 30) => dispatch => {
  return axios
    .get(`/api/v1/visitor/hosts/${hostId}?page=${page}&limit=${limit}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_VISITORS,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getVisitorByPurpose = (purpose, page = 1, limit = 30) => dispatch => {
  return axios
    .get(`/api/v1/visitor/purposes/${purpose}?page=${page}&limit=${limit}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_VISITORS,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};





export const getStaffVisitors = (page = 1, limit = 30) => dispatch => {
  return axios
    .get(`/api/v1/visitor/staff?page=${page}&limit=${limit}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_VISITORS,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getSignedInVisitors = (page = 1, limit = 30) => dispatch => {
  return axios
    .get(`/api/v1/visitor/get/signed-in-visitors?page=${page}&limit=${limit}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_VISITORS,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getWeekAgoVisitors = (page = 1, limit = 30) => dispatch => {
  return axios
    .get(`/api/v1/visitor/get/week-ago-visitors?page=${page}&limit=${limit}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_VISITORS,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getDateRangeVisitors = (from, to, page = 1, limit = 30) => dispatch => {
  return axios
    .get(
      `/api/v1/visitor/get/date-range-visitors?from=${from}&to=${to}&page=${page}&limit=${limit}`
    )
    .then(result => {
      const { data } = result;
      dispatch({
        type: GET_VISITORS,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getVisitor = id => async(dispatch) => {
  return await axios
    .get(`/api/v1/visitor/${id}`)
    .then(result => {
      console.log(result, 'kkkkkkkkk')
     
      dispatch({
        type: GET_VISITOR,
        payload: result.data.data
      });

      dispatch({
        type: SOUGHT_STAFF,
        payload: result.data.soughtStaff
      });
      
      return result.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const sendVisitorAction = data => dispatch => {
  return axios
    .post(`/api/v1/visitor/action/set`, data)
    .then(result => {
      const { data } = result;
      return data;
    })
    .catch(err => {
      throw err;
    });
};
export const signVisitorOut = id => dispatch => {
  return axios
    .put(`/api/v1/visitor/leaving/${id}`)
    .then(result => {
      const { data } = result;
      dispatch({
        type: VISITOR_SIGN_OUT,
        payload: data.data
      });
      SwalToaste.fire({
        icon: 'success',
        title: 'Visitor signed out'
      });
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const searchVisitor = search => dispatch => {
  axios
    .get(`/api/v1/visitor/search/${search}`)
    .then(result => {
      dispatch({
        type: GET_VISITORS,
        payload: result.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getPurposeField = () => {
  console.log('heeeee')
  return axios
    .get(`/api/v1/visitor/purpose-field`)
    .then(result => {

      console.log("action",result.data.data)
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const getVisitorBarge = token => {
  return axios
    .get(`/api/v1/visitor/get-e-barge/${token}`)
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const signOutByShortId = id => {
  return axios
    .put(`/api/v1/visitor/leaving/ex/${id}`)
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

export const declineVisitor = (id, token, reason) => {
  return axios
    .put(`/api/v1/visitor/${id}/decline`, { token, reason })
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
      return result.data.message;
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'info',
        title: err.response.data
      });
    });
};

export const transferVisitor = (id, staff, token) => {
  return axios
    .put(`/api/v1/visitor/${id}/transfer/${staff.assistant}`, { token, staff: staff.id })
    .then(result => {
      const { data } = result;
      SwalToaste.fire({
        icon: 'success',
        title: data.message
      });
      return data.message;
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'info',
        title: err.response.data
      });
      throw err;
    });
};

export const getVisitingHistory = phone => {
  return axios
    .get(`/api/v1/visitor/${phone}/history`)
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const bulkImportVisitor = data => {
  return axios
    .post(`/api/v1/visitor/bulk-import`, data)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
      return result.data;
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const getVisitingStats = () => {
  return axios
    .get(`/api/v1/visitor/stats`)
    .then(result => {
      const { data } = result;

      return data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const getGeneralStats = () => {
  return axios
    .get(`/api/v1/visitor/general-stats`)
    .then(result => {
      const { data } = result;

      return data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const getMonthlyStats = () => {
  return axios
    .get(`/api/v1/visitor/monthly-stats`)
    .then(result => {
      const { data } = result;

      return data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const lastMonthStats = () => {
  return axios
    .get(`/api/v1/visitor/last-month-stats`)
    .then(result => {
      const { data } = result;

      return data.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const mostVisited = () => {
  return axios
    .get(`/api/v1/visitor/most-visited`)
    .then(result => {
      const { data } = result;

      return data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
export const busiestStats = () => {
  return axios
    .get(`/api/v1/visitor/busiest-stats`)
    .then(result => {
      const { data } = result;
      console.log(data, 'gggdatattattatat')

      return data.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const sendEmergencyAlert = message => {
  axios
    .post('/api/v1/visitor/emergencies', { message })
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
export const deleteVisitor = id => dispatch => {
  axios
    .delete(`/api/v1/visitor/${id}`)
    .then(result => {
      SwalToaste.fire({
        icon: 'success',
        title: result.data.message
      });
      dispatch({
        type: DELETE_VISITOR,
        payload: id
      })
    })
    .catch(err => {
      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });
    });
};
export const exportVisitors = async(currentUser, currentCase) => {

  try{
    const res = await axios.get(`/api/v1/visitor/log/export?user=${currentUser}&case=${currentCase}`)
    if(res){
      download(res.data, new Date().toLocaleDateString() + '-visitor.csv')
    }else{
      alert('data not found')
    }
  }catch(err){
    console.log(err, 'sjskkss')
  }

  // window.open(`http://api.carrotsuite.space/api/v1/visitor/log/export?user=${currentUser}&case=${currentCase}`);
};





export const bulkExportDirectory = async (currentUser) => {

  try{
    const res = await axios.get(`/api/v1/visitor/directory/export?user=${currentUser}`)
    if(res){
      download(res.data, new Date().toLocaleDateString() + '-data.csv')
    }else{
      alert('data not found')
    }
  }catch(err){
    console.log(err, 'sjskkss')
  }
    

};


export const blacklistVisitors = data => {
  axios.post('/api/v1/visitor/blacklist', data)
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
}
export const getBlacklistVisitors = () => {
  return axios.get('/api/v1/visitor/blacklist')
  .then(result => {
    console.log(result.data.data, 'ddddddddd')
    return result.data.data;
  })
  .catch(err => {
    console.log(err)
  });
}
export const removeBlacklistedVisitor = id => {
  axios.delete(`/api/v1/visitor/blacklist/${id}`)
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
}
export const sendMessage = data => {
  axios.post('/api/v1/visitor/message', data)
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
}
export const importVisitorDirectory = data =>  {
  return axios.post(`/api/v1/visitor/directory/import`, data)
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
}
export const getDirectory = (page=1, limit=30) => dispatch => {
 return axios.get(  `/api/v1/visitor/directory?page=${page}&limit=${limit}`)
  .then(result => {
    const {data} = result;
    dispatch({
      type: GET_DIR,
      payload: data.data
    })
  })
  .catch(err => {
    console.log(err)
  })
}
export const searchDirectory = search => dispatch => {
  return axios.get(  `/api/v1/visitor/directory/search/${search}`)
   .then(result => {
     const {data} = result;
     dispatch({
       type: GET_DIR,
       payload: data.data
     })
   })
   .catch(err => {
     console.log(err)
   })
 }
export const addOneDirRecord = data => dispatch =>  {
  return axios.post(`/api/v1/visitor/directory`, data)
  .then(result => {
    SwalToaste.fire({
      icon: 'success',
      title: result.data.message
    });
    dispatch({
      type: ADD_DIR,
      payload: result.data.data
    })
    return result.data.data;
})
.catch(err => {
  SwalToaste.fire({
    icon: 'error',
    title: err.response.data
  });
});
}
export const editDirRecord = (id, data) => dispatch => {
  return axios.put(`/api/v1/visitor/directory/${id}`, data)
  .then(result => {
   
    SwalToaste.fire({
      icon: 'success',
      title: result.data.message
    });
    dispatch({
      type: EDIT_DIR,
      payload: result.data.data
    })
    return result.data
})
.catch(err => {
  SwalToaste.fire({
    icon: 'error',
    title: err.response.data
  });
});
}
export const getOneDirRecord = id => dispatch => {
  return axios.get(`/api/v1/visitor/directory/${id}`)
  .then(result => {
    const {data} = result;
    dispatch({
      type: GET_ONE_DIR,
      payload: data.data
    })
    return data.data
  })
  .catch(err => {
    console.log(err)
  })
}
export const deleteOneDirRecord = id => dispatch => {
  axios.delete(`/api/v1/visitor/directory/${id}`)
  .then( result => {
    SwalToaste.fire({
      icon: 'success',
      title: result.data.message
    })
    dispatch({
      type: DELETE_DIR,
      payload: id
    })
  })
  .catch(err => {
    SwalToaste.fire({
      icon: 'error',
      title: err.response.data
    });
  })
}
export const downloadDirCsvSample = () => {
  axios
    .get(`/api/v1/visitor/directory-sample`)
    .then( (result) => {

      console.log(result.data, 'jsjkjsksjk')
      download(result.data, new Date().toLocaleDateString() + '-data.csv')
      // window.open('http://api.carrotsuite.space/api/v1/visitor/directory-sample');
    })
    .catch(err => {
      console.log(err);
    });
};
export const downloadContactCsvSample = () => {
  axios
    .get(`/api/v1/visitor/contact-sample`)
    .then( (result) => {
      
      console.log(result.data, 'jsjkjsksjk')
      download(result.data, new Date().toLocaleDateString() + '-data.csv')
      // window.open('http://api.carrotsuite.space/api/v1/visitor/contact-sample');
    })
    .catch(err => {
      console.log(err);
    });
};



export const addNewVisitor = async (visitorData) => {
  // dispatch({ type: TOGGLE_LOADER });
  // dispatch(clearErrors());
  return await axios
    .post(`/api/v1/visitor`, visitorData)
    .then(res => {
      console.log(res.data, "adddnewvissorrr")

      SwalToaste.fire({
        icon: 'success',
        title: 'sent'
      })

      console.log(res.data, 'hgggg')
      return res.data

     


      // dispatch({
      //   type: SET_NEW_VISITOR,
      //   payload: res.data
      // });
      // dispatch({ type: TOGGLE_LOADER });
      // return res.data;
    })
    .catch(err => {
      // dispatch({ type: TOGGLE_LOADER });

      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });

      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // });
    });
};



export const checkVisitorClone = (phone_number, visit_type) => {
  console.log('llllll')
  
    return axios
      .get(`/api/v1/visitor/verify-if-new-visitor/${phone_number}/${visit_type}`)
      .then(res => {
          console.log(res, "vizsisssst")
  
      ;
        return res.data;
      })
      .catch(err => {
      console.log(err.response,'vvvvvvcc');
  
        throw err
      });
  };

  //GET SINGLE CHECKED IN VISITOR
export const getCheckedInVisitor = (phone_number, page = 1, limit = 300) => dispatch => {
  console.log(phone_number, 'getvisitorrrrr')
return axios
  .get(
    `/api/v1/visitor/get/signed-in-visitor/${phone_number}`
  )
  .then(result => {
    const { data } = result;

    console.log(data.data, 'joooooooo')
    dispatch({
      type: GET_VISITOR_BY_NUMBER,
      payload: data.data,
      checkedInVisitorRetrieved: true
    });
  console.log(result, "rrreeettt")
  })
  .catch(err => {
    console.log(err);
    SwalToaste.fire({
      icon: 'error',
      title: err.response.data
    });
  });
};


export const MobsignVisitorOut = id => {
  console.log(id, "jjjjjjjjjjjjj")
return axios
  .put(`/api/v1/visitor/leaving/${id}`)
  .then(result => {
      console.log(result.data.data, 'siiiimm')
    return result.data.data;
  })
  .catch(err => {
   console.log(err, 'errororo')
    throw err;
  });
};


export const inviteeSignIn = uid => dispatch => {
  dispatch({ type: TOGGLE_LOADER });
  return axios
    .get(`/api/v1/visitor/attend/appointment/${uid}`)
    .then(result => {
      const { data } = result;
      dispatch({ type: TOGGLE_LOADER });
      return data;
    })
    .catch(err => {
      dispatch({ type: TOGGLE_LOADER });
      throw err;
    });
};



// export const billingContactUs = uid => dispatch => {
//   dispatch({ type: TOGGLE_LOADER });
//   return axios
//     .post(`/api/v1/visitor/billing-contact-form`)
//     .then(result => {
//       const { data } = result;
//       dispatch({ type: TOGGLE_LOADER });
//       return data;
//     })
//     .catch(err => {
//       dispatch({ type: TOGGLE_LOADER });
//       throw err;
//     });
// };



export const billingContactUs = async (message, company, subject) => {
  // dispatch({ type: TOGGLE_LOADER });
  // dispatch(clearErrors());
  return await axios
    .post(`/api/v1/visitor/billing-contact-form`, {message: message, company: company, subject: subject})
    .then(res => {
      console.log(res.data, "adddnewvissorrr")

      SwalToaste.fire({
        icon: 'success',
        title: 'sent'
      })

      console.log(res.data, 'hgggg')
      return res.data

     


      // dispatch({
      //   type: SET_NEW_VISITOR,
      //   payload: res.data
      // });
      // dispatch({ type: TOGGLE_LOADER });
      // return res.data;
    })
    .catch(err => {
      // dispatch({ type: TOGGLE_LOADER });

      SwalToaste.fire({
        icon: 'error',
        title: err.response.data
      });

      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // });
    });
};



// export const exptBlcklstedVisitors = async(currentUser, currentCase) => {

//   try{
//     const res = await axios.get(`/api/v1/visitor/log/export?user=${currentUser}&case=${currentCase}`)
//     if(res){
//       download(res.data, new Date().toLocaleDateString() + '-visitor.csv')
//     }else{
//       alert('data not found')
//     }
//   }catch(err){
//     console.log(err, 'sjskkss')
//   }

//   // window.open(`http://api.carrotsuite.space/api/v1/visitor/log/export?user=${currentUser}&case=${currentCase}`);
// };


// export const bulkImportStaff = data => dispatch => {
//   return axios
//     .post(`/api/v1/users/bulk-import`, data)
//     .then(result => {
//       Toast.fire({
//         icon: 'success',
//         title: result.data.message
//       });
//       console.log(result.data)
//       return result.data;
//     })
//     .catch(err => {
//       Toast.fire({
//         icon: 'error',
//         title: err.response.data
//       });
//     });
// };

export const exptBlcklstedVisitors = async (currentUser) => {

  try{



    // const tempLink = document.createElement('a')
    // tempLink.href = 'http://localhost:5000/api/v1/users/export?user=${currentUser}'
    // tempLink.click()


    const res = await axios.get(`/api/v1/visitor/blacklisted-visitor/export?user=${currentUser}`)
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




export const getVisitorsByLocation = (company_location, page = 1, limit = 30) => dispatch => {

  console.log('hhhhhhhhhhrrrrrrrrrrnnnnnn')
  return axios
    .get(`/api/v1/visitor/get/all/location/${company_location}?page=${page}&limit=${limit}`)
    .then(result => {
      const { data } = result;
      console.log(data, 'kijhhyyyyyyyyyyyyyyyyyyyyyyyy')
      dispatch({
        type: GET_VISITORS_BY_LOCATION,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};