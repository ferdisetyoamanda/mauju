import React, { useState } from 'react';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Request to reset password for:', email);
        onClose(); 
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-5 w-1/3">
                <h2 className="text-lg font-bold mb-4">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border border-gray-300 rounded-lg w-full p-2"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="btn flex gap-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                        >
                            Send Reset Link
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className=" text-gray-600 hover:text-white hover:bg-red-500 py-2 px-4 rounded-lg"
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;
