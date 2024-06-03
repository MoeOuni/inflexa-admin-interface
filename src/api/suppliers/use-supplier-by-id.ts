import { apiClient, supplierQueryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useSupplierById() {
    const { id } = useParams();
    const getSupplierByIdFn = async () => {
        if (id) {
            const { data } = await apiClient.get(`/suppliers/${id}`);
            return data;
        }
    };
    return useQuery({
        queryKey: supplierQueryKeys.detail(id),
        queryFn: getSupplierByIdFn,
        retry: 1,
    });
}
