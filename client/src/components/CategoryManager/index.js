import React, { Component, Fragment } from 'react';
import Link from 'react-router-dom/Link';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

// Dependancies
import axios from 'axios';
import moment from 'moment';

// Components
import CategoryCard from './Card';
import LoadingSpinner from '../common/LoadingSpinner';

const styles = () => ({
  header: {
    position: 'fixed',
    width: '100%',
    zIndex: 2,
    top: 0
  },
  panelContainer: {
    marginTop: 56,
    marginBottom: 56,
    height: '100%',
    overflow: 'auto'
  }
});

class CategoryManager extends Component {
  state = {
    farm: null
  };

  componentDidMount() {
    const { match } = this.props;
    const { farmId } = match.params;
    axios
      .get(`/api/farms/${farmId}`)

      .then(res => this.setState(() => ({ farm: res.data })));
  }

  handleCategoryChange = category => () => {
    const { history } = this.props;
    history.push(`/manage-classes/${category.category}/changes`, { categoryId: category._id });
  };

  handleGoToHistory = category => () => {
    const id = category._id;
    const { history } = this.props;
    history.push(`/manage-categories/${id}/changes/history`);
  };

  render() {
    const { farm } = this.state;
    const { classes } = this.props;
    const period = moment().format('MMM-YYYY');
    return (
      <Fragment>
        {farm ? (
          <Fragment>
            <section className={classes.header}>
              <Paper square>
                <Typography variant="h5" align="center">
                  {farm.name} Category Manager
                </Typography>
                <Typography variant="subtitle1" align="center">
                  {period}
                </Typography>
              </Paper>
            </section>
            {farm.categories.length === 0 ? (
              <section className={classes.panelContainer}>
                <Typography variant="subtitle1" align="center">
                  You have not registered any categories for {farm.name} yet.
                  <Link to={{ pathname: '/new/category', state: { farm } }}> Click here </Link>
                  to add one.
                </Typography>
              </section>
            ) : (
              <section className={classes.panelContainer}>
                {farm.categories.map(category => (
                  <CategoryCard key={category._id} category={category} />
                ))}
              </section>
            )}
          </Fragment>
        ) : (
          <LoadingSpinner />
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(CategoryManager);
