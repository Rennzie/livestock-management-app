import React from 'react';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import withStyles from '@material-ui/core/styles/withStyles';
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
  },
  spreadRow_detail: {
    paddingRight: 36
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
          <CapitalizeText gutterBottom variant="h6">
            {category.category}
          </CapitalizeText>

          <div className={classes.spreadRow}>
            <Typography variant="subtitle1">Opening Total:</Typography>
            <Typography variant="subtitle1">{category.currentMonthDetail.openingTotal}</Typography>
          </div>

          <Divider />

          <div className={classes.spreadRow}>
            <Typography variant="body1">In:</Typography>
            <Typography variant="body1">{category.currentMonthDetail.inChanges}</Typography>
          </div>

          <div className={classes.spreadRow}>
            <Typography variant="body1">Out:</Typography>
            <Typography variant="body1">{category.currentMonthDetail.outChanges}</Typography>
          </div>

          <Divider />

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
            <div
              className={classNames(classes.spreadRow_detail, classes.spreadRow)}
              key={change._id}
            >
              <CapitalizeText variant="subtitle2">{change.name}</CapitalizeText>
              <Typography variant="subtitle2">{change.total}</Typography>
            </div>
          ))}
        </div>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button variant="contained" onClick={handleGoToHistory(category)}>
          {' '}
          History{' '}
        </Button>
        <Button variant="contained" onClick={handleCategoryChange(category)}>
          {' '}
          Log Change{' '}
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

export default withStyles(styles)(CategoryExpPanel);
