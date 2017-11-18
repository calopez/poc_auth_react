/**
 *
 * AuthRoute
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';

import reducer from 'containers/Core/Authentication/Login/reducer';
import { makeSelectIsLoggedIn } from 'containers/Core/Authentication/Login/selectors';
import injectReducer from 'utils/injectReducer';

export class AuthRoute extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { component: Component, isLoggedIn, ...rest } = this.props;
    const renderFn = (props) => (
      isLoggedIn ?
        <Component {...props} />
        :
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    );
    return (<Route {...rest} render={renderFn} />);
  }
}

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn(),
});

const withConnect = connect(mapStateToProps, null);
const withReducer = injectReducer({ key: 'login', reducer });

export default compose(
  withReducer,
  withRouter,
  withConnect,
)(AuthRoute);
