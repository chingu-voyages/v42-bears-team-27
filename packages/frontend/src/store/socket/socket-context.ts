import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export interface ISocketContext {
  socket: Socket | null;
  isConnected: boolean;
  isError: boolean;
  disconnect: () => void;
}

export const SocketContext = createContext<ISocketContext | null>(null);
