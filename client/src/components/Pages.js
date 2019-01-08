import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';

// COMPONENTS
import withStyles from '@material-ui/core/styles/withStyles';
import Dashboard from './Dashboard/index';
import FarmNew from './Farms/New';
import CategoryManager from './CategoryManager';
import CategoryNew from './Category/New';
import CategoryShow from './Category/Show';
import SecureRoute from './common/SecureRoute';
import CategoryEditDelete from './Category/EditDelete';
import NewMovement from './Category/Movement/New';
import EditDeleteMovement from './Category/Movement/EditDelete';

const styles = theme => ({
  bodyContainer: {
    height: '100%',
    overflow: 'auto',
    paddingBottom: '114px',
    marginTop: theme.spacing.unit * 8
  }
});

function Pages({ classes }) {
  return (
    <main className={classes.bodyContainer}>
      <Switch>
        <SecureRoute exact path="/dashboard" component={Dashboard} />

        {/* Add Inventory */}
        <SecureRoute exact path="/new/farm" component={FarmNew} />
        <SecureRoute exact path="/new/category" component={CategoryNew} />

        {/* Manage Categories */}
        <SecureRoute exact path="/manage-categories" component={CategoryManager} />
        <SecureRoute
          path="/manage-categories/:categoryId/movements/:movementId/edit"
          component={EditDeleteMovement}
        />
        <SecureRoute path="/manage-categories/:categoryId/movements" component={NewMovement} />
        <SecureRoute path="/manage-categories/:categoryId/edit" component={CategoryEditDelete} />
        <SecureRoute path="/manage-categories/:categoryId" component={CategoryShow} />
      </Switch>
    </main>
  );
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Pages);
