import axios from 'axios';
import { store } from '../store/';

const API = process.env.API_URL;
const TOKEN = store.state.auth.token;

const client = axios.create({
  baseURL: API
});

/**
 * Request Wrapper with default success/error actions
 */

const request = function(options) {
  const onSuccess = function(response) {
    //console.debug('Request Successful!', response);
    return response.data;
  };

  const onError = function(error) {
    console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

const requests = {
  put: (url, payload) =>
    request({
      url: url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: TOKEN || ''
      },
      data: payload
    }),
  get: url =>
    request({
      url: url,
      method: 'GET',
      headers: {
        token: TOKEN || ''
      }
    }),
  post: (url, payload) =>
    request({
      url: url,
      method: 'POST',
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        token: TOKEN || ''
      }
    }),
  delete: url =>
    request({
      url: url,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: TOKEN || ''
      }
    })
};

const Auth = {
  login: user => requests.post('/users', user),
  verifyToken: token =>
    request({
      url: '/users',
      method: 'get',
      headers: {
        token
      }
    }),
  signup: user => requests.put('/users', user),
  logout: () => {
    /* */
  }
};

export default { Auth };
