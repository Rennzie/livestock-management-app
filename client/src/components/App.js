import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Pages from './Pages';
import Login from './Login';

import Auth from '../lib/Auth';

import BottomNav from './BottomNav';
import Header from './Header';
import TopNav from './TopNav';

const styles = () => ({
  appBackground: {
    backgroundColor: '#fbc02d',
    position: 'fixed',
    top: '0',
    height: '100vh',
    width: '100vw'
  }
});

/**
 *  This App component uses the new React hooks to ensure a user is logged in.
 *  This ensures that stockman can only be reached if there is a token in local memory
 *  The Auth.isAuthenticated checks to see a user has both a token and that it has not passed expirery.
 */

function App({ classes }) {
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

  return (
    <Fragment>
      <CssBaseline />
      <main className={classes.appBackground}>
        {!loggedIn && <Header />}
        {loggedIn && <TopNav />}
        <Login />
        <Pages />
        {loggedIn && <BottomNav />}
      </main>
    </Fragment>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
