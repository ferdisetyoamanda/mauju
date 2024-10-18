import React from 'react';
import { useUser } from '../../context/AuthContext';

const Profile = () => {
    const { user } = useUser();

    return (
        <div className="flex flex-col items-center  min-h-screen  p-2">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Profile</h1>
                {user ? (
                    <div className="flex flex-col items-center text-center">
                        <img
                            src={user.avatar}
                            alt="User Avatar"
                            className="rounded-full w-32 h-32 mb-4 border-4 border-blue-500 object-cover"
                        />
                        <h2 className="text-2xl font-semibold text-gray-800">{user.first_name} {user.last_name}</h2>
                        <p className="text-gray-600 text-lg">{user.email}</p>
                    </div>
                ) : (
                    <p className="text-red-500 text-center">User data is not available.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
