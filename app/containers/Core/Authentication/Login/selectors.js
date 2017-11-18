import { createSelector } from 'reselect';

/**
 * Direct selector to the login state domain
 */
const selectLoginDomain = (state) => state.get('login');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Login
 */

const makeSelectLogin = () => createSelector(
  selectLoginDomain,
  (s) => s.toJS()
);

const makeSelectIsLoggedIn = () => createSelector(
  selectLoginDomain, () => Boolean(localStorage.getItem(process.env.ACCESS_TOKEN_KEY))
);

export {
  selectLoginDomain,
  makeSelectLogin,
  makeSelectIsLoggedIn,
};
