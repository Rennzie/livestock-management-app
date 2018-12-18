import React, { Fragment, Component } from 'react';

// components
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import SubmitButton from '../common/SubmitButton';

// dependancies
import Auth from '../../lib/Auth';

const styles = theme => ({
  fromWrapper: {
    height: '50vh',
    width: '70vw',
    margin: '25vh auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  margin: {
    margin: theme.spacing.unit
  }
});

class NewFarm extends Component {
  state = {
    name: ''
  };

  handleRegister = () => {
    const newFarmOne = {};
    const { name } = this.state;

    newFarmOne.name = name;
    newFarmOne.farmOwner = Auth.currentUserId();

    const { history } = this.props;
    axios.post('/api/farms', newFarmOne).then(() => history.push('/'));
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  // form with name
  // axios.post to /api/farms
  // add current user id from auth.sub to the axios object

  // NOTE: will add in a plus button so multiple farms can be registered at the same time
  render() {
    const { name } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <Typography variant="h5" align="center">
          Register Farm
        </Typography>

        <TextField
          margin="normal"
          fullWidth
          label="Farm Name"
          id="name"
          name="name"
          required
          variant="outlined"
          value={name}
          onChange={this.handleChange('name')}
        />

        <SubmitButton
          disabled={!name}
          variant="text"
          className={classes.margin}
          color="secondary"
          handleClick={this.handleRegister}
          name="REGISTER"
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(NewFarm);
