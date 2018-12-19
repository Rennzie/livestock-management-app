import React, { Fragment, Component } from 'react';
import Link from 'react-router-dom/Link';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

// Dependancies
import Axios from 'axios';
import Auth from '../../lib/Auth';

// Components
import FarmStatus from './FarmStatus';
import LoadingSpinner from '../common/LoadingSpinner';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class Dashboard extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    const userId = Auth.currentUserId();
    Axios.get(`/api/users/${userId}`).then(res => this.setState(() => ({ user: res.data })));
  }

  render() {
    const { user } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <Typography variant="h5" align="center">
          Stockman.io{' '}
        </Typography>
        {!user ? (
          <LoadingSpinner color="primary" />
        ) : (
          <Fragment>
            <FarmStatus user={user} />
            {user.farms.length === 0 ? (
              <Typography variant="subtitle1" align="center">
                You have not registered a farm yet.
                <Link to="/new/farm"> Click here </Link>
                to add one.
              </Typography>
            ) : (
              user.farms.map(farm => (
                <Link
                  key={farm._id}
                  to={`/${farm.name}/${farm._id}/manage-categories`}
                  style={{ textDecoration: 'none' }}
                >
                  <Card className={classes.margin}>
                    <CardContent>
                      <Typography variant="subtitle1" align="center">
                        {' '}
                        {farm.name}: Category Manager{' '}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(Dashboard);
