import React from 'react';

import { Grid } from '@material-ui/core';

import ActionCard from '../actions/ActionCard';

function ActionsContainer({ actions }) {
  return (
    <Grid container>
      {actions.map(action => (
        <ActionCard key={action.name} name={action.name} destination={action.destination} />
      ))}
    </Grid>
  );
}

export default ActionsContainer;
