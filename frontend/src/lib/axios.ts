import axios from "axios";

const instance = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Automatically include access_token in headers if available
instance.interceptors.request.use((config) => {
   if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
         config.headers.Authorization = token;
      }
   }
   return config;
});

instance.interceptors.response.use(
   (res) => res,
   (error) => {
      if (error.response?.status === 401) {
         window.location.href = "/login";
      }
      return Promise.reject(error);
   }
);

export default instance;
