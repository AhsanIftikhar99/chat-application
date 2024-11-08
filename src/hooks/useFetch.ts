import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig } from '@/utils/axiosConfig';

type FetchDataOptions<T> = {
  url: string;
  queryKey: QueryKey;
  config?: AxiosRequestConfig;
  enabled?: boolean;
  onSuccess?: (data: T) => void;  // Accepts an optional function, which returns void if provided
  onError?: (error: AxiosError) => void;
};

export function useFetch<T>({
  url,
  queryKey,
  config,
  enabled = true,
  onSuccess,
  onError,
}: FetchDataOptions<T>) {
  return useQuery<T, AxiosError, T, QueryKey>({
    queryKey,
    queryFn: async () => {
      const { data } = await axios.get<T>(url, config);
      return data;
    },
    enabled,
    onSuccess: (data: T) => {
      if (onSuccess) {
        onSuccess(data); // Call onSuccess if provided
      }
      return data; // Return data for potential chaining or further use
    },
    onError,
  } as UseQueryOptions<T, AxiosError, T, QueryKey>);
}
