import axios from "axios";

// Was hardcoded to http://127.0.0.1:8000/api/, which meant a production
// build could never point at a real backend. Falls back to the old
// localhost value for local dev when VITE_API_URL isn't set.
const baseURL = `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/api/`;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// A refresh token was being stored on login but never actually used, so
// every user got silently logged out the moment their 1-hour access token
// expired. This retries once with a refreshed token before giving up.
let isRefreshing = false;
let pendingRequests = [];

const resolvePending = (newToken) => {
  pendingRequests.forEach((cb) => cb(newToken));
  pendingRequests = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config: originalRequest } = error;

    if (!response || response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem("refresh");
    if (!refreshToken) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      // Another request already triggered a refresh -- wait for it instead
      // of firing a second refresh call.
      return new Promise((resolve, reject) => {
        pendingRequests.push((newToken) => {
          if (!newToken) return reject(error);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const { data } = await axios.post(`${baseURL}token/refresh/`, {
        refresh: refreshToken,
      });

      localStorage.setItem("access", data.access);
      resolvePending(data.access);
      originalRequest.headers.Authorization = `Bearer ${data.access}`;
      return api(originalRequest);
    } catch (refreshError) {
      resolvePending(null);
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
