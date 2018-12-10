import React, { Fragment, Component } from 'react';

import { Typography, Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

// Dependancies
import axios from 'axios';
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

class Register extends Component {
  state = {
    username: 'Jamo',
    email: 'jamobaxter@gmail.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    passwordsMatch: true,
    firstName: 'James',
    surname: 'Baxter'
  };

  passwordsMatch = passwordConfirmation => {
    const { password } = this.state;
    let passwordsMatch = false;
    if (password === passwordConfirmation) {
      passwordsMatch = true;
    }

    return passwordsMatch;
  };

  handleChange = name => event => {
    if (name === 'passwordConfirmation') {
      const passwordsMatch = this.passwordsMatch(event.target.value);
      this.setState({ [name]: event.target.value, passwordsMatch });
    } else {
      this.setState({ [name]: event.target.value });
    }
  };

  handleRegister = () => {
    const { passwordsMatch, username, email, password } = this.state;

    if (!passwordsMatch || !username || !email || !password) {
      alert('Please complete all required fields');
    } else {
      const { history, location } = this.props;
      axios
        .post('/api/register', this.state)
        .then(res => {
          const { token } = res.data;
          Auth.setToken(token);

          history.push('/new/farm');
        })
        .catch(err => {
          console.log('register err is ===>', err.response);
          history.push(location.pathname);
        });
    }
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      firstName,
      surname,
      passwordsMatch
    } = this.state;

    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant="h5" align="center">
          Register
        </Typography>

        <TextField
          //   classes={classes.margin}
          margin="normal"
          fullWidth
          label="Username"
          id="username"
          name="username"
          required
          variant="outlined"
          value={username}
          onChange={this.handleChange('username')}
        />

        <TextField
          //   classes={classes.margin}
          margin="normal"
          fullWidth
          label="Email"
          id="email"
          name="email"
          required
          variant="outlined"
          value={email}
          onChange={this.handleChange('email')}
        />

        <TextField
          //   classes={classes.margin}
          margin="normal"
          fullWidth
          label="Password"
          id="password"
          type="password"
          name="password"
          required
          variant="outlined"
          value={password}
          onChange={this.handleChange('password')}
        />
        <TextField
          //   classes={classes.margin}
          margin="normal"
          error={!passwordsMatch}
          fullWidth
          label="Password Confirmation"
          id="passwordConfirmation"
          type="password"
          name="passwordConfirmation"
          required
          variant="outlined"
          value={passwordConfirmation}
          onChange={this.handleChange('passwordConfirmation')}
        />

        <TextField
          //   classes={classes.margin}
          margin="normal"
          fullWidth
          label="First Name"
          id="firstName"
          type="text"
          name="firstName"
          variant="outlined"
          value={firstName}
          onChange={this.handleChange('firstName')}
        />

        <TextField
          //   classes={classes.margin}
          margin="normal"
          fullWidth
          label="Surname"
          id="surname"
          type="text"
          name="surname"
          variant="outlined"
          value={surname}
          onChange={this.handleChange('surname')}
        />

        <Button
          variant="text"
          className={classes.margin}
          color="secondary"
          onClick={this.handleRegister}
        >
          Register
        </Button>
        <Button
          component={Link}
          to="/login"
          variant="text"
          className={classes.margin}
          color="secondary"
        >
          Got an account? Sign in
        </Button>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Register);
