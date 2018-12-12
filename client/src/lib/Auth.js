// @ts-check

import moment from 'moment';

const Auth = {};

Auth.getToken = function getToken() {
  return localStorage.getItem('token');
};

/**
 *  @type function
 *
 *  Checks to see if a user has a token that has not expired.
 *  Returns false when there is no token
 *  Returns false if there is a token but it has expired
 *    this will also remove the token from local storage
 *  Returns true if there is a valid token
 */

Auth.isAuthenticated = function isAuthenticated() {
  const token = localStorage.getItem('token');

  if (!token) return false;

  const expirery = this.getPayload().exp;
  const now = moment().unix();
  const checkValid = now > expirery;
  if (checkValid) {
    localStorage.removeItem('token');
    return false;
  }

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
