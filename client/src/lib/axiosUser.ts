import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve();
        }
    });
    failedQueue = [];
};

export const getErrorMessage = (error: any): string => {
    const res = error.response;
    if (!res) return "Network error! Check your internet connection.";

    return (
        res.data?.message ||
        res.data?.error ||
        (res.status === 404 ? "Requested resource not found." : "") ||
        (res.status === 500 ? "Server error! Please try again later." : "") ||
        "Unexpected error occurred."
    );
};

const NO_REFRESH_URLS = [
    "/auth/login",
    "/auth/signup",
    "/auth/two-factor-verify",
    "/auth/verify-otp",
    "/auth/resend-otp",
    "/auth/refresh",
    "/auth/forgot-password",
    "/auth/reset-password",
];


//REQUEST INTERCEPTOR
api.interceptors.request.use(
    (config) => {
        if (import.meta.env.DEV) {
            console.log("➡️ Request:", config.method?.toUpperCase(), config.url);
        }
        return config;
    },
    (error) => {
        console.error("❌ Request Error:", error);
        return Promise.reject(error);
    }
);

//RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) => {
        if (import.meta.env.DEV) {
            console.log("✅ Response:", response.status, response.config.url);
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        const shouldSkipRefresh = NO_REFRESH_URLS.some(url =>
            originalRequest.url?.includes(url)
        );

        if (shouldSkipRefresh || error.response?.status !== 401) {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            toast.error("Session expired. Please login again.");
            window.dispatchEvent(new CustomEvent('auth:logout'));
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then(() => api(originalRequest))
                .catch(err => Promise.reject(err));
        }

        isRefreshing = true;

        try {
            await api.post("/auth/refresh");
            processQueue();
            return api(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError);
            toast.error("Session expired. Please login again.");
            window.dispatchEvent(new CustomEvent('auth:logout'));
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default api;