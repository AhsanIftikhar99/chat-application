import axios, { AxiosRequestConfig, AxiosError } from "@/utils/axiosConfig";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

// Define types for the request and response
interface PostRequestParams {
  API_URL: string;
  BODY: any;
  config?: AxiosRequestConfig;
}

interface UsePostDataToServerProps<T> {
  onPostReqSuccess: (data: T) => void;
  onPostReqError?: (error: AxiosError) => void;
}

// Define the POST request function
const POST_REQUEST = async <T>({ API_URL, BODY, }: PostRequestParams): Promise<T> => {
  const response = await axios.post<T>(API_URL, BODY);
  return response.data;
};

// Custom hook with TypeScript
function usePost<T>({ onPostReqSuccess, onPostReqError }: UsePostDataToServerProps<T>): UseMutationResult<T, AxiosError, PostRequestParams> {
  return useMutation<T, AxiosError, PostRequestParams>(
    {
      mutationFn: async (params: PostRequestParams) => {
        return POST_REQUEST(params);
      },
      onSuccess: (data: T) => {
        onPostReqSuccess(data);
      },
      onError: (error: AxiosError) => {
        if (onPostReqError) {
          onPostReqError(error);
        } else {
          console.error("An error occurred:", error);
        }
      },
    }
  );
}

export default usePost;
