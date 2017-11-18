import 'whatwg-fetch';
import { isObject, get, merge } from 'lodash';
// import { URL } from 'url';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url The url we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {boolean} httpResponse If return the http response or the parsed response
 * @return {object}           The response data
 */
export default function request(url, options, httpResponse = false) {
  const accessToken = localStorage.getItem(process.env.ACCESS_TOKEN_KEY);
  // eslint-disable-next-line no-param-reassign
  url = isObject(url) ? url : new window.URL(url, process.env.BASE_URL);


  const opts = merge(options, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    } });

  if (accessToken) {
    opts.headers.Authorization = accessToken;
  }

  if (get(opts, 'body')) {
    opts.body = JSON.stringify(opts.body);
  }

  const promise = fetch(url, opts).then(checkStatus);

  return httpResponse ? promise : promise.then(parseJSON);
}
