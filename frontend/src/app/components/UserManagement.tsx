/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Table from "./Table";

const UserManagement = ({ users }: any) => {
   return (
      <div className="flex flex-col h-screen w-screen bg-black">
         <h1 className="text-4xl font-extrabold text-center text-white mt-6">
            User Management Page
         </h1>
         <div className="flex-grow flex justify-center items-center">
            <div className="card">
               <button className="bg-green-500 text-white py-2 px-4 rounded mb-4">
                  Add User
               </button>
               <table className="min-w-full text-white">
                  <thead>
                     <tr className="bg-blue-900 text-white shadow-md">
                        <th className="py-4 px-6 text-left text-lg">
                           Profile Photo
                        </th>
                        <th className="py-4 px-6 text-left text-lg">Name</th>
                        <th className="py-4 px-6 text-left text-lg">Email</th>
                        <th className="py-4 px-6 text-left text-lg">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {users.map((user: any) => (
                        <Table
                           key={user.id}
                           user={user}
                        />
                     ))}
                  </tbody>
               </table>
               <span className="top" />
               <span className="bottom" />
               <span className="right" />
               <span className="left" />
            </div>
         </div>
      </div>
   );
};

export default UserManagement;
