/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';

import { loginRequest } from './actions';
import { makeSelectIsLoggedIn } from './selectors';
import reducer from './reducer';
import saga from './saga';

import styles from './styles.css';


export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.login = props.login;
    // this.state = { email: '', password: '' };
  }

  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.history.replace('/');
    }
  }

  handleLogin() {
    this.login(this.emailInput.value, this.passwordInput.value);
  }


  render() {
    return (
      this.props.isLoggedIn ?
        <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
        :
        <div className="wrapper">
          <div className={styles.outerScreen}>
            <div className={styles.innerScreen}>
              <div className="form">
                <input
                  type="text"
                  className={styles.zocialDribbble}
                  placeholder="Enter your email"
                  ref={(input) => {
                    this.emailInput = input;
                  }}
                />
                <input
                  type="text"
                  placeholder="Password"
                  ref={(input) => {
                    this.passwordInput = input;
                  }}
                />
                <input type="submit" onClick={this.handleLogin} tabIndex={-1} value="Login" />
                <a href="">Lost your password?</a>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch(loginRequest(email, password)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
