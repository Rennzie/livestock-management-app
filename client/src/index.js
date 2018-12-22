import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import App from './components/App';

library.add(faGoogle, faFacebook);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
