import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Dependancies
import Axios from 'axios';
import Auth from '../../lib/Auth';

// Components
import FarmStatus from './FarmStatus';
import ActionsContainer from '../common/ActionsContainer';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class Dashboard extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    const userId = Auth.currentUserId();
    Axios.get(`/api/users/${userId}`).then(res =>
      this.setState(() => ({ user: res.data }), () => console.log(this.state))
    );
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
          <CircularProgress className={classes.progress} />
        ) : (
          <Fragment>
            <FarmStatus user={user} />
            {user.farms.map(farm => (
              <Link
                key={farm._id}
                to={`/${farm.name}/${farm._id}/manage-categories`}
                style={{ textDecoration: 'none' }}
              >
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" align="center">
                      {' '}
                      {farm.name}: Category Manager{' '}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(Dashboard);
