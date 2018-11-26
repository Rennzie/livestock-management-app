import React, { Component, Fragment } from 'react';

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
import AddIcon from '@material-ui/icons/Add';

// Dependancies
import axios from 'axios';

// Components

export default class ClassManager extends Component{
  state={
    expanded: null
  };

  componentDidMount() {
    console.log('component is mounting');
    axios.get('/api/classes')
      .then( res => this.setState(() => {
        return {classes: res.data };
      }, () => console.log('=======>', this.state)));
  }

  handleChange = panel => (event, expanded) => {
    this.setState({expanded: expanded ? panel : false });
  };

  handleClassChange = category => () => {
    this.props.history.push(`/manage-classes/${category.class}/changes`, { category });
  };

  handleGoToHistory = category => () => {
    this.props.history.push(`/manage-classes/${category.class}/history`, { category });
  };

  render() {
    return(
      <Fragment>
        <Typography variant='h5' align='center'>
          Class Manager
        </Typography >

        { this.state.classes &&
            <Fragment>
              {this.state.classes.map( category =>
                <ExpansionPanel
                  key={category._id}
                  expanded={this.state.expanded === category.class}
                  onChange={this.handleChange(category.class)}
                >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant='h5'>
                      { category.name } : { category.class }
                    </Typography>
                    <Typography variant='subtitle1'>
                      Running Total: { category.currentMonthDetail.closingTotal }
                    </Typography>
                    <Typography variant='subtitle1'>
                      Opening Total: { category.currentMonthDetail.openingTotal}
                    </Typography>
                    <Typography variant='subtitle1'>
                      Changes: { category.currentMonthDetail.closingTotal - category.currentMonthDetail.openingTotal}
                    </Typography>
                  </ExpansionPanelSummary>

                  <ExpansionPanelDetails>
                    <List>
                      <ListItem>
                        <ListItemText primary={category.currentMonthDetail.period}/>
                      </ListItem>

                      <Divider/>

                      <ListItem>
                        <ListItemText primary={`Added: ${category.currentMonthDetail.changes.add ? category.currentMonthDetail.changes.add : 0}`}/>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Purchase: ${category.currentMonthDetail.changes.purchase ? category.currentMonthDetail.changes.purchase : 0}`}/>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Death: ${category.currentMonthDetail.changes.death ? category.currentMonthDetail.changes.death : 0}`}/>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Theft: ${category.currentMonthDetail.changes.theft ? category.currentMonthDetail.changes.theft : 0}`}/>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Sale: ${category.currentMonthDetail.changes.sale ? category.currentMonthDetail.changes.sale : 0}`}/>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Other: ${category.currentMonthDetail.changes.other ? category.currentMonthDetail.changes.other : 0}`}/>
                      </ListItem>
                    </List>

                  </ExpansionPanelDetails>
                  <Divider/>
                  <ExpansionPanelActions>
                    <Button onClick={this.handleGoToHistory(category)}> History </Button>
                    <Button onClick={this.handleClassChange(category)}> Log Change </Button>
                  </ExpansionPanelActions>
                </ExpansionPanel>
              )}
            </Fragment>
        }
      </Fragment>
    );
  }
}
