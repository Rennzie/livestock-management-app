import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// COMPONENTS
// import AppMenu from './components/AppMenu.jsx';

import Dashboard from './components/Dashboard/index.jsx';
import Herds from './components/Herd/index.jsx';
import HerdShow from './components/Herd/Show.jsx';

// Actions
import RegisterCalf from './components/actions/RegisterCalf/index.jsx';
import WeighAnimals from './components/actions/WeighAnimals/index.jsx';
import WeanAnimals from './components/actions/WeanAnimals/index.jsx';
import PregTest from './components/actions/PregTest/index.jsx';

class App extends React.Component {
  render() {
    return(
      <main>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/herds' component={Herds} />
          <Route path='/herds/:id' component={HerdShow} />

          {/* Actions */}
          <Route path='/register/calf' component={RegisterCalf} />
          <Route path='/weighing' component={WeighAnimals} />
          <Route path='/weaning' component={WeanAnimals} />
          <Route path='/pregtesting' component={PregTest} />
        </Switch>
        {/* <AppMenu /> */}
      </main>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
