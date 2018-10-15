import React from 'react';
import ReactDOM from 'react-dom';

// COMPONENTS
import Dashboard from './components/Dashboard/index.jsx';


console.log('app.js loaded with application');

class App extends React.Component {
  render() {
    return(
      <main>
        <Dashboard />
      </main>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
