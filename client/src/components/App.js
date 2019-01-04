import React, { Fragment, useState, useEffect } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChooseLogin from './auth/ChooseLogin';
import EmailLogin from './auth/EmailLogin';
import ServiceLogin from './auth/ServiceLogin';
import Register from './auth/Register';
import Pages from './Pages';

import Auth from '../lib/Auth';
/**
 *  This App component uses the new React hooks to ensure a user is logged in.
 *  This ensures that stockman can only be reached if there is a token in local memory
 *  The Auth.isAuthenticated checks to see a user has both a token and that it has not passed expirery.
 */
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // /**
  //  *  BUG: the current set up creates an infinite loop as useEffect will run
  //  *        everytime there is a render which triggers the useEffect which
  //  *        sets the state then runs the useEffect again.
  //  * */
  useEffect(() => {
    const authenticated = Auth.isAuthenticated();
    if (authenticated) {
      // console.log('the user is authenticated');
      setLoggedIn(true);
    } else {
      // console.log('the user is not authenticated');
      setLoggedIn(false);
    }
  });

  // GOAL: make the un logged in user redirect to login from any page

  return (
    <Fragment>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={ChooseLogin} />
        <Route exact path="/email-login" component={EmailLogin} />
        <Route exact path="/service-login" component={ServiceLogin} />
        <Route exact path="/register" component={Register} />
      </Switch>
      {loggedIn && <Pages />}
    </Fragment>
  );
}
export default App;
