import { AUTH_LOGIN, AUTH_LOGOUT } from './actionsTypes';

const initialState = { age: 10};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN: {
      // action.payload = {name: '...', id: ...}
      return { ...action.payload };
    }
    case AUTH_LOGOUT: {
      // action.payload = {name: '...', id: ...}
      return {};
    }

    default:
      return state;
  }
}
