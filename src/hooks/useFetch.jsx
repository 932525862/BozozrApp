import { useQuery } from '@tanstack/react-query';
import api from '../service/api';

export const useFetch = ({ key, url, config, options }) => {
  const query = useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      const response = await api.get(url, config);
      return {
        items: response?.data?.data?.items,
        total: response?.data?.data?.total,
      };
    },
    ...options,
  });

  return {
    data: query.data,          // data?.items, data?.total
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    error: query.error,
    refetch: query.refetch,
  };
};
