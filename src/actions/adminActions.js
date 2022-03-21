import axios from 'axios';
import Toast from '../components/common/SwalToaste';
import Swal from 'sweetalert2';

export const getAllCompanies = async (page=1, limit=100) => {
  try {
    const { data } = await axios.get(`/api/v1/admin/companies?page=${page}&limit=${limit}`);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
export const searchCompany = async search => {
    try {
        const { data } = await axios.get(`/api/v1/admin/companies/search/${search}`);
        return data.data;
      } catch (err) {
        console.log(err);
      }
  };
export const getAllCompaniesByOPtion = async option => {
  try {
    const { data } = await axios.get(`/api/v1/admin/companies/${option}/option`);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
export const getAllCompaniesByStatus = async status => {
  try {
    const { data } = await axios.get(`/api/v1/admin/companies/${status}/status`);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
export const getOneCompany = async id => {
  try {
    const { data } = await axios.get(`/api/v1/admin/companies/${id}`);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteOneCompany = async (id, credentials) => {
  try {
    const { data } = await axios.delete(`/api/v1/admin/companies/${id}`, { data: credentials });
    Toast.fire({
      icon: 'success',
      title: data.message
    });
    return data;
  } catch (err) {
    Toast.fire({
      icon: 'error',
      title: err.response.data
    });
  }
};
export const getCompanyUsers = async id => {
  try {
    const { data } = await axios.get(`/api/v1/admin/companies/${id}/users`);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
export const getCompanyPlan = async id => {
  try {
    const { data } = await axios.get(`/api/v1/admin/companies/${id}/plans`);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
export const enableCompany = async id => {
  try {
    const { data } = await axios.get(`/api/v1/admin/companies/${id}/enable`);
    Toast.fire({
      icon: 'success',
      title: data.message
    });
  } catch (err) {
    Toast.fire({
      icon: 'error',
      title: err.response.data
    });
  }
};
export const disableCompany = async id => {
  try {
    const { data } = await axios.get(`/api/v1/admin/companies/${id}/disable`);
    Toast.fire({
      icon: 'success',
      title: data.message
    });
  } catch (err) {
    Toast.fire({
      icon: 'error',
      title: err.response.data
    });
  }
};
export const getPlans = async () => {
  try {
    const { data } = await axios.get('/api/v1/admin/plans');
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
export const editPlan = async (id, credentials) => {
  try {
    const { data } = await axios.put(`/api/v1/admin/plans/${id}`, credentials);
    Toast.fire({
      icon: 'success',
      title: data.message
    });
    return data.message;
  } catch (err) {
    throw err;
  }
};
export const addPlan = async credentials => {
  try {
    const { data } = await axios.post(`/api/v1/admin/plans`, credentials);
    Toast.fire({
      icon: 'success',
      title: data.message
    });
    return data.data;
  } catch (err) {
    throw err;
  }
};
export const enablePlan = async id => {
  try {
    const { data } = await axios.put(`/api/v1/admin/plans/${id}/enable`);
    Toast.fire({
      icon: 'success',
      title: data.message
    });
  } catch (err) {
    Toast.fire({
      icon: 'error',
      title: err.response.data
    });
  }
};
export const disablePlan = async id => {
  try {
    const { data } = await axios.put(`/api/v1/admin/plans/${id}/disable`);
    Toast.fire({
      icon: 'success',
      title: data.message
    });
  } catch (err) {
    Toast.fire({
      icon: 'error',
      title: err.response.data
    });
  }
};
export const deleteAdmin = async id => {
  try {
    const { data } = await axios.delete(`/api/v1/admin/admins/${id}`);
    Toast.fire({
      icon: 'success',
      title: data.message
    });
    return data.data;
  } catch (err) {
    Toast.fire({
      icon: 'error',
      title: err.response.data
    });
  }
};

export const addAdmin = async credentials => {
  try {
    const { data } = await axios.post(`/api/v1/admin/register`, credentials);
    Toast.fire({
      icon: 'success',
      title: data.message
    });
    return data.data;
  } catch (err) {
    throw err;
  }
};
export const getAdmins = async () => {
  try {
    const { data } = await axios.get(`/api/v1/admin/admins`);
    return data.data;
  } catch (err) {
    console.log(err)
  }
};
/**
 *
 * @param {*} email user email
 * @return string -success message
 */
export const forgotPassword = email => {
  axios.post(`/api/v1/admin/${email}/forgot-password`)
  .then(result => {
    const {data} = result;
    Swal.fire('Forgot Password', data.message)
  })
  .catch(err => {
    Toast.fire({
      icon: 'error',
      title: err.response.data
    })
    throw err
  })
}
/**
 * reset user password
 * @param {*} credentials password reset credentials
 * @param {*} history router history
 * @return string -success message
 */
export const resetPassword = (credentials, history) => {
  axios.post(`/api/v1/admin/password-reset`, credentials)
  .then(result => {
    const {data} = result;
    Swal.fire('Password Reset', data.message)
    history.push('/admin/login')
  })
  .catch(err => {
    Toast.fire({
      icon: 'error',
      title: err.response.data
    })
    throw err
  })
}
/**
 * get a companies subscription records
 * @param {*} id company id
 * @returns json response
 */
export const getBillings = id => {
  return axios.get(`/api/v1/admin/companies/${id}/billings`)
  .then(result => {
    const {data} = result;
    return data.data
  })
  .catch(err => {
    console.log(err)
  })
}
/**
 * 
 * @param {int} id company id
 * @param {obj} data subscription credentials
 * @returns json res
 */
export const subscribeCompany = (id, data) => {
  axios.post(`/api/v1/admin/companies/${id}/plans`, data)
  .then(result => {
    Toast.fire({
      icon: 'success',
      title: result.data.message
    })
  })
  .catch(err => {
    Toast.fire({
      icon: 'error',
      title: err.response.data
    })
  })
}
/**
 * disable a company plan to Free
 * @param {int} id company id
 * @returns json res
 */
export const disableCompanyPlan = id => {
  axios.put(`/api/v1/admin/companies/${id}/plans`)
  .then(result => {
    Toast.fire({
      icon: 'success',
      title: result.data.message
    })
  })
  .catch(err => {
    Toast.fire({
      icon: 'error',
      title: err.response.data
    })
  })
}
export const getCompanyLocations = id => {
  return axios.get(`/api/v1/admin/companies/${id}/locations`)
  .then(result => {
    return result.data.data
  })
  .catch(err => {
    console.log(err)
  })
}