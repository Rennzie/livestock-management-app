import React, { Fragment, Component } from 'react';
import withRouter from 'react-router-dom/withRouter';

import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

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

class EmailLogin extends Component {
  state = {
    email: '',
    password: ''
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
        history.push('/dashboard');
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
          Email Login
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
          </section>
          <Typography variant="caption">
            {' '}
            Please beware that there is no password recovery for this option at this stage
          </Typography>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(EmailLogin));
