# FCSA Project

To start server, run `npm start` in the `server` dir.

To start client, run `npm start` in the `client` dir.

These apps communicate via WebSockets and [`socket.io`](https://socket.io)

Every 5 seconds (approximately) a new, random quote is sent to the client. This can be extrapolated to send any data at any time as WebSockets maintain a constant connection.
