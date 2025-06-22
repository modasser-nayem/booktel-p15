"use client";

import { authService, userService } from "@/services/api";
import { SignupUser, User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

export interface AuthContextType {
   user: User | null;
   loading: boolean;
   login: (email: string, password: string) => Promise<void>;
   signup: (data: SignupUser) => Promise<void>;
   logout: () => Promise<void>;
   updateUser: (data: { name?: string; email?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      // Always try to get user data, let axios handle authentication
      authService
         .me()
         .then((res) => setUser(res.data.data))
         .catch(() => setUser(null))
         .finally(() => setLoading(false));
   }, []);

   const signup = async (data: SignupUser) => {
      const res = await authService.signup(data);
      setUser(res.data.data);
      setLoading(false);
   };

   const login = async (email: string, password: string) => {
      const res = await authService.login({ email, password });
      setUser(res.data.data);
      setLoading(false);
   };

   const logout = async () => {
      await authService.logout();
      setUser(null);
   };

   const updateUser = async (data: { name?: string; email?: string }) => {
      const res = await userService.updateProfile(data);
      setUser(res.data.data);
   };

   return (
      <AuthContext.Provider
         value={{ user, loading, login, signup, logout, updateUser }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
};
