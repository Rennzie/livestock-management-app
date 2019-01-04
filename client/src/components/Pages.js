import React from 'react';
import Switch from 'react-router-dom/Switch';

// COMPONENTS
import Dashboard from './Dashboard/index';
import FarmNew from './Farms/New';
import CategoryManager from './CategoryManager';
import ChangeNew from './Category/ChangeNew';
import CategoryNew from './Category/New';
import ChangeEditDelete from './Category/ChangeEditDelete';
import CategoryShow from './Category/Show';
import SecureRoute from './common/SecureRoute';

function Pages() {
  return (
    <Switch>
      <SecureRoute exact path="/dashboard" component={Dashboard} />

      {/* Add Inventory */}
      <SecureRoute exact path="/new/farm" component={FarmNew} />
      <SecureRoute exact path="/new/category" component={CategoryNew} />

      {/* Manage Categories */}
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
  );
}

export default Pages;
