import axios from "@/utils/axiosConfig";
import { User } from "@/utils/types";

export const getUsers = async () => {
    const response = await axios.get<User[]>("/api/users/getAllUsers");
    return response.data;
}

export const getLoggedInUser = async () => {
    const response = await axios.get<User>('/api/users/getLoggedInUser');
    return response.data;
}

export const userLogout = async () => {
    const response = await axios.post('/api/users/logout');
    return response.data;
}