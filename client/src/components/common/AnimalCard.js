import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function AnimalCard({ animal, handleClick }) {
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent onClick={handleClick}>
          <Grid container alignItems="center">
            <Grid item xs={8}>
              <p> {animal.identifier} </p>
            </Grid>
            <Grid item xs={4}>
              <p> {animal.breed} </p>
              <p> {animal.category} </p>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default AnimalCard;
