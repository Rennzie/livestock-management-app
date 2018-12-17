import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Dependancies
import axios from 'axios';
import moment from 'moment';

// Components
import CategoryExpPanel from './Panel';

const styles = theme => ({
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
    margin: theme.units,
    overflow: 'auto'
  }
});

class CategoryManager extends Component {
  state = {
    expanded: null,
    farm: null
  };

  componentDidMount() {
    const { match } = this.props;
    const { farmId } = match.params;
    axios
      .get(`/api/farms/${farmId}`)

      .then(res => this.setState(() => ({ farm: res.data })));
  }

  handleChange = panel => (event, expanded) => {
    this.setState({ expanded: expanded ? panel : false });
  };

  handleCategoryChange = category => () => {
    const { history } = this.props;
    history.push(`/manage-classes/${category.category}/changes`, { categoryId: category._id });
  };

  handleGoToHistory = category => () => {
    const id = category._id;
    const { history } = this.props;
    history.push(`/manage-classes/${category.category}/history`, { id });
  };

  render() {
    const { farm, expanded } = this.state;
    const { classes } = this.props;
    const period = moment().format('MMM-YYYY');
    return (
      <Fragment>
        {farm && (
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
                  <CategoryExpPanel
                    key={category._id}
                    category={category}
                    expanded={expanded}
                    handleChange={this.handleChange}
                    handleCategoryChange={this.handleCategoryChange}
                    handleGoToHistory={this.handleGoToHistory}
                  />
                ))}
              </section>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(CategoryManager);
