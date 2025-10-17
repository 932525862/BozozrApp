import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useFetchOne = ({ key, url, config, options }) => {
  const query = useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      const response = await api.get(url, config);
      
      return {
        data: response?.data?.data,
      };
    },
    ...options,
  });

  return {
    data: query.data?.data,          // data?.items, data?.total
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    error: query.error,
    refetch: query.refetch,
  };
};
