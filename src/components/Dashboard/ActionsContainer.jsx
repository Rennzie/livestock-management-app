import React from 'react';

import { Grid } from '@material-ui/core';

import ActionCard from './ActionCard.jsx';

export default class ActionsContainer extends React.Component{
  state={
    actions: [
      {name: 'Manage Herds', destination: '/herds'},
      {name: 'Register Calf', destination: '/register/calf'}
    ]
  }

  render() {
    return(
      <Grid container>
        {this.state.actions.map( action =>
          <ActionCard
            key={action.name}
            name={action.name}
            destination={action.destination} />
        )}
      </Grid>
    );
  }
}
