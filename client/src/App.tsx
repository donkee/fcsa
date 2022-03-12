import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('ws://localhost:7071', { rejectUnauthorized: false });

const App = () => {
  const [message, setMessage] = useState('Hello World!');
  const [date, setDate] = useState('');

  useEffect(() => {
    socket.on('new quote', (message) => {
      setMessage(message.text);
    });

    socket.on('new time', (message) => {
      setDate(message);
    });
  }, []);

  return (
    <div>
      <h1>{message}</h1>
      <h3>Server Time: {formatDate(date)}</h3>
    </div>
  );
};

export default App;

const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  const [hours, minutes, seconds] = [
    parsedDate.getHours().toString().padStart(2, '0'),
    parsedDate.getMinutes().toString().padStart(2, '0'),
    parsedDate.getSeconds().toString().padStart(2, '0')
  ];

  return `${hours}:${minutes}:${seconds}`;
};
