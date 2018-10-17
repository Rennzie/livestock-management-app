import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Card, CardContent } from '@material-ui/core';

function ActionCard({ name, destination }) {
  return(
    <Link to={destination}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <p> {name} </p>
          </CardContent>
        </Card>
      </Grid>
    </Link>
  );
}

export default ActionCard;
