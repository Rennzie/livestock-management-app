import React, { Component, Fragment } from 'react';

import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';

import CapitalizeText from '../common/CapitalizeText.jsx';

// Dependancies
import moment from 'moment';

export default class ClassHistory extends Component{
  state={};

  componentDidMount() {

    // NOTE: will end up as an if depending on what route gets user here.
    this.setState((prevState, props) => {
      prevState.category = props.location.state.category;
      return prevState;
    }, () => console.log(this.state));
  }

  render() {
    return(
      <Fragment>
        { this.state.category &&
          <Fragment>
            <Typography align='center' variant='h5'>History</Typography>
            <Typography align='center' variant='subtitle2'>
              <CapitalizeText>{this.state.category.class}</CapitalizeText>
            </Typography>
            <Typography align='center' variant='subtitle2'>
              <CapitalizeText>{this.state.category.currentMonthDetail.period}</CapitalizeText>
            </Typography>

            <Paper >
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Reason for Change</TableCell>
                    <TableCell numeric>Moved</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.category.currentMonthChanges.map(row => {
                    return (
                      <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                          {moment(row.createdAt).format( 'DD MMM YYYY')}
                        </TableCell>
                        <TableCell>
                          <CapitalizeText>
                            {row.reasonForChange}
                          </CapitalizeText>
                        </TableCell>
                        <TableCell numeric>{row.animalsMoved}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Fragment>
        }
      </Fragment>
    );
  }
}
