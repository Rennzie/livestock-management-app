import React from 'react';
import { withRouter } from 'react-router-dom';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

import { Grid, Card, CardContent, Typography } from '@material-ui/core';

function HerdCard({ herd, onClick }) {

  //create a card conditional on the herd category
  //do the breeding herd first

  return (
    <Grid item xs={12} key={herd._id}>
      <Card>
        <CardContent onClick={onClick}>

          {herd.category === 'cows' &&
            <Grid container >
              <Grid item xs={12} >
                <Typography variant='h6' align='center'> {herd.name} </Typography>
                <Typography variant='subtitle1'> Category:  {capitalizeFirstLetter(herd.category)} </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant='subtitle2'>
                  Total Animals: {herd.totalAnimals}
                </Typography>
                <Typography variant='subtitle2'>
                  Total Cows: {herd.totalAnimals - herd.totalCalves}
                </Typography>
                <Typography variant='subtitle2'>
                  Total Calves: {herd.totalCalves}
                </Typography>
              </Grid>

              <Grid item xs={6} >
                <Typography variant='subtitle2'>
                  Total Pregnant Cows: {herd.totalPregnant}
                </Typography>
              </Grid>
            </Grid>
          }

          {herd.category === 'pasturelot' &&
            <Grid container >
              <Grid item xs={12} >
                <Typography variant='h6' align='center'> {herd.name} </Typography>
                <Typography variant='subtitle1'> Category:  {capitalizeFirstLetter(herd.category)} </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant='subtitle2'>
                  Total Animals: {herd.totalAnimals}
                </Typography>
              </Grid>

              <Grid item xs={6} >
                <Typography variant='subtitle2'>
                  Average Weight: {herd.averageWeight} /animal
                </Typography>
              </Grid>
            </Grid>
          }
          {(herd.category !== 'pasturelot' && herd.category !== 'cows') &&
            <Grid container >
              <Grid item xs={12} >
                <Typography variant='h6' align='center'> {herd.name} </Typography>
                <Typography variant='subtitle1'> Category:  {capitalizeFirstLetter(herd.category)} </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant='subtitle2'>
                  Total Animals: {herd.totalAnimals}
                </Typography>
              </Grid>

              <Grid item xs={6} >
                <Typography variant='subtitle2'>
                  Average Weight: {herd.averageWeight} /animal
                </Typography>
              </Grid>
            </Grid>
          }



        </CardContent>
      </Card>
    </Grid>
  );
}

export default withRouter(HerdCard);
