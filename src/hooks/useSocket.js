// hooks/useSocket.js
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

let socket = null;

const getSocketInstance = () => {

  if (!socket) {
    const token = Cookies.get('token');
    socket = io('http://localhost:4000', {
      auth: { token },
    });
  }

  return socket

}

const useSocket = () => {
   // Retrieve token from cookies

  const socket = getSocketInstance()

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
