import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";


const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    //console.log(auth)

    if (auth) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" state={{ from: location}} replace />;
    }
}

export default RequireAuth;