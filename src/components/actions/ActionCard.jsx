import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Card, CardContent } from '@material-ui/core';

function ActionCard({ name, destination }) {
  return(
    <Grid item xs={6}>
      <Link to={destination}>
        <Card>
          <CardContent>
            <p> {name} </p>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
}

export default ActionCard;
