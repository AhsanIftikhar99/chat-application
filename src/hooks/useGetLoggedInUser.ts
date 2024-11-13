import { getLoggedInUser } from "@/api/user"
import { useQuery } from "@tanstack/react-query"

export const useGetLoggedInUser = () => {
    return useQuery({
        queryKey: ["loggedInUser"],
        queryFn: () => getLoggedInUser(),
    })
}