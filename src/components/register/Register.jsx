import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import { AiOutlineLock } from 'react-icons/ai';
import { IoPerson } from "react-icons/io5";
import Swal from 'sweetalert2';
import { register } from '../../utils/config';


const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    console.log(name,email,password);

    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register(email, password);
            console.log(response);
            if (response.token) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'You have successfully registered!',
                    confirmButtonText: 'OK'
                }).then(() => {
                    localStorage.setItem('token', response.token);
                    window.location.reload();
                });
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.response.data.error,
                    confirmButtonText: 'OK'
                });
            } else {
                // Fallback in case there's no error message
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: 'An error occurred. Please try again later.',
                    confirmButtonText: 'OK'
                });
            }
        }
    }
    return (
        <div className="content m-5">
            <h1 className="text-black text-2xl font-bold">Hello!</h1>
            <p className="text-black my-2">Sign Up to Get Started</p>

            <div className="flex items-center border border-gray-300 rounded-lg w-full py-2 my-2">
                <IoPerson className="text-gray-400 ml-3" />
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-3 outline-none"
                    onChange={handleNameChange}
                />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg w-full py-2 my-2">
                <FiMail className="text-gray-400 ml-3" />
                <input
                    type="text"
                    placeholder="Email Address"
                    className="w-full pl-3 outline-none"
                    onChange={handleEmailChange}
                />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg w-full py-2 my-2">
                <AiOutlineLock className="text-gray-400 ml-3" />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full pl-3 outline-none"
                    onChange={handlePasswordChange}
                />
            </div>

            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white w-full py-2 my-2 rounded-3xl">
                <p>Register</p>
            </button>


        </div>
    );
}

export default RegisterForm;
