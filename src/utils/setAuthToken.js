import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply token to every request made in the app
    axios.defaults.headers.common['Authorization'] = token
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization']
  }
};

export default setAuthToken;