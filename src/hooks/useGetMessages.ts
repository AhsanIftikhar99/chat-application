import { getMessages } from "@/api/messages";
import { useQuery } from "@tanstack/react-query";

export const useGetMessages = ({ chatId }: { chatId: string }) => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: () => getMessages({ chatId }),
    enabled: !!chatId,
  });
};
