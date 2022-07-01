import { AUTH_LOGIN } from './actionsTypes';

const initialState = {};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN: {
      // action.payload = {name: '...', id: ...}
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
}
