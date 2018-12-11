import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@material-ui/core';

// Dependancies
import axios from 'axios';

// Components
import CategoryExpPanel from './Panel';

export default class CategoryManager extends Component {
  state = {
    expanded: null,
    farm: null
  };

  componentDidMount() {
    const { match } = this.props;
    const { farmId } = match.params;
    axios
      .get(`/api/farms/${farmId}`)

      .then(res =>
        this.setState(() => ({ farm: res.data }), () => console.log('the state is', this.state))
      );
  }

  handleChange = panel => (event, expanded) => {
    this.setState({ expanded: expanded ? panel : false });
  };

  handleCategoryChange = category => () => {
    const { history } = this.props;
    history.push(`/manage-classes/${category.class}/changes`, { categoryId: category._id });
  };

  handleGoToHistory = category => () => {
    const id = category._id;
    const { history } = this.props;
    history.push(`/manage-classes/${category.class}/history`, { id });
  };

  render() {
    const { farm, expanded } = this.state;

    return (
      <Fragment>
        {farm && (
          <Fragment>
            <Typography variant="h5" align="center">
              {farm.name} Category Manager
            </Typography>

            {farm.categories.length === 0 ? (
              <Typography variant="subtitle1" align="center">
                You have not registered any categories for {farm.name} yet.
                <Link to={{ pathname: '/new/category', state: { farm } }}> Click here </Link>
                to add one.
              </Typography>
            ) : (
              <Fragment>
                {farm.categories.map(category => (
                  <CategoryExpPanel
                    key={category._id}
                    category={category}
                    expanded={expanded}
                    handleChange={this.handleChange}
                    handleCategoryChange={this.handleCategoryChange}
                    handleGoToHistory={this.handleGoToHistory}
                  />
                ))}
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}
