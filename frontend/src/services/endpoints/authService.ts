import axios from "@/lib/axios";

export const authService = {
   signup: (data: { name: string; email: string; password: string }) =>
      axios.post("/auth/signup", data),

   login: (data: { email: string; password: string }) =>
      axios.post("/auth/login", data),

   me: () => axios.get("/users/me"),
};
