import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { HiMenu } from 'react-icons/hi'; // Icon burger dari react-icons
import { useUser } from '../context/AuthContext'; 

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State untuk mobile menu
    const { user, logout } = useUser();  
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen); // Buka tutup mobile menu
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false); 
                setIsMobileMenuOpen(false); // Tutup menu jika klik di luar
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, log out!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();  
                navigate('/');  
                Swal.fire('Logged Out!', 'You have been logged out.', 'success');
            }
        });
    };

    return (
        <nav className="bg-blue-600 p-4 flex justify-between items-center">
            <div className="text-white text-2xl font-bold">
                <Link to="/home">GoFinance</Link>
            </div>
            <button className="text-white md:hidden" onClick={toggleMobileMenu}>
                <HiMenu size={28} />
            </button>
            {/*Mobile */}
            {isMobileMenuOpen && (
                <div className="absolute right-0 top-14 mr-4 bg-white rounded-md shadow-lg z-10 " ref={dropdownRef}>
                    {user && (
                        <>
                            <div className="flex items-center space-x-3 p-4">
                                <img 
                                    src={user.avatar}  
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold">{`${user.first_name} ${user.last_name}`}</p>
                                    <p className="text-sm">{user.email}</p>
                                </div>
                            </div>
                            <div>
                                <Link to="/home" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>
                                    Home
                                </Link>
                            </div>
                            <Link 
                                to="/profile" 
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-xl"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                View Profile
                            </Link>
                            <button
                                onClick={handleLogout} 
                                className="w-full text-left px-4 py-2 text-gray-800 hover:text-white hover:bg-red-500 rounded-xl"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* Desktop */}
            {user && (
                <div className="hidden md:flex relative items-center space-x-4" ref={dropdownRef}>
                    <div className='mr-8 '>
                        <Link to="/home" className=" p-2 px-4 rounded-md text-white hover:text-black hover:bg-white">Home</Link>
                    </div>
                    <img 
                        src={user.avatar}  
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-white">
                        <p className="font-semibold">{`${user.first_name} ${user.last_name}`}</p>  
                        <p className="text-sm">{user.email}</p>  
                    </div>
                    <button 
                        onClick={toggleDropdown} 
                        className="text-white font-semibold focus:outline-none"
                    >
                        ▼
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-40 w-48 bg-white rounded-md shadow-lg z-10">
                            <Link 
                                to="/profile" 
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-xl"
                                onClick={() => setDropdownOpen(false)}
                            >
                                View Profile
                            </Link>
                            <button
                                onClick={handleLogout} 
                                className="w-full text-left px-4 py-2 text-gray-800 rounded-xl hover:text-white hover:bg-red-500"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
