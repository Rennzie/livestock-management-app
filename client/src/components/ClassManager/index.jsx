import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Dependancies
import axios from 'axios';

// Components
export default class ClassManager extends Component {
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
                  <ExpansionPanel
                    key={category._id}
                    expanded={expanded === category.class}
                    onChange={this.handleChange(category.class)}
                  >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h5">
                        {category.name} : {category.class}
                      </Typography>
                      <Typography variant="subtitle1">
                        Running Total: {category.currentMonthDetail.closingTotal}
                      </Typography>
                      <Typography variant="subtitle1">
                        Opening Total: {category.currentMonthDetail.openingTotal}
                      </Typography>
                      <Typography variant="subtitle1">
                        Changes:{' '}
                        {category.currentMonthDetail.closingTotal -
                          category.currentMonthDetail.openingTotal}
                      </Typography>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                      <List>
                        <ListItem>
                          <ListItemText primary={category.currentMonthDetail.period} />
                        </ListItem>

                        <Divider />

                        <ListItem>
                          <ListItemText
                            primary={`Added: ${
                              category.currentMonthDetail.changes.add
                                ? category.currentMonthDetail.changes.add
                                : 0
                            }`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={`Purchase: ${
                              category.currentMonthDetail.changes.purchase
                                ? category.currentMonthDetail.changes.purchase
                                : 0
                            }`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={`Death: ${
                              category.currentMonthDetail.changes.death
                                ? category.currentMonthDetail.changes.death
                                : 0
                            }`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={`Theft: ${
                              category.currentMonthDetail.changes.theft
                                ? category.currentMonthDetail.changes.theft
                                : 0
                            }`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={`Sale: ${
                              category.currentMonthDetail.changes.sale
                                ? category.currentMonthDetail.changes.sale
                                : 0
                            }`}
                          />
                        </ListItem>
                      </List>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                      <Button onClick={this.handleGoToHistory(category)}> History </Button>
                      <Button onClick={this.handleCategoryChange(category)}> Log Change </Button>
                    </ExpansionPanelActions>
                  </ExpansionPanel>
                ))}
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}
