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

// Dependancies
import moment from 'moment';
import axios from 'axios';

// Components
import CapitalizeText from '../common/CapitalizeText';

export default class ClassHistory extends Component {
  state = {};

  componentDidMount() {
    const { location } = this.props;
    axios
      .get(`/api/classes/${location.state.id}`)
      .then(res => this.setState({ category: res.data }));

    // // NOTE: will end up as an if depending on what route gets user here.
    // this.setState((prevState, props) => {
    //   prevState.category = props.location.state.category;
    //   return prevState;
    // }, () => console.log(this.state));
  }

  render() {
    const { category } = this.state;
    return (
      <Fragment>
        {category && (
          <Fragment>
            <Typography align="center" variant="h5">
              History
            </Typography>
            <Typography align="center" variant="subtitle2">
              <CapitalizeText>{category.class}</CapitalizeText>
            </Typography>
            <Typography align="center" variant="subtitle2">
              <CapitalizeText>{category.currentMonthDetail.period}</CapitalizeText>
            </Typography>

            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Reason for Change</TableCell>
                    <TableCell numeric>Moved</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category.currentMonthChanges.map(row => (
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">
                        {moment(row.createdAt).format('DD MMM YYYY')}
                      </TableCell>
                      <TableCell>
                        <CapitalizeText>{row.reasonForChange}</CapitalizeText>
                      </TableCell>
                      <TableCell numeric>{row.animalsMoved}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Fragment>
        )}
      </Fragment>
    );
  }
}
