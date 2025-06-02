"use client";

import { useEffect, useState } from "react";
import UserManagement from "./components/UserManagement";

export default function Home() {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const res = await fetch(
               `${process.env.NEXT_PUBLIC_API_URL}/auth/users`
            );
            const { data } = await res.json();
            setUsers(data);
         } catch (error) {
            console.error("Failed to fetch users", error);
         }
      };

      fetchUsers();
   }, []);

   return <UserManagement users={users} />;
}
