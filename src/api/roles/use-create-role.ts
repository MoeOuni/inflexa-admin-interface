import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, roleQueryKeys } from "@/api";
import { toast } from "sonner";

import type { Role, TSFixMe } from "@/lib/types";

const createRoleFn = async (role: Role) => {
    const response = await apiClient.post("/roles", role);
    return response;
};

export function useCreateRole() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createRoleFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: roleQueryKeys.all });
            toast.success("Role created successfully");
        },
        onError: (error: TSFixMe) => {
            toast.error(
                error?.response?.data?.message || "An error occurred. Please try again."
            );
        },
    });
}
