import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('ws://localhost:7071', { rejectUnauthorized: false });

const App = () => {
  const [message, setMessage] = useState('Hello World!');

  useEffect(() => {
    socket.on('new quote', (message) => {
      setMessage(message.text);
    });
  }, [message]);
  return <h1>{message}</h1>;
};

export default App;
