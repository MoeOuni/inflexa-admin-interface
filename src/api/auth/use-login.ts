import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, authQueryKeys } from '@/api';
import { toast } from 'sonner';

import type { TSFixMe } from '@/lib/types';
import type { APILogin } from '@/lib/interfaces';

const loginFn = async (login: APILogin) => {
  const response = await apiClient.post('/login', login);
  return response;
};

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.details(),
      });
    },
    onError: (error: TSFixMe) => {
      toast.error(
        error?.response?.data?.message || 'An error occurred. Please try again.'
      );
    },
  });
}
