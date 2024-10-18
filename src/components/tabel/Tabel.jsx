import React, { useEffect, useState } from 'react';
import { getUsersPage } from "../../utils/config"; 
import CreateUserModal from "../modal/Create";
import EditUserModal from "../modal/Update";
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UserTable = () => {
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [isCreateModalOpen, setCreateModalOpen] = useState(false); 
    const [isEditModalOpen, setEditModalOpen] = useState(false); 
    const [selectedUser, setSelectedUser] = useState(null); 
    const [searchQuery, setSearchQuery] = useState('');  
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUsersPage(currentPage); 
                console.log('API Response:', response); 

                setUsers(response.data || []); 
                setTotalPages(response.total_pages || 1); 
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]); 

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setEditModalOpen(true);
    };


    const handleCreateClick = () => {
        setCreateModalOpen(true);
    };

    const handleDeleteClick = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(`User with ID ${userId} deleted`);
                Swal.fire('Deleted!', 'User has been deleted.', 'success');
            }
        });
    };

    const filteredUsers = users.filter(user =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative">
            <div className="overflow-x-auto m-8">
                
                <div className="">
                    <input
                        type="text"
                        placeholder="Search user"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border border-gray-300 w-full"
                    />
                </div>

                <table className="min-w-full bg-white border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-400 text-white">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Picture</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="border-t border-gray-300">
                                <td className="py-3 px-6">{user.id}</td>
                                <td className="py-3 px-6">
                                    <img
                                        src={user.avatar}
                                        alt={`${user.first_name} ${user.last_name}`}
                                        className="w-10 h-10 rounded-full"
                                    />
                                </td>
                                <td className="py-3 px-6">{user.first_name} {user.last_name}</td>
                                <td className="py-3 px-6">{user.email}</td>
                                <td className="py-3 px-6 flex space-x-2">
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        <FaEdit className="inline" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(user.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        <FaTrash className="inline" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-center mt-4 gap-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        disabled={currentPage === 1} 
                    >
                        Previous
                    </button>
                    <span className='mt-2'>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        disabled={currentPage === totalPages} 
                    >
                        Next
                    </button>
                </div>
            </div>


            <button
                onClick={handleCreateClick}
                className="fixed bottom-5 right-10 bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition"
                title="Create User"
            >
                +
            </button>

            <CreateUserModal
                isOpen={isCreateModalOpen}
                onClose={() => setCreateModalOpen(false)}
            />

            <EditUserModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                userData={selectedUser}
            />
        </div>
    );
};

export default UserTable;
