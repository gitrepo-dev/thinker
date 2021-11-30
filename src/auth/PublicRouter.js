import React from 'react'
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'

function PublicRouter({userAgent}) {
    const token = useSelector(state => state.user?.user?.token)
    if (userAgent?.token || token) {
        return             <Navigate to="/" />
    }
}

export default PublicRouter;
