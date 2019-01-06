import React from 'react';
import Switch from 'react-router-dom/Switch';

// COMPONENTS
import { withStyles } from '@material-ui/core';
import Dashboard from './Dashboard/index';
import FarmNew from './Farms/New';
import CategoryManager from './CategoryManager';
import CategoryNew from './Category/New';
import CategoryShow from './Category/Show';
// import ChangeEditDelete from './Category/Change/EditDelete';
import SecureRoute from './common/SecureRoute';
import CategoryEditDelete from './Category/EditDelete';
import NewMovement from './Category/Movement/New';

const styles = theme => ({
  bodyContainer: {
    height: '100%',
    overflow: 'auto',
    paddingBottom: '112px'
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
        <SecureRoute path="/categories/:categoryId/edit" component={CategoryEditDelete} />
        <SecureRoute path="/categories/:categoryId" component={CategoryShow} />

        {/* Category Movements */}
        <SecureRoute
          path="/manage-categories/:categoryName/:categoryId/changes"
          component={NewMovement}
        />
        {/* <SecureRoute
        path="/manage-categories/:categoryId/changes/:changeId/edit"
        component={ChangeEditDelete}
      /> */}
      </Switch>
    </main>
  );
}

export default withStyles(styles)(Pages);
