import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest } from 'api/authentication';
import { LOGIN_REQUEST } from './constants';
import { loginSucceed, loginFailed } from './actions';

function* login(action) {
  const { request, params: { url, options } } = loginRequest(action.payload);

  try {
    const response = yield call(request, url, options, true);
    localStorage.setItem(process.env.ACCESS_TOKEN_KEY, response.headers.get('Authorization'));
    yield put(loginSucceed({ email: action.payload.login }));
  } catch (error) {
    yield put(loginFailed(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
}
