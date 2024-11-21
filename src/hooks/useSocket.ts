import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { SocketEvents } from "@/utils/enums";

let socket: Socket | null = null;


const getSocketInstance = (): Socket => {
  if (!socket) {
    const token = Cookies.get("token");
    socket = io("http://localhost:4000", {
      auth: { token },
    });
  }

  return socket;
};

const useSocket = (chatId: string | null): Socket => {
  const socket = getSocketInstance();

  useEffect(() => {
    if (chatId) {
      // Join the specific chat room
      socket.emit(SocketEvents.JOIN_ROOM, chatId);
      console.log(`Joined room: ${chatId}`);
    }

    return () => {
      if (chatId) {
        // Leave the room
        socket.emit(SocketEvents.LEAVE_ROOM, chatId);
        console.log(`Left room: ${chatId}`);
      }
    };
  }, [socket, chatId]);

  useEffect(() => {
    socket.on(SocketEvents.CONNECT, () => {
      console.log("Connected to socket server");
    });

    return () => {

      console.log("Socket cleanup triggered");
    };
  }, [socket]);

  return socket;
};

export default useSocket;
