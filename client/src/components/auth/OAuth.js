import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import API_URL from '../../../config/config';

export default class OAuth extends Component {
  componentDidMount() {
    const { socket, provider } = this.props;

    // token is the returned socket object from every emit
    socket.on(provider, token => {
      this.popup.close();
      if (token) {
        localStorage.setItem('token', token);
      }
    });
  }

  componentWillUnmount() {
    const { socket, provider } = this.props;
    socket.off(provider);
  }

  // Kicks off the processes of opening the popup on the server and listening
  // to the popup. It also disables the login button so the user can not
  // attempt to login to the provider twice.
  startAuth = e => {
    e.preventDefault();
    this.popup = this.openPopup();
    this.checkPopup();
  };

  // Launches the popup by making a request to the server and then
  // passes along the socket id so it can be used to send back user
  // data to the appropriate socket on the connected client.
  openPopup() {
    const { provider, socket } = this.props;
    const width = 600;

    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${API_URL}/${provider}?socketId=${socket.id}`;

    return window.open(
      url,
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  }

  // Routinely checks the popup to re-enable the login button
  // if the user closes the popup without authenticating.
  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
      }
    }, 1000);
  }

  render() {
    // removed the bind(this) from the onClick methods. could cause an issue
    return (
      <Paper>
        <Button color="primary" onClick={this.startAuth}>
          <FontAwesomeIcon icon="igloo" />
        </Button>
      </Paper>
    );
  }
}
