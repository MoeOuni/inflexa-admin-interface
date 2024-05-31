import { apiClient, roleQueryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";

const getRolesFn = async () => {
    const response = await apiClient.get("/roles?expanded=true");
    return response.data;
};

export function useRoles() {
    return useQuery({
        queryKey: roleQueryKeys.all,
        queryFn: getRolesFn,
    });
}
