"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { UserType } from "@/types/User";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchUsers = async () => {
  const { data } = await axios.get(`${apiUrl}/users`);
  return data;
};

const deleteUser = async (id: string) => {
  const { data } = await axios.post(`${apiUrl}/delete-user/${id}`);
  return data;
};

export default function UsersPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      mutation.mutate(id);
    }
  };

  const filteredUsers = users?.filter((user: UserType) =>
    user.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading users</p>;

  return (
    <div
      className="flex flex-col items-center p-10 w-[80vw] border border-gray-300 bg-gray-50 rounded-xl shadow-lg overflow-hidden"
      style={{ maxHeight: "90vh" }}
    >
      <div className="w-full max-w-4xl sticky top-0 bg-gray-50 z-10 border-gray-300 mb-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-semibold">Users</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => router.push("/users/new")}
          >
            Create User
          </button>
        </div>
        <div className="w-full mb-4">
          <input
            type="text"
            className="w-[29vw] p-2 border border-gray-400 rounded-lg"
            placeholder="Search for users..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl overflow-auto custom-scrollbar"
        style={{ maxHeight: "75vh" }}
      >
        {filteredUsers?.map((user: UserType, index: number) => (
          <div
            key={user._id}
            className={`p-4 rounded-lg shadow-md flex flex-col items-center transition-all duration-300 hover:shadow-lg ${
              index % 2 === 0 ? "bg-white" : "bg-blue-50"
            } group`}
          >
            <div
              className={`w-16 h-16 flex items-center justify-center text-xl font-bold rounded-full ${
                index % 2 === 0 ? "bg-purple-300" : "bg-cyan-300"
              }`}
            >
              {user.name[0]}
            </div>
            <h2 className="mt-2 text-lg font-semibold">{user.name}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {user.interests.map((interest, i) => (
                <span
                  key={i}
                  className="bg-green-200 px-2 py-1 rounded-md text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => router.push(`/users/${user._id}`)}
              >
                <PencilSquareIcon className="h-6 w-6" />
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(user._id)}
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
