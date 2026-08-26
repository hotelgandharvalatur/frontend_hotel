import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor — unwrap errors gracefully
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || "Something went wrong.";
    return Promise.reject(new Error(message));
  }
);

export default api;
