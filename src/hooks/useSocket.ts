// hooks/useSocket.ts

import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';

let socket: Socket | null = null;

// Function to get or create the socket instance
const getSocketInstance = (): Socket => {
  if (!socket) {
    const token = Cookies.get('token');
    socket = io('http://localhost:4000', {
      auth: { token },
    });
  }

  return socket;
};

// Custom hook to manage socket connection and joining rooms
const useSocket = (chatId: string | null): Socket => {
  const socket = getSocketInstance();

  useEffect(() => {
    if (chatId) {
      // Join the specific chat room
      socket.emit("joinRoom", chatId);
    }

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, chatId]);

  return socket;
};

export default useSocket;
