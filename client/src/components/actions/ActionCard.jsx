import React from 'react';
import { Link } from 'react-router-dom';

import {
  Grid,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';

function ActionCard({ name, destination }) {
  return(
    <Grid item xs={12}>
      <Link to={destination}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" align='center'> { name } </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
}

export default ActionCard;
