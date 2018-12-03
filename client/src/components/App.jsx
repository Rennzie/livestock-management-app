import React, { Fragment, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

// COMPONENTS
import BottomNav from './BottomNav';

// Auth
import Login from './auth/Login';

import Dashboard from './Dashboard/index';
import ClassManager from './ClassManager';
import ClassChange from './actions/ClassChange';
import ClassHistory from './Class/ClassHistory';

import AnimalManager from './AnimalManager';

// Actions
import RegisterCalf from './actions/RegisterCalf';
import WeighAnimals from './actions/WeighAnimals';
// import WeanAnimals from './actions/WeanAnimals';
import PregTest from './actions/PregTest';
import ArchiveAnimal from './actions/ArchiveAnimal';

// Dependancies
import Auth from '../lib/Auth';

/**
 *  This App component uses the new React hooks to ensure a user is logged in.
 *  This ensures that stockman can only be reached if there is a token in local memory
 *  The Auth.isAuthenticated checks to see a user has both a token and that it has not passed expirery.
 */
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Note: this effect keeps running so may cause perfomance issues later
  useEffect(() => {
    const authenticated = Auth.isAuthenticated();

    if (authenticated) {
      setLoggedIn(true);
    }
  });

  return (
    <Fragment>
      <CssBaseline />

      {!loggedIn ? (
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/register" component={Register} /> */}
        </Switch>
      ) : (
        <Fragment>
          <Switch>
            <Route exact path="/" component={Dashboard} />

            {/* Manage Classes */}
            <Route exact path="/manage-classes" component={ClassManager} />
            <Route path="/manage-classes/:className/changes" component={ClassChange} />
            <Route path="/manage-classes/:className/history" component={ClassHistory} />

            {/* Manage Animals */}
            <Route exact path="/manage-animals" component={AnimalManager} />
            <Route path="/manage-animals/register-calf" component={RegisterCalf} />
            <Route path="/manage-animals/weigh" component={WeighAnimals} />
            <Route path="/manage-animals/preg-test" component={PregTest} />
            <Route path="/manage-animals/archive" component={ArchiveAnimal} />
          </Switch>
          <BottomNav />
        </Fragment>
      )}
    </Fragment>
  );
}
