import React, { Fragment } from 'react';
import Link from 'react-router-dom/Link';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import ServiceLogin from './ServiceLogin';

const styles = theme => ({
  loginWrapper: {
    height: '50vh',
    width: '70vw',
    margin: '15vh auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  margin: {
    margin: theme.spacing.unit
  },
  margin3: {
    margin: theme.spacing.unit * 3
  }
});

function ChooseLogin({ classes }) {
  return (
    <Fragment>
      <Typography variant="h5" align="center">
        Login
      </Typography>
      <section className={classNames(classes.loginWrapper)}>
        <ServiceLogin />
        <Button
          variant="contained"
          color="secondary"
          className={classes.margin}
          component={Link}
          to="/email-login"
        >
          {' '}
          Email Login
        </Button>
        <Button
          align="center"
          component={Link}
          to="/register"
          variant="text"
          className={classes.margin3}
        >
          Not got an account? Register
        </Button>
      </section>
    </Fragment>
  );
}

export default withStyles(styles)(ChooseLogin);
