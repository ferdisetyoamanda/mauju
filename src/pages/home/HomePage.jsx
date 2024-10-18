import React from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/NavBar";
import { useUser } from "../../context/AuthContext";
import UserTable from "../../components/tabel/Tabel"

const HomePage = () => {
    const { token, user } = useUser();
    console.log(user, token);
    const navigate = useNavigate();

   
    if (!token || !user || !user.email) {
       
        navigate('/');
        return null;
    }

    return (
        <>
            <Navbar />
            <UserTable />
        </>
    );
};

export default HomePage;


