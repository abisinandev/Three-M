import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};



export const getErrorMessage = (error: any) => {
    const res = error.response;
    if (!res) return "Network error! Check your internet connection.";

    const msg =
        res.data?.message ||
        res.data?.error ||
        (res.status === 404 && "Requested resource not found.") ||
        (res.status === 500 && "Server error! Please try again later.") ||
        "Unexpected error occurred.";

    return msg;
};



//Request interceptor
api.interceptors.request.use(
    (config) => {
        console.log("➡️ Axios Request:", config.url, config.data);
        return config;
    },
    (error) => {
        console.error("❌ Axios Request Error:", error);
        return Promise.reject(error);
    }
);


//Response interceptor  
api.interceptors.response.use(
    (response) => {
        console.log("Axios response📌: ", response)
        return response
    },
    async (error) => {
        const originalRequest = error.config;
        console.log("Axios error response❌: ", error)
        console.log("Original Request: ", originalRequest);

        const skipRefreshUrls = [
            "/api/auth/login",
            "/api/auth/signup",
            "/api/auth/two-factor-verify",
            "/api/auth/verify-otp",
            "/api/auth/resend-otp"
        ];

        if (skipRefreshUrls.some(url => originalRequest.url?.includes(url))) {
            return Promise.reject(error);
        }

        if (!error.response || error.response.status !== 401) return Promise.reject(error);


        if (error.response.status === 403 && !originalRequest._retry) {
            return Promise.reject(error);
        }

        if (error.response.status === 401 ) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => api(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;
        }

        try {
            await api.post("/auth/refresh", { withCredentials: true });
            processQueue(null);
            return api(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }

        return Promise.reject(error);

    }
);


export default api;