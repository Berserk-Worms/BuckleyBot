import {
  LOAD_USER_DATA
} from '../actions/types';

const initialState = {
  name: '',
  location: '',
  photo: '',
  jobs: [{}]
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_DATA:
      return { 
        ...state, 
        name: action.payload.name, 
        location: action.payload.location,
        photo: action.payload.photo,
        jobs: action.payload.jobs
      };
  }

  return state;
}