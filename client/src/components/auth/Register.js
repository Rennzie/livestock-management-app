import React, { Fragment, Component } from 'react';
import Link from 'react-router-dom/Link';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

// Dependancies
import axios from 'axios';
import Auth from '../../lib/Auth';

// Components
import SubmitButton from '../common/SubmitButton';

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
    allSet: false,
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    passwordsMatch: true,
    firstName: '',
    surname: ''
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
    this.validateForm();
  };

  // BUG: the button does not disable itself if the passwords are not matched
  validateForm = () => {
    const { passwordsMatch, username, email, password } = this.state;
    if (passwordsMatch && username && email && password) {
      this.setState({ allSet: true });
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
      passwordsMatch,
      allSet
    } = this.state;

    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant="h5" align="center">
          Register
        </Typography>

        <TextField
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

        <SubmitButton
          disabled={!allSet}
          variant="text"
          className={classes.margin}
          color="secondary"
          handleClick={this.handleRegister}
          name="REGISTER"
        />
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
