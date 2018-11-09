import React from 'react';
import { Fragment } from 'react';

import { Typography } from '@material-ui/core';

// components
import ActionsContainer from '../common/ActionsContainer.jsx';

export default class AnimalManager extends React.Component{
  state = {
    actions: [
      { name: 'Register Calf', destination: '/manage-animals/register-calf' },
      { name: 'Weigh', destination: '/manage-animals/weigh' },
      { name: 'Preg Test', destination: '/manage-animals/preg-test' },
      { name: 'Archive', destination: '/manage-animals/archive' },

      { name: 'View Animal History', destination: '/animals/:id' },
      { name: 'Sell', destination: '/animals/manage' },
      { name: 'Add Purchase', destination: '/manage-animals/add-purchase' },
      { name: 'Innoculate', destination: '/manage-animals/innoculate' }
    ]
  }

  render() {
    return(
      <Fragment>
        <Typography variant='h5' align='center'>Animal Manager</Typography >
        <ActionsContainer actions={this.state.actions} />
      </Fragment>
    );
  }
}
