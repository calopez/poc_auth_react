import request from 'utils/request';


export function loginRequest(body) {
  const options = { method: 'POST', body };
  const url = 'login';
  return { request, params: { url, options } };
}
