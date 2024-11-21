// src/utils/enums.ts
export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
  VIDEO = "video",
  FILE = "file",
  AUDIO = "audio",
  // Add more types as needed
}

export enum SocketEvents {
  SEND_MESSAGE = "sendMessage",
  NEW_MESSAGE = "newMessage",
  JOIN_ROOM = "joinRoom",
  LEAVE_ROOM = "leaveRoom",
  CONNECT= "connect",
  // Add other event types here
}
