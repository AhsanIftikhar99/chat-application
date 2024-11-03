// hooks/useSocket.js
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const useSocket = () => {
  const token = Cookies.get('token'); // Retrieve token from cookies

  const socket = io('http://localhost:4000', {
    auth: { token },
  });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return socket;
};

export default useSocket;
