import React from 'react';
import openSocket from 'socket.io-client';
import OAuth from './OAuth';
import API_URL from '../../../config/config';
import './ServiceLogin.css';

const socket = openSocket(API_URL);
const providers = ['google'];

export default function ServiceLogin() {
  return (
    <div>
      {providers.map(provider => (
        <OAuth provider={provider} key={provider} socket={socket} />
      ))}
    </div>
  );
}
