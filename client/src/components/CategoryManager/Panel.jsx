import React, { Fragment } from 'react';

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
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({});

function CategoryExpPanel(props) {
  const { category, expanded, handleChange, handleCategoryChange, handleGoToHistory } = props;
  return (
    <ExpansionPanel
      key={category._id}
      expanded={expanded === category.category}
      onChange={handleChange(category.category)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">{category.category}</Typography>
        <Typography variant="subtitle1">
          Running Total: {category.currentMonthDetail.closingTotal}
        </Typography>
        <Typography variant="subtitle1">
          Opening Total: {category.currentMonthDetail.openingTotal}
        </Typography>
        <Typography variant="subtitle1">
          Changes:{' '}
          {category.currentMonthDetail.closingTotal - category.currentMonthDetail.openingTotal}
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
        </List>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button onClick={handleGoToHistory(category)}> History </Button>
        <Button onClick={handleCategoryChange(category)}> Log Change </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

export default withStyles(styles)(CategoryExpPanel);
