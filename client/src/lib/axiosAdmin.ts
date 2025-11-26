import axios from "axios";
import { toast } from "sonner";

const adminApi = axios.create({
    baseURL: "/api/admin",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

let isRefreshing = false;
let queue: any[] = [];

const blockUrls = [
    "/authentication",
    "/verify-otp",
    "/refresh",
];

adminApi.interceptors.response.use(
    res => res,
    async (error) => {
        const original = error.config;

        const skip = blockUrls.some(u => original.url?.includes(u));

        if (skip || error.response?.status !== 401) {
            return Promise.reject(error);
        }

        if (original._retry) {
            toast.error("Admin session expired. Please login again.");
            window.dispatchEvent(new CustomEvent("admin:logout"));
            return Promise.reject(error);
        }

        original._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                queue.push({ resolve, reject });
            })
                .then(() => adminApi(original))
                .catch(err => Promise.reject(err));
        }

        isRefreshing = true;

        try {
            await adminApi.post("/authentication/refresh");
            queue.forEach(p => p.resolve());
            queue = [];
            return adminApi(original);
        } catch (err) {
            queue.forEach(p => p.reject(err));
            queue = [];
            toast.error("Admin session expired.");
            window.dispatchEvent(new CustomEvent("admin:logout"));
            return Promise.reject(err);
        } finally {
            isRefreshing = false;
        }
    }
);

export default adminApi;
