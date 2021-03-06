/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
 SET_REDIRECT_URL,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  login: {
    isLoggedIn: false,
    redirectURL: '/',
  },
  userData: {
    repositories: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REDIRECT_URL:
      return state.setIn(['login', 'redirectURL'], action.url);
    default:
      return state;
  }
}

export default appReducer;
