import React from 'react';
import Switch from 'react-router-dom/Switch';
import withStyles from '@material-ui/core/styles/withStyles';

// COMPONENTS
import BottomNav from './BottomNav';
import Header from './Header';
import Dashboard from './Dashboard/index';
import FarmNew from './Farms/New';
import CategoryManager from './CategoryManager';
import ChangeNew from './Category/ChangeNew';
import CategoryNew from './Category/New';
import ChangeEditDelete from './Category/ChangeEditDelete';
import CategoryShow from './Category/Show';
import SecureRoute from './common/SecureRoute';

const styles = () => ({
  appBackground: {
    backgroundColor: '#fbc02d',
    height: '100vh',
    width: '100vw'
  }
});

function Pages({ classes }) {
  return (
    <main className={classes.appBackground}>
      <Header />
      <Switch>
        <SecureRoute exact path="/dashboard" component={Dashboard} />

        {/* Add Inventory */}
        <SecureRoute exact path="/new/farm" component={FarmNew} />
        <SecureRoute exact path="/new/category" component={CategoryNew} />

        {/* Manage Categoryes */}
        <SecureRoute path="/:farmName/:farmId/manage-categories" component={CategoryManager} />
        <SecureRoute path="/categories/:categoryId" component={CategoryShow} />

        <SecureRoute
          path="/manage-categories/:categoryName/:categoryId/changes"
          component={ChangeNew}
        />
        <SecureRoute
          path="/manage-categories/:categoryId/changes/:changeId/edit"
          component={ChangeEditDelete}
        />
      </Switch>
      <BottomNav />
    </main>
  );
}

export default withStyles(styles)(Pages);
