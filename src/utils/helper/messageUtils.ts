import { MessageType } from "@/utils/enums";
import { NewMessage } from "@/utils/types";

export const createNewMessage = (chatId: string, senderId: string, content: string): NewMessage => {
  return {
    chatId,
    senderId,
    content: content.replace(/<\/?p>/g, ""),
    messageType: MessageType.TEXT,
    timestamp: new Date().toISOString(),
  };
};