import { useCallback, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { SocketContext, ISocketContext } from './socket-context';

type Props = {
  children: React.ReactNode;
};

const SocketProvider: React.FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isError, setIsError] = useState(false);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setIsConnected(false);
    }
  }, [socket]);

  useEffect(() => {
    const socketIo = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`);
    setSocket(socketIo);

    socketIo.on('connect', () => {
      setIsConnected(true);
    });

    socketIo.on('connect-error', () => {
      setIsConnected(false);
      setIsError(true);
    });

    socketIo.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socketIo.disconnect();
      setIsConnected(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const socketContext: ISocketContext = useMemo(
    () => ({
      socket,
      isConnected,
      isError,
      disconnect,
    }),
    [socket, isConnected, isError, disconnect],
  );

  console.log({ socketContext });

  return (
    <SocketContext.Provider value={socketContext}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
