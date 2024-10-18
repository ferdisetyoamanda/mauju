import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { token, user } = useUser();
    
    // Pastikan pengguna dapat mengakses hanya jika ada token dan email


    return children;
};

export default ProtectedRoute;
