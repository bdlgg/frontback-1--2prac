import React from "react";
import {Navigate} from "react-router-dom";
import {tokenStorage} from "../api/client.js";

export default function ProtectedRoute({children}) {
    const accessToken = tokenStorage.getAccessToken();
    const refreshToken = tokenStorage.getRefreshToken();
    if (!accessToken && !refreshToken) {
        return <Navigate to="/login" replace />;
    }
    return children;
}