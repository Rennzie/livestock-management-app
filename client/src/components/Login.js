import React from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import ChooseLogin from './auth/ChooseLogin';
import EmailLogin from './auth/EmailLogin';
import ServiceLogin from './auth/ServiceLogin';
import Register from './auth/Register';

// COMPONENTS

function Login() {
  return (
    <Switch>
      <Route exact path="/" component={ChooseLogin} />
      <Route exact path="/email-login" component={EmailLogin} />
      <Route exact path="/service-login" component={ServiceLogin} />
      <Route exact path="/register" component={Register} />
    </Switch>
  );
}

export default Login;
