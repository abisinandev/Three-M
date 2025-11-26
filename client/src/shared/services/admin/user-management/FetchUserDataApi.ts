import adminApi from "@lib/axiosAdmin";
import { FETCH_USER_URL } from "@shared/constants/adminConstants";

export type UserFilters = {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};

export const FetchUserDetail = async (filters: UserFilters) => {
    const response = await adminApi.get(FETCH_USER_URL, {
        withCredentials: true,
        params: filters,
        headers: { "Content-Type": "application/json" },
    });

    return response.data
}