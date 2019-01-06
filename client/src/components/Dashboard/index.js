import React, { Fragment, Component } from 'react';
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
    // const { classes } = this.props;
    return (
      <Fragment>{!user ? <LoadingSpinner color="primary" /> : <FarmStatus user={user} />}</Fragment>
    );
  }
}

export default withStyles(styles)(Dashboard);
