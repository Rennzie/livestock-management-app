import React from 'react';
import { Fragment } from 'react';

import { Typography } from '@material-ui/core';

// Components
import FarmStatus from './FarmStatus.jsx';
import ActionsContainer from '../common/ActionsContainer.jsx';

export default class Dashboard extends React.Component{

  state = {
    actions: [
      { name: 'Class Manager', destination: '/manage-classes' },
      { name: 'Animal Manager', destination: '/manage-animals' }
    ]
  }

  render(){
    return(
      <Fragment>
        <Typography variant='h5' align='center'>Palmiet Farm </Typography >
        {/*<FarmStatus />*/}
        <ActionsContainer actions={this.state.actions} />
      </Fragment>
    );
  }
}