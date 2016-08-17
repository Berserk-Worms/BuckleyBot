import {
  LOAD_USER_DATA
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case LOAD_USER_DATA:
      console.log("The load user data action payload is", action.payload);
      return { ...state, name: action.payload.name, email: action.payload.email};
  }

  return state;
}