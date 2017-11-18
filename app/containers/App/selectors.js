/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => {
  state.get('route');
};

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

/* Routing */

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

/* Logging */

const makeSelectIsLoggedIn = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['login', 'isLoggedIn'])
);

const makeSelectRedirectURL = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['login', 'redirectURL']) || '/'
);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectIsLoggedIn,
  makeSelectRedirectURL,
};
