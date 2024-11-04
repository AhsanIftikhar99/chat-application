// hooks/useFetch.ts
import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Generic type for the hook
type FetchDataOptions<T> = {
  url: string;
  queryKey: QueryKey;
  config?: AxiosRequestConfig;
  queryOptions?: Omit<UseQueryOptions<T, AxiosError>, 'queryKey' | 'queryFn'>;
};

export function useFetch<T>({ url, queryKey, config, queryOptions }: FetchDataOptions<T>) {
  return useQuery<T, AxiosError>({
    queryKey,
    queryFn: async () => {
      const { data } = await axios.get<T>(url, config);
      return data;
    },
    ...queryOptions,
  });
}
