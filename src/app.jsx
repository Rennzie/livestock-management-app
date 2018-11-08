import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// COMPONENTS
import AppMenu from './components/AppMenu.jsx';

import Dashboard from './components/Dashboard/index.jsx';
import Herds from './components/Herd/index.jsx';
import HerdShow from './components/Herd/Show.jsx';
import AnimalManager from './components/AnimalManager/index.jsx';

// Actions
import RegisterCalf from './components/actions/RegisterCalf/index.jsx';
// import WeighAnimals from './components/actions/WeighAnimals/index.jsx';
// import WeanAnimals from './components/actions/WeanAnimals/index.jsx';
// import PregTest from './components/actions/PregTest/index.jsx';
// import ArchiveAnimal from './components/actions/ArchiveAnimal/index.jsx';

class App extends React.Component {
  render() {
    return(
      <main>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/herds' component={Herds} />
          <Route path='/herds/:id' component={HerdShow} />

          <Route exact path='/manage-animals' component={AnimalManager} />
          {/* Actions */}

        </Switch>
        <AppMenu />
      </main>
    );
  }
}
// <Route path='/manage-animals/register-calf' component={RegisterCalf} />

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


// <Route path='/weighing' component={WeighAnimals} />
// <Route path='/weaning' component={WeanAnimals} />
// <Route path='/pregtesting' component={PregTest} />
// <Route path='/archive' component={ArchiveAnimal} />
