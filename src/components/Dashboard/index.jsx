import React from 'react';

import Grid from '@material-ui/core/Grid';

// Components
import FarmStatus from './FarmStatus.jsx';
import ActionsContainer from './ActionsContainer.jsx';

export default class Dashboard extends React.Component{
  render(){
    return(
      <div>
        <Grid container direction='column'>
          <h1>Welcome to your farm dashboard</h1>
          <Grid item xs={12}>
            <FarmStatus />
          </Grid>
          <Grid item xs={12}>
            <h1>What do you want to do?</h1>
            <ActionsContainer />
          </Grid>
        </Grid>
      </div>
    );
  }
}
