import React from 'react';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

import { Grid, Card, CardContent } from '@material-ui/core';

function HerdCard({ herd }) {
  return (
    <Grid item xs={12} key={herd._id}>
      <Card>
        <CardContent>
          <Grid container alignItems='center'>
            <Grid item xs={10} >
              <p> {herd.name} </p>
              <p> {capitalizeFirstLetter(herd.category)} </p>
            </Grid>
            <Grid item xs={2} > {herd.totalAnimals} </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default HerdCard;
