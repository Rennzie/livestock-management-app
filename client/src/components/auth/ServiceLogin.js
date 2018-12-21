import React from 'react';
import io from 'socket.io-client';
import OAuth from './OAuth';
import API_URL from '../../../config/config';
import './ServiceLogin.css';

const socket = io(API_URL);
const providers = ['google'];

export default function ServiceLogin() {
  return (
    <div className="wrapper">
      <div className="container">
        {providers.map(provider => (
          <OAuth provider={provider} key={provider} socket={socket} />
        ))}
      </div>
    </div>
  );
}
