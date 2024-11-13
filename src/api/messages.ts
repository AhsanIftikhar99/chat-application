import axios from "@/utils/axiosConfig";
import { Message } from "@/utils/types";

export const getMessages = async ({ chatId }: { chatId: string }) => {
  const response = await axios.get<Message[]>(`/api/chats/${chatId}/messages`);
  return response.data;
};
