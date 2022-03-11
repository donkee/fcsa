import { Server } from 'socket.io';
import quotes from './quotes';

const io = new Server(7071, {
  cors: {
    origin: 'http://localhost:1234',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  setInterval(() => {
    const quote = getQuote();
    socket.emit('new quote', quote);
  }, 5000);
});

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const getQuote = () => {
  return quotes[getRandomInt(quotes.length)];
};
