import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER
} from './types';

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}


//TODO:
  //Sign in 
    //Need to set token on localstorage