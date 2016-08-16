import {
  LOAD_USER_DATA
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case LOAD_USER_DATA:
      console.log("The load user data action payload is", action.payload);
      return { ...state, data: action.payload };
  }

  return state;
}