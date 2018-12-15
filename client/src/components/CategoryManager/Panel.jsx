import React from 'react';

import {
  Typography,
  Divider,
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Components
import CapitalizeText from '../common/CapitalizeText';

const styles = () => ({
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center',
    width: '100%'
  },
  spreadRow: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

function CategoryExpPanel(props) {
  const { category, expanded, handleChange, handleCategoryChange, handleGoToHistory } = props;
  const { classes } = props;
  return (
    <ExpansionPanel
      key={category._id}
      expanded={expanded === category.category}
      onChange={handleChange(category.category)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.column}>
          <CapitalizeText variant="h5">{category.category}</CapitalizeText>
          <div className={classes.spreadRow}>
            <Typography variant="subtitle1">Opening Total:</Typography>
            <Typography variant="subtitle1">{category.currentMonthDetail.openingTotal}</Typography>
          </div>
          <div className={classes.spreadRow}>
            <Typography variant="subtitle1">Changes:</Typography>
            <Typography variant="subtitle1">
              {category.currentMonthDetail.closingTotal - category.currentMonthDetail.openingTotal}
            </Typography>
          </div>
          <div className={classes.spreadRow}>
            <Typography variant="subtitle1">Running Total:</Typography>
            <Typography variant="subtitle1">{category.currentMonthDetail.closingTotal}</Typography>
          </div>
        </div>
      </ExpansionPanelSummary>

      <Divider />
      <ExpansionPanelDetails>
        <div className={classes.column}>
          {category.currentMonthDetail.changes.map(change => (
            <div className={classes.spreadRow} key={change._id}>
              <CapitalizeText variant="subtitle2">{change.name}</CapitalizeText>
              <Typography variant="subtitle2">{change.total}</Typography>
            </div>
          ))}
        </div>
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
