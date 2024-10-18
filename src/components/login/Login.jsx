import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/AuthContext';
import { FiMail } from 'react-icons/fi';
import { AiOutlineLock } from 'react-icons/ai';
import Swal from 'sweetalert2';
import ForgotPasswordModal from '../modal/ForgotPassword';
import { login, getUsers } from '../../utils/config';

const LoginForm = () => {
    const { saveUserToken, saveUserData } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            const users = await getUsers();
        }
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            if (response.token) {
                saveUserToken(response.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'You have successfully logged in!',
                    confirmButtonText: 'OK'
                }).then(async () => {
                    const users = await getUsers();
                    const currentUser = users.find(user => user.email === email);
                    if (currentUser) {
                        saveUserData(currentUser);
                    }
                    navigate('/home');
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.response?.data?.error || 'An unexpected error occurred. Please try again.',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="content m-5">
            <h1 className="text-black text-2xl font-bold">Hello Again!</h1>
            <p className="text-black my-2">Welcome Back</p>

            <div className="flex items-center border border-gray-300 rounded-lg w-full py-2 my-2">
                <FiMail className="text-gray-400 ml-3" />
                <input
                    type="text"
                    placeholder="Email Address"
                    className="w-full pl-3 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg w-full py-2 my-2">
                <AiOutlineLock className="text-gray-400 ml-3" />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full pl-3 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white w-full py-2 my-2 rounded-3xl">
                <p>Login</p>
            </button>

            <p className="text-center text-gray-600 mt-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-blue-500 underline"
                >
                    Forgot Password?
                </button>
            </p>
            <ForgotPasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default LoginForm;
