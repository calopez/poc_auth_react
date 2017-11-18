/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOGIN_REQUEST_SUCCEED,
  LOGIN_REQUEST_FAILED,
} from './constants';

const initialState = fromJS({
  isLoggedIn: false,
  currentUser: {},
});

function loginReducer(state = initialState, action) {
  const key = process.env.ACCESS_TOKEN_KEY;
  const isLoggedIn = Boolean(localStorage.getItem(key));

  switch (action.type) {
    case LOGIN_REQUEST_SUCCEED:
      return state.set('isLoggedIn', isLoggedIn)
                  .set('currentUser', action.payload);

    case LOGIN_REQUEST_FAILED:
      localStorage.removeItem(key);
      return state.set('error', action.payload.message)
                  .set('currentUser', null)
                  .set('isLoggedIn', false);
    default:
      return state;
  }
}

export default loginReducer;
