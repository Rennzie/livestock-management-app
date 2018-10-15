import React from 'react';

import Grid from '@material-ui/core/Grid';

// Components
import FarmStatus from './FarmStatus.jsx';
import Herds from './Herds.jsx';

export default class Dashboard extends React.Component{
  render(){
    return(
      <Grid container direction='column'>
        <Grid>
          <FarmStatus />
        </Grid>
        <Grid item xs={12}>
          <Herds />
        </Grid>
      </Grid>
    );
  }
}
