import { apiClient, productQueryKeys } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { Status } from '@/lib/interfaces';

function objectToQueryString(obj?: Status, parentKey = '') {
  if (!obj) {
    return '';
  }
  let queryString = '?';

  function addToQueryString(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    key: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
  ) {
    if (typeof value === 'object' && value !== null) {
      Object.keys(value).forEach((subKey) => {
        addToQueryString(`${key}.${subKey}`, value[subKey]);
      });
    } else {
      queryString += `${key}=${encodeURIComponent(value)}&`;
    }
  }

  addToQueryString(parentKey, obj);

  // Remove the last '&' and return the string
  return queryString.slice(0, -1);
}

export function useProducts(queryObj?: Status) {
  const getProductsFn = async () => {
    const response = await apiClient.get(
      `/products${objectToQueryString(queryObj, 'status')}`,
    );
    return response.data;
  };

  return useQuery({
    queryKey: productQueryKeys.all,
    queryFn: getProductsFn,
  });
}
