"use client";

import { useEffect, useState } from "react";
import { userService } from "@/services/api";
import { User, UserRole } from "@/types/user";
import { useApi } from "@/hooks/useApi";
import { useDebounce } from "@/hooks/useDebounce";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const ROLES: UserRole[] = ["ADMIN", "HOTEL_OWNER", "CUSTOMER"];
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
const ORDER_FIELDS = [
  { value: "createdAt", label: "Created At" },
  { value: "name", label: "Name" },
];
const ORDER_DIRECTIONS = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

function formatAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d`;
  return `${Math.floor(diff / 2592000)}mo`;
}

function getRoleColor(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return "bg-red-100 text-red-700 border-red-200";
    case "HOTEL_OWNER":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "CUSTOMER":
      return "bg-green-100 text-green-700 border-green-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export default function AdminUsers() {
  const [role, setRole] = useState<string>("all");
  const [email, setEmail] = useState("");
  const debouncedEmail = useDebounce(email, 400);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data,
    loading,
    error,
    execute: fetchUsers,
  } = useApi(async () => {
    const res = await userService.getAllUsers({
      role: role === "all" ? undefined : (role as UserRole),
      email: debouncedEmail || undefined,
      page,
      limit,
    });
    return res.data.data;
  });

  // For role update and delete actions
  const { execute: updateUserRole, loading: updatingRole } = useApi(userService.updateUserRole, {
    successMessage: "User role updated!",
    errorMessage: "Failed to update user role.",
  });
  const { execute: deleteUser, loading: deletingUser } = useApi(userService.deleteUser, {
    successMessage: "User deleted!",
    errorMessage: "Failed to delete user.",
  });

  useEffect(() => {
    setPage(1); // Reset to first page on filter/search/limit change
  }, [role, debouncedEmail, limit]);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, debouncedEmail, page, limit]);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    await updateUserRole({ id: userId, role: newRole });
    fetchUsers();
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
      fetchUsers();
    }
  };

  // Pagination helpers
  const totalPages = data?.meta?.totalPages || 1;
  const currentPage = data?.meta?.page || 1;

  return (
    <div className="max-w-6xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
            <div className="w-full md:w-48">
              <label className="block text-sm font-medium mb-1">Filter by Role</label>
              <Select value={role} onValueChange={val => setRole(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <label className="block text-sm font-medium mb-1">Search by Email</label>
              <Input
                type="text"
                placeholder="Type email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full md:w-36">
              <label className="block text-sm font-medium mb-1">Users per page</label>
              <Select value={String(limit)} onValueChange={val => setLimit(Number(val))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <SelectItem key={size} value={String(size)}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500">Loading users...</div>
          ) : error ? (
            <div className="py-12 text-center text-red-500">{error}</div>
          ) : !data || !data.data || (Array.isArray(data.data) && data.data.length === 0) ? (
            <div className="py-12 text-center text-gray-500">No users found.</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 border">Profile</th>
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Email</th>
                      <th className="px-4 py-2 border">Role</th>
                      <th className="px-4 py-2 border">Created</th>
                      <th className="px-4 py-2 border">Updated</th>
                      <th className="px-4 py-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(Array.isArray(data.data) ? data.data : []).map((user: User) => (
                      <tr key={user.id} className="even:bg-gray-50">
                        <td className="px-4 py-2 border">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            <span className="text-lg text-gray-500">{user.name?.[0] || "?"}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 border">{user.name}</td>
                        <td className="px-4 py-2 border">{user.email}</td>
                        <td className="px-4 py-2 border">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold border ${getRoleColor(user.role)}`}>{user.role}</span>
                        </td>
                        <td className="px-4 py-2 border whitespace-nowrap">{formatAgo(user.createdAt)}</td>
                        <td className="px-4 py-2 border whitespace-nowrap">{formatAgo(user.updatedAt)}</td>
                        <td className="px-4 py-2 border">
                          <Select
                            value={user.role}
                            onValueChange={(val) => handleRoleChange(user.id, val as UserRole)}
                            disabled={updatingRole}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {ROLES.map((r) => (
                                <SelectItem key={r} value={r}>{r}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(user.id)}
                            disabled={deletingUser}
                            className="ml-2"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination Controls */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1 || loading}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || loading}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}