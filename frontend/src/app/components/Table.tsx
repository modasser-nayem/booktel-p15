"use client";
import React from "react";
import avatar from "@/app/avatar.jpg";
import Image from "next/image";

interface User {
   id: string;
   name: string;
   email: string;
}

interface TableBodyProps {
   user: User;
}

const Table: React.FC<TableBodyProps> = ({ user }) => {
   return (
      <>
         <tr className="border-b bg-gray-800 hover:bg-gray-700 transition duration-200">
            <td className="py-4 px-6">
               <Image
                  src={avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 border-white"
               />
            </td>
            <td className="py-4 px-6">{user.name}</td>
            <td className="py-4 px-6">{user.email}</td>
            <td className="py-4 px-6">
               <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition duration-300">
                  View Info
               </button>
            </td>
         </tr>
      </>
   );
};

export default Table;
