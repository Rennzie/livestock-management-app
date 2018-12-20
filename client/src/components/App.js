import React, { Fragment, useState, useEffect } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';

// COMPONENTS
import BottomNav from './BottomNav';

// Auth
import Login from './auth/Login';
import Register from './auth/Register';

// General
import Dashboard from './Dashboard/index';

// Farms
import FarmNew from './Farms/New';

// Category/categories
import CategoryManager from './CategoryManager';
import ChangeNew from './Category/ChangeNew';
import CategoryNew from './Category/New';
import ChangeEditDelete from './Category/ChangeEditDelete';
import CategoryShow from './Category/Show';

// Dependancies
import Auth from '../lib/Auth';

const styles = () => ({
  appBackground: {
    backgroundColor: '#fbc02d',
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

  /**
   *  BUG: the current set up creates an infinite loop as useEffect will run
   *        everytime there is a render which triggers the useEffect which
   *        sets the state then runs the useEffect again.
   * */
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

      {!loggedIn ? (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      ) : (
        <Fragment>
          <main className={classes.appBackground}>
            <Switch>
              <Route exact path="/" component={Dashboard} />

              {/* Add Inventory */}
              <Route exact path="/new/farm" component={FarmNew} />
              <Route exact path="/new/category" component={CategoryNew} />

              {/* Manage Categoryes */}
              <Route path="/:farmName/:farmId/manage-categories" component={CategoryManager} />
              <Route path="/categories/:categoryId" component={CategoryShow} />

              <Route
                path="/manage-categories/:categoryName/:categoryId/changes"
                component={ChangeNew}
              />
              <Route
                path="/manage-categories/:categoryId/changes/:changeId/edit"
                component={ChangeEditDelete}
              />
            </Switch>
            <BottomNav />
          </main>
        </Fragment>
      )}
    </Fragment>
  );
}
export default withStyles(styles)(App);
