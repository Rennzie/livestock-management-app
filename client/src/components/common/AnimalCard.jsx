import React from 'react';

import {
  Grid,
  Card,
  CardContent
} from '@material-ui/core';

function AnimalCard({ animal, handleClick }) {
  return(
    <Grid item xs={12}>
      <Card>
        <CardContent onClick={handleClick}>
          <Grid container alignItems='center'>
            <Grid item xs={8} >
              <p> { animal.identifier } </p>
            </Grid>
            <Grid item xs={4} >
              <p> { animal.breed } </p>
              <p> { animal.category } </p>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default AnimalCard;
