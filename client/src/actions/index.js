import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  LOAD_USER_DATA,
  AUTH_USER,
  UNAUTH_USER,
} from './types';

const ROOT_URL = 'http://localhost:8080';

export function getUserData() {
  return function(dispatch) {
    // Submit jwt to the server
    axios.get(`${ROOT_URL}/slack/users/data`, {
      headers: { authorization: localStorage.getItem('jwt') }
    })
    .then(response => {
      console.log('Response to getting user data:', response.data);
      // If response is good then load the user data
      dispatch({
        type: LOAD_USER_DATA,
        payload: response.data
      });
    })
    .catch(err => {
      console.log('There was an error:', err);
      // remove jwt and redirect to / if there was an error 
      // (this might be ungraceful error handling)
      signoutUser();
      browserHistory.push('/');
    });
  }
}

export function signInUser() {
  return { type: AUTH_USER };
}

export function signoutUser() {
  localStorage.removeItem('jwt');
  return { type: UNAUTH_USER };
}
