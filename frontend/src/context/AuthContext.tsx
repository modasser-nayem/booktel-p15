"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/services/endpoints/authService";
import { setCookie, deleteCookie } from "@/utils/cookie";

interface User {
   id: string;
   email: string;
   name: string;
   role: "ADMIN" | "HOTEL_OWNER" | "CUSTOMER";
}

interface AuthContextType {
   user: User | null;
   loading: boolean;
   login: (email: string, password: string) => Promise<void>;
   logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
         setLoading(false);
         return;
      }

      authService
         .me()
         .then((res) => setUser(res.data.data))
         .catch(() => setUser(null))
         .finally(() => setLoading(false));
   }, []);

   const login = async (email: string, password: string) => {
      const res = await authService.login({ email, password });
      const token = res.data?.data?.access_token;
      if (token) {
         localStorage.setItem("accessToken", token);
         setCookie("accessToken", token);
      }

      const meRes = await authService.me();
      setUser(meRes.data.data);
   };

   const logout = () => {
      localStorage.removeItem("accessToken");
      deleteCookie("accessToken"); // ✅ remove from middleware's access too
      setUser(null);
   };

   return (
      <AuthContext.Provider value={{ user, login, logout, loading }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext)!;
