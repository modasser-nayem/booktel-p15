"use client"

import { useAuth } from "@/context/AuthContext";

export default function Profile() {
    const { user } = useAuth();         

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Profile</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Account Information</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Name</span>
                            <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Email</span>
                            <span className="text-sm font-medium text-gray-900">{user?.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}