import React, { Fragment, Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { Typography, Input, FormControl, InputLabel, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

class Login extends Component {
  state = {
    // passwordVisible: false,
    email: 'rnnsea001@gmail.com',
    password: 'pass'
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleLogin = () => {
    axios
      .post('/api/login', this.state)
      .then(res => {
        const { token } = res.data;
        Auth.setToken(token);

        const { history } = this.props;
        history.push('/');
      })
      .catch(err => {
        console.log('login err is ===>', err.response);
        const { history, location } = this.props;
        history.push(location.pathname);
      });
  };

  render() {
    const { email, password } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant="h5" align="center">
          Login
        </Typography>

        <div className={classes.fromWrapper}>
          <section className={classes.form}>
            <FormControl className={classes.margin}>
              <InputLabel shrink htmlFor="email">
                Email
              </InputLabel>
              <Input
                fullWidth
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={this.handleChange('email')}
              />
            </FormControl>
            <FormControl className={classes.margin}>
              <InputLabel shrink htmlFor="password">
                Password
              </InputLabel>
              <Input
                fullWidth
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={this.handleChange('password')}
              />
            </FormControl>

            <Button className={classes.margin} onClick={this.handleLogin} color="secondary">
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="text"
              className={classes.margin}
              color="secondary"
            >
              Not got an account? Register
            </Button>
          </section>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Login));
