/*
 *
 * Login actions
 *
 */

import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCEED,
  LOGIN_REQUEST_FAILED,
} from './constants';

export function loginSucceed(currentUser) {
  return {
    type: LOGIN_REQUEST_SUCCEED,
    payload: currentUser,
  };
}

export function loginFailed(error) {
  return {
    type: LOGIN_REQUEST_FAILED,
    error: true,
    payload: new Error(error),
  };
}

export function loginRequest(login, password) {
  return {
    type: LOGIN_REQUEST,
    payload: { login, password },
  };
}
