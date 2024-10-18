import React from "react";
import { useNavigate } from 'react-router-dom';
import Profile from "../../components/profile/Profile";
import Navbar from "../../components/NavBar";
import { useUser } from "../../context/AuthContext";

const ProfilePage = () => {
    const { token, user } = useUser();
    const navigate = useNavigate();

   
    if (!token || !user || !user.email) {
        
        navigate('/');
        return null;
    }

    return (
        <>
            <Navbar />
            <Profile />
        </>
    );
};

export default ProfilePage;


