import React from 'react';
import { Fragment } from 'react';

import { Route } from 'react-router-dom';

import { Typography } from '@material-ui/core';

// components
import ActionsContainer from '../common/ActionsContainer.jsx';
import RegisterCalf from '../actions/RegisterCalf/index.jsx';

function Test() {
  return(
    <div>Testing testing </div>
  )
}

export default class AnimalManager extends React.Component{
  state = {
    actions: [
      { name: 'View Animal History', destination: '/herds' },
      { name: 'Sell', destination: '/animals/manage' },
      { name: 'Register Calf', destination: '/manage-animals/register-calf' },
      { name: 'Add Purchase', destination: '/animals/manage' },
      { name: 'Weigh', destination: '/animals/manage' },
      { name: 'Preg Test', destination: '/animals/manage' },
      { name: 'Innoculate', destination: '/animals/manage' }
    ]
  }
// BUG: the nested Route wont render the correct component
  render() {
    return(
      <Fragment>
        <Typography variant='h5' align='center'>Animal Manager</Typography >

        <ActionsContainer actions={this.state.actions} />
        <hr/>
        <Route path='/manage-animals/register-calf' component={Test} />
      </Fragment>
    );
  }
}
