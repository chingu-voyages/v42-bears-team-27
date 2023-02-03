const { Server } = require('socket.io');

let io;

module.exports = {
  initializeSocketConnection: (httpServer, corsOptions) => {
    io = new Server(httpServer, {
      cors: corsOptions(),
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
