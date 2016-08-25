import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  LOAD_USER_DATA,
  UPDATE_USER_JOB,
  AUTH_USER,
  UNAUTH_USER,
} from './types';

const BASE_URL = window.location.origin;

export function getUserData() {
  return function(dispatch) {
    // Submit jwt to the server
    axios.get(`${BASE_URL}/slack/users/data`, {
      headers: { authorization: localStorage.getItem('jwt') }
    })
    .then(response => {
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

export function deleteJob(jobId, index) {
  return function(dispatch) {

    axios.delete(`${BASE_URL}/api/user/jobs/${jobId}`, {
      headers: { authorization: localStorage.getItem('jwt') }
    })
    .then(res => {
        dispatch({
          type: UPDATE_USER_JOB,
          payload: index
        });
    })
    .catch(err => {
      console.log('There was an error deleting entry:', err);
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
