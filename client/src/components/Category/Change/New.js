import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment';
import axios from 'axios';
import ChangeForm from './Form';

const styles = () => ({});

class ChangeNew extends Component {
  state = {
    newChange: {
      createdAt: '',
      reasonForChange: '',
      animalsMoved: 0
    }
  };

  componentDidMount() {
    const { match, history } = this.props;
    axios.get(`/api/categories/${match.params.categoryId}`).then(res =>
      this.setState(prevState => {
        const newState = prevState;
        newState.category = res.data;
        newState.newChange.createdAt = moment().format('YYYY-MM-DD');
        newState.changeType = history.location.state.changeType;
        return newState;
      })
    );
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

  handleChangeLog = changeType => () => {
    const { newChange, category } = this.state;
    const { history } = this.props;

    const change = newChange.reasonForChange;

    const changeObj = {};
    changeObj.createdAt = moment(newChange.createdAt);
    changeObj.reasonForChange = newChange.reasonForChange;
    changeObj.animalsMoved = newChange.animalsMoved;

    // To ensure we send a negative number to database in the correct instance
    if (changeType === 'remove' || change === 'transfersOut') {
      changeObj.animalsMoved = newChange.animalsMoved * -1;
    }

    axios
      .post(`/api/categories/${category._id}/changes`, changeObj)
      .then(() => history.push(`/categories/${category._id}`));
  };

  render() {
    const { newChange, category, changeType } = this.state;

    return (
      <Fragment>
        {category && (
          <Fragment>
            <Typography align="center" variant="h5">
              Log Change
            </Typography>
            <Typography align="center" variant="subtitle1">
              {category.farm.name} {category.category}
            </Typography>

            <ChangeForm
              change={newChange}
              handleChange={this.handleChange}
              handleSubmit={this.handleChangeLog}
              changeType={changeType}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(ChangeNew);
