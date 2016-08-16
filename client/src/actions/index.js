import axios from 'axios';
import {
  LOAD_USER_DATA
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
      // If response is good
      dispatch({
        type: LOAD_USER_DATA,
        payload: response.data
      });
    })
    .catch(err => {
      console.log('There was an error:', err);
    });
  }
}