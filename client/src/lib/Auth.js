import moment from 'moment';

const Auth = {};

Auth.getToken = function getToken() {
  return localStorage.getItem('token');
};

/**
 *  @type function
 *
 *  Checks to see if a user has a token that has not expired.
 *  Returns bolean response
 */

Auth.isAuthenticated = function isAuthenticated() {
  const token = localStorage.getItem('token');

  if (!token) return false;

  const payload = this.getPayload();
  const now = moment().unix();

  if (now > payload.exp) return false;

  return true;
};

Auth.removeToken = function removeToken() {
  localStorage.removeItem('token');
};

Auth.setToken = function setToken(token) {
  localStorage.setItem('token', token);
};

// Decode the token and get values which are on it.
Auth.getPayload = function getPayload() {
  const token = this.getToken();
  const payload = token.split('.')[1];

  return JSON.parse(atob(payload));
};

Auth.currentUserName = function currentUserName() {
  return this.getPayload().username;
};

Auth.currentUserId = function currentUserId() {
  return this.getPayload().sub;
};

Auth.bearerHeader = function bearerHeader() {
  return {
    // request options
    headers: {
      // request header
      authorization: `Bearer ${Auth.getToken()}`
    }
  };
};

export default Auth;
