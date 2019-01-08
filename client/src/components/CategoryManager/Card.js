import React from 'react';
import PropTypes from 'prop-types';
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
  padding: {
    padding: theme.spacing.unit * 1.5
  },
  spreadRow: {
    display: 'flex',
    justifyContent: 'space-between',
    textDecoration: 'none'
  },
  paddingLeft: {
    paddingLeft: theme.spacing.unit * 3
  },
  paddingRight: {
    paddingRight: theme.spacing.unit * 3
  }
});

function CategoryCard({ category, classes }) {
  return (
    <Paper
      component={Link}
      to={`/manage-categories/${category._id}`}
      className={classNames(classes.margin, classes.padding, classes.spreadRow)}
    >
      <CapitalizeText className={classes.margin} gutterBottom variant="subtitle2">
        {category.category}
      </CapitalizeText>
      <div>
        <Typography className={classes.margin} variant="body1">
          Total: {category.currentMonthDetail.closingTotal}
        </Typography>
        <Typography className={classes.margin} variant="body1">
          LSU: {Math.round(category.stockUnits)}
        </Typography>
        <Typography className={classes.margin} variant="body1">
          LSU Factor: {category.stockUnitFactor}
        </Typography>
      </div>
    </Paper>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoryCard);
