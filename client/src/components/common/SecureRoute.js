import React from 'react';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import Auth from '../../lib/Auth';

/**
 *  A parent component to check if a user is logged in
 *  if not they will be directed to the login page
 */

export default function SecureRoute({ exact, component, path }) {
  if (!Auth.isAuthenticated()) {
    return <Redirect to="/" />;
  }
  return <Route exact={exact} path={path} component={component} />;
}
