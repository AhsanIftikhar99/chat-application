// api/userApi.ts

import axios, { getAxiosConfig } from "@/utils/axiosConfig"; // Make sure this file exists and handles your axios configuration


export const fetchUserAndChat = async (userId: string, cookies:string)=> {
  try {
    const response = await axios.get(`/api/chats/getUserAndChat/${userId}`, getAxiosConfig(cookies));
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
};

export const getUsersHaveChatWith = async (cookies:string) => {
  try {
    const response = await axios.get(`/api/users/getUsersWithChat`, getAxiosConfig(cookies));
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
}

