import React from 'react'
import { Navigate } from "react-router-dom";
import {useSelector} from 'react-redux'

function AuthRouter({ children, userAgent }) {    
    const token = useSelector(state => state.user?.user?.token)
    return (
        userAgent?.token || token ? children : <Navigate to="/" />
    )
}

export default AuthRouter;
