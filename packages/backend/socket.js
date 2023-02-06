const { Server } = require('socket.io');

let io;

module.exports = {
  initializeSocketConnection: (httpServer, corsOptions) => {
    io = new Server(httpServer, {
      cors: corsOptions(),
    });

    io.on('connection', (socket) => {
      console.log(`user connected on socket with id ${socket.id}`);

      socket.on('socket-created', () => console.log('socket created recieved'));

      socket.on('user-logged-in', (userData) => {
        socket.emit('ack-user-signed-in');
        console.log(`user with data ${JSON.stringify(userData)} signed in`);
      });

      socket.on('disconnect', () => {
        console.log(`user disconnected on socket with id ${socket.id}`);
      });
    });

    return io;
  },
  getSocketConnection: () => {
    if (!io) {
      throw new Error('socket is not initialized');
    }
    return io;
  },
};
