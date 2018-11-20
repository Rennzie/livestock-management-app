import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';

// COMPONENTS
import BottomNav from './components/BottomNav.jsx';

import Dashboard from './components/Dashboard/index.jsx';
import ClassManager from './components/ClassManager/index.jsx';
import ClassChange from './components/actions/ClassChange/index.jsx';
// import HerdShow from './components/Herd/Show.jsx';

import AnimalManager from './components/AnimalManager/index.jsx';

// Actions
import RegisterCalf from './components/actions/RegisterCalf/index.jsx';
import WeighAnimals from './components/actions/WeighAnimals/index.jsx';
// import WeanAnimals from './components/actions/WeanAnimals/index.jsx';
import PregTest from './components/actions/PregTest/index.jsx';
import ArchiveAnimal from './components/actions/ArchiveAnimal/index.jsx';

class App extends Component {
  render() {
    return(
      <Fragment>
        <CssBaseline />
        <Switch>
          <Route exact path='/' component={Dashboard} />

          {/* Manage Classes */}
          <Route exact path='/manage-classes' component={ClassManager} />
          <Route path='/manage-classes/changes' component={ClassChange} />

          {/* Manage Animals */}
          <Route exact path='/manage-animals' component={AnimalManager} />
          <Route path='/manage-animals/register-calf' component={RegisterCalf} />
          <Route path='/manage-animals/weigh' component={WeighAnimals} />
          <Route path='/manage-animals/preg-test' component={PregTest} />
          <Route path='/manage-animals/archive' component={ArchiveAnimal} />

        </Switch>
        <BottomNav />
      </Fragment>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
