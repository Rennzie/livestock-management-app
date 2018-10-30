import React from 'react';

import { Grid } from '@material-ui/core';

import ActionCard from '../actions/ActionCard.jsx';

export default class ActionsContainer extends React.Component{
  state={
    actions: [
      {name: 'Manage Herds', destination: '/herds'},
      {name: 'Register Calf', destination: '/register/calf'},
      {name: 'Weigh Animals', destination: '/weighing'},
      {name: 'Preg Test', destination: '/pregtesting'},
      {name: 'Wean Animals', destination: '/weaning'},
      {name: 'Archive Animal', destination: '/archive'}
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
