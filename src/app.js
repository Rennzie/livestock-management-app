import React from 'react';
import ReactDOM from 'react-dom';

console.log('app.js loaded with application');

class App extends React.Component {
  render() {
    return(
      <main>
        <div>Hello World</div>
      </main>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
