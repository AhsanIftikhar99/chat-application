import { getUsers } from "@/api/user"
import { useQuery } from "@tanstack/react-query"

export const useGetUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers(),
    })
}