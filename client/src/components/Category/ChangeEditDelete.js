import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment';
import axios from 'axios';
import ChangeForm from './Change/Form';
import SubmitButton from '../common/SubmitButton';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class ChangeEditDelete extends Component {
  state = {};

  componentDidMount() {
    const { match } = this.props;
    axios
      .get(`/api/categories/${match.params.categoryId}/changes/${match.params.changeId}`)
      .then(res => {
        const newChange = { ...res.data };
        newChange.createdAt = moment(res.data.createdAt).format('YYYY-MM-DD');
        this.setState({ newChange });
      });
  }

  handleChange = name => event => {
    let { value } = event.target;

    if (name === 'animalsMoved') {
      value = parseInt(value, 10);
    }
    this.setState(prevState => {
      const newState = prevState;
      newState.newChange[name] = value;
      return newState;
    });
  };

  handleEditChange = changeType => () => {
    const { newChange } = this.state;
    const { createdAt, animalsMoved, reasonForChange } = newChange;
    const { history, match } = this.props;

    const change = reasonForChange;

    const updatedChangeObj = {};
    updatedChangeObj.createdAt = moment(createdAt);
    updatedChangeObj.reasonForChange = reasonForChange;
    updatedChangeObj.animalsMoved = animalsMoved;

    // To ensure we send a negative number to database in the correct instance
    if (
      change === 'death' ||
      change === 'theft' ||
      change === 'sale' ||
      change === 'transfersOut'
    ) {
      updatedChangeObj.animalsMoved = animalsMoved * -1;
    }

    console.log('change obj is', updatedChangeObj);

    axios
      .put(
        `/api/categories/${match.params.categoryId}/changes/${match.params.changeId}`,
        updatedChangeObj
      )
      .then(() => history.push(`/categories/${match.params.categoryId}`));
  };

  handleDeleteChange = () => {
    const { history, match } = this.props;
    axios
      .delete(`/api/categories/${match.params.categoryId}/changes/${match.params.changeId}`)
      .then(() => history.push(`/categories/${match.params.categoryId}`));
  };

  render() {
    const { newChange } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography align="center" variant="h5">
          Edit/Delete Change
        </Typography>
        {newChange && (
          <Fragment>
            <ChangeForm
              change={newChange}
              handleChange={this.handleChange}
              handleSubmit={this.handleEditChange}
              changeType="edit"
            />
            <SubmitButton
              disabled={!newChange.reasonForChange}
              variant="contained"
              className={classes.margin}
              color="secondary"
              handleClick={this.handleDeleteChange}
              name="Delete Change"
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(ChangeEditDelete);
