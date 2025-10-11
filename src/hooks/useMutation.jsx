import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';

const useApiMutation = ({
  url,
  method = 'POST',
  onSuccess,
  onError,
  isFormData = false,
}) => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      if (method === 'DELETE') {
        const id = data?.id;
        if (!id) throw new Error('ID required for DELETE request');
        const response = await api.delete(`${url}/${id}`);
        return response.data;
      }

      let requestData = data;
      const headers = {};

      if (isFormData) {
        headers['Content-Type'] = 'multipart/form-data';
      }

      const response = await api({
        url,
        method,
        data: requestData,
        headers,
      });

      return response.data;
    },
    onSuccess,
    onError,
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export default useApiMutation;
