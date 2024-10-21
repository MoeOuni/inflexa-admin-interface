import { apiClient, productQueryKeys } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function useProductDetails() {
  const { id } = useParams();
  const getProductDetailsFn = async () => {
    if (id) {
      const { data } = await apiClient.get(`/products/${id}`);
      return data;
    }
  };
  return useQuery({
    queryKey: productQueryKeys.detail(id || 'VALID_ID'),
    queryFn: getProductDetailsFn,
  });
}
