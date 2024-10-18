import React, { useState } from 'react';
import LoginForm from '../../components/login/Login';
import RegisterForm from '../../components/register/Register';
import left from '../../assets/left.png';

const PageDashboard = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        console.log("Current Form State:", !isLogin);
    };

    return (
        <div className='md:flex h-screen'>
            <div className="left-content bg-gradient-to-b from-blue-400 to-blue-900 md:w-3/5 hidden md:flex md:h-full">
                <div className="flex flex-col justify-center items-center md:w-1/2 h-full">
                    <div className="content">
                        <h1 className="text-white text-2xl font-bold">GoFinance</h1>
                        <p className="text-white my-2">Lorem ipsum dolor sit amet</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-3xl">
                            <p>Read more</p>
                        </button>
                    </div>
                </div>
                <img 
                    src={left} 
                    alt="Left" 
                    className="absolute bottom-0 left-0 w-84 h-52 object-contain" // Atur posisi dan ukuran sesuai keinginan
                />
                
            </div>

            <div className="right-content md:w-2/5 h-full">
                <div className="flex justify-center items-center h-full p-10">
                    <div>
                        {isLogin ? <LoginForm /> : <RegisterForm />}
                        <div className="text-center">
                            {isLogin ? (
                                <p>
                                    {' '}
                                    <button onClick={toggleForm} className="text-blue-500 underline">
                                        Create new account?
                                    </button>
                                </p>
                            ) : (
                                <p>
                                    {' '}
                                    <button onClick={toggleForm} className="text-blue-500 underline">
                                        Already have an account?
                                    </button>
                                </p>
                            )}
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default PageDashboard;
