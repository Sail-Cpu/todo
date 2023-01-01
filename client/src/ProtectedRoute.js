import React, { useContext } from 'react';
import { userContext } from './context/UserContext';
import { Outlet } from 'react-router';
import SignUp from './pages/auth/SignUp'

const useAuth = () => {
    const { getToken } = useContext(userContext);
    return getToken() && getToken().loggedIn;
}

const ProtectedRoute = () => {
    return useAuth() ? <Outlet /> : <SignUp />
}

export default ProtectedRoute;