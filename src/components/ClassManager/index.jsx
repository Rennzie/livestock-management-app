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
    this.props.history.push('/manage-classes/changes', { category });
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
                        <ListItemText primary={`Added: ${category.currentMonthDetail.changes.add}`}/>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Death: ${category.currentMonthDetail.changes.death}`}/>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Theft: ${category.currentMonthDetail.changes.theft}`}/>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Sale: ${category.currentMonthDetail.changes.sale}`}/>
                      </ListItem>
                    </List>

                  </ExpansionPanelDetails>
                  <Divider/>
                  <ExpansionPanelActions>
                    <Button onClick={this.handleClassChange(category)}> Add Change </Button>
                  </ExpansionPanelActions>
                </ExpansionPanel>
              )}
            </Fragment>
        }

        { /* <Button onClick={this.handleClassChange} variant="fab" color="secondary" aria-label="Add">
          <AddIcon />
        </Button>*/}
      </Fragment>
    );
  }
}
