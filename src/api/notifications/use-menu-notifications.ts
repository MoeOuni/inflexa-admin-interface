import { apiClient, notificationsQueryKeys } from '@/api';
import { useQuery } from '@tanstack/react-query';

export function useMenuNotifications({ type }: { type: string }) {

  const getCurrentNotification = async () => {
    const response = await apiClient.get(`/notifications/${type}`);
    return response.data;
  };

  return useQuery({
    queryFn: getCurrentNotification,
    queryKey: notificationsQueryKeys.type(type),
  });
}
