import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Title from "../../../../components/Title";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const ManageUsers = () => {
    const axiosPublic = useAxiosPublic();
    const [selectedRole, setSelectedRole] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosPublic.get("/users");
            return res.data;
        }
    });

    // Filter users based on selected role
    const handleRoleFilter = (role) => {
        setSelectedRole(role);
        if (role === "") {
            setFilteredUsers(users);
        }
        else {
            const filtered = users.filter(user => user.role === role);
            setFilteredUsers(filtered);
        }
    };

    // Reset filter
    const resetFilter = () => {
        setSelectedRole("");
        setFilteredUsers(users);
    };

    // Update user role
    const handleUpdateUserRole = async (userId, newRole) => {
        try {
            await axiosPublic.patch(`/users/${userId}/role`, { role: newRole });
            await Swal.fire({
                title: "Updated!",
                text: "User role has been updated.",
                icon: "success",
                background: "var(--accent-100)",
            });
            refetch(); // Refresh user list after role update
        } catch (error) {
            console.error("Error updating user role:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update user role.",
                icon: "error",
                background: "var(--accent-100)",
            });
        }
    };

    // Delete user
    const handleDeleteUser = async (userId) => {
        // Use SweetAlert for confirmation
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete user!",
            background: "var(--accent-100)",
            color: "var(--text-primary)",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosPublic.delete(`/users/${userId}`);
                    await Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success",
                        background: "var(--accent-100)",
                        color: "var(--text-primary)",
                    });
                    refetch(); // Refresh user list after deletion
                } catch (error) {
                    console.error("Error deleting user:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the user.",
                        icon: "error",
                        background: "var(--accent-100)",
                        color: "var(--text-primary)",
                    });
                }
            }
        });
    };

    // Use filteredUsers if a role is selected, otherwise use all users
    const displayedUsers = selectedRole ? filteredUsers : users;

    // Options for user roles
    const roleOptions = [
        { value: "user", label: "User" },
        { value: "moderator", label: "Moderator" },
        { value: "admin", label: "Admin" }
    ];

    return (
        <>
            <Helmet>
                <title>Admin Dashboard | Manage Users</title>
            </Helmet>

            <div className="container my-16 mx-auto px-2 md:px-4">
                <Title title="Manage Users" />

                <div className="p-4 flex justify-end mb-4">
                    {/* Sort/Filter Dropdown */ }
                    <select
                        className="border border-gray-300 bg-background-50 rounded px-3 py-1 focus:outline-none"
                        value={ selectedRole }
                        onChange={ (e) => handleRoleFilter(e.target.value) }
                    >
                        <option value="">All Roles</option>
                        {
                            roleOptions.map(role => (
                                <option key={ role.value } value={ role.value }>{ role.label }</option>
                            ))
                        }
                    </select>
                    {/* Reset filter button */ }
                    { selectedRole && (
                        <button
                            className="ml-2 bg-gray-200 text-gray-600 px-3 py-1 rounded-md focus:outline-none"
                            onClick={ resetFilter }
                        >
                            Reset Filter
                        </button>
                    ) }
                </div>

                <div>
                    <div className="p-4 flex">
                        <h1 className="text-2xl">Total Users: { displayedUsers.length }</h1>
                    </div>

                    <div className="px-3 py-4 flex overflow-scroll">
                        <table className="w-full bg-accent-100 shadow rounded mb-4 text-xs lg:text-sm">
                            <tbody>
                                <tr className="border-b border-accent-100">
                                    <th className="p-2"></th>
                                    <th className="text-left p-3 px-5">Name</th>
                                    <th className="text-left p-3 px-5">Email</th>
                                    <th className="text-left p-3 px-5">Role</th>
                                    <th></th>
                                </tr>
                                { displayedUsers.map((user, index) => (
                                    <tr
                                        key={ user._id }
                                        className="border-b hover:bg-primary-100 bg-background-50 border-accent-100"
                                    >
                                        <th>{ index + 1 }</th>
                                        <td className="p-3 px-5">{ user.name }</td>
                                        <td className="p-3 px-5">{ user.email }</td>
                                        <td className="p-3 px-5">
                                            {/* Role Dropdown */ }
                                            { user.role !== "admin" ? (
                                                <select
                                                    className="border border-gray-300 bg-background-50 rounded px-2 py-1 focus:outline-none"
                                                    value={ user.role }
                                                    onChange={ (e) => handleUpdateUserRole(user._id, e.target.value) }
                                                >
                                                    {
                                                        roleOptions.map(role => (
                                                            <option key={ role.value } value={ role.value }>{ role.label }</option>
                                                        ))
                                                    }
                                                </select>
                                            ) : (
                                                <span>{ user.role }</span>
                                            ) }
                                        </td>
                                        <td className="p-3 px-5 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={ () => handleDeleteUser(user._id) }
                                                className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageUsers;