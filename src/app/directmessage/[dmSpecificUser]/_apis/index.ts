// api/userApi.ts

import axios,{ getAxiosConfig } from "@/utils/axiosConfig"; // Make sure this file exists and handles your axios configuration

export const fetchUserAndChat = async (userId: string, cookies: any): Promise<any> => {
  try {
    const response = await axios.get(`/api/chats/getUserAndChat/e48a2891-254a-4c8e-88b5-d9166505f09f`, getAxiosConfig(cookies));
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
};

