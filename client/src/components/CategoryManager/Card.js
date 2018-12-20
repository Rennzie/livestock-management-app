import React from 'react';
import classNames from 'classnames';
import Link from 'react-router-dom/Link';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CapitalizeText from '../common/CapitalizeText';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  spreadRow: {
    display: 'flex',
    justifyContent: 'space-between',
    textDecoration: 'none'
  }
});

function CategoryCard({ category, classes }) {
  return (
    <Paper
      component={Link}
      to={`/categories/${category._id}`}
      className={classNames(classes.margin, classes.spreadRow)}
    >
      <CapitalizeText className={classes.margin} gutterBottom variant="subtitle2">
        {category.category}
      </CapitalizeText>
      <Typography className={classes.margin} variant="body1">
        Total: {category.currentMonthDetail.closingTotal}
      </Typography>
    </Paper>
  );
}

export default withStyles(styles)(CategoryCard);
