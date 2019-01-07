import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

// Dependancies
import axios from 'axios';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import Auth from '../../lib/Auth';

// Components
import CategoryCard from './Card';
import LoadingSpinner from '../common/LoadingSpinner';
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

class CategoryManager extends Component {
  state = {
    farms: null
  };

  /**
   * fetchs a user populated with farm data
   * if there is only one farm it diaplays that farm,
   * if there are additional farms then it diaplays which farms to select
   */
  componentDidMount() {
    const userId = Auth.currentUserId();
    axios.get(`/api/users/${userId}`).then(res => {
      const { farms } = res.data;
      if (farms.length === 1) {
        this.setState({ farms, selectedFarm: farms[0] });
      } else {
        this.setState({ farms });
      }
    });
  }

  sortAsc = (items, sortField) => orderBy(items, item => item[sortField], ['asc']);

  handleFarmSelect = farm => () => {
    this.setState(() => ({ selectedFarm: farm }));
  };

  render() {
    const { farms, selectedFarm } = this.state;
    const { classes } = this.props;
    const period = moment().format('MMM-YYYY');
    return (
      <Fragment>
        {!farms ? (
          <LoadingSpinner />
        ) : (
          <Fragment>
            <section>
              <Typography variant="h5" align="center">
                {!selectedFarm ? 'CategoryManager' : selectedFarm.name}
              </Typography>
              <Typography variant="subtitle1" align="center">
                {period}
              </Typography>
            </section>

            {!selectedFarm && farms && (
              <Fragment>
                {this.sortAsc(farms, 'name').map(farm => (
                  <Paper
                    key={farm._id}
                    onClick={this.handleFarmSelect(farm)}
                    className={classNames(classes.margin, classes.padding, classes.spreadRow)}
                  >
                    <CapitalizeText className={classes.margin} gutterBottom variant="subtitle2">
                      {farm.name}
                    </CapitalizeText>
                    <div>
                      <Typography className={classes.margin} variant="body1">
                        Total: {farm.totalAnimals}
                      </Typography>
                    </div>
                  </Paper>
                ))}
              </Fragment>
            )}

            {selectedFarm && (
              <section>
                {this.sortAsc(selectedFarm.categories, 'category').map(category => (
                  <CategoryCard key={category._id} category={category} />
                ))}
              </section>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

CategoryManager.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoryManager);
