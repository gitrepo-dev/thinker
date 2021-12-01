import React, { useState } from 'react'
import home from '../assets/images/home.png'
import firends from '../assets/images/friends.png'
import mail from '../assets/images/mail.png'
import bell from '../assets/images/bell.png'
import { Link } from 'react-router-dom'
import { logOutUser } from '../redux/userSlice'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
export default function Header() {

    const [loading, setloading] = useState(false)

    const user = useSelector(state => state.user?.user?.name)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogOut = e => {
        e.preventDefault()
        setloading(true)
        try{
            dispatch(logOutUser())
            navigate('/', { replace: true })
        }catch(e){
            setloading(false)
        }        
    }


    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-blue-400 h-12 w-12"></div>
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-blue-400 rounded w-3/4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-blue-400 rounded"></div>
                            <div className="h-4 bg-blue-400 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    } else {

        return (
            <div className="fixed w-full top-0 z-10 bg-white">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 px-5 py-3 border-b-2 border-gray-300">
                    <div className="font-bold text-3xl text-primary heading flex items-center">
                        Thinkers
                    </div>
                    <div className="hidden md:flex items-center justify-between w-full">
                        <ul className="flex items-center justify-between block w-full">
                            <li><Link to="/thinker"><img src={home} alt="" style={{ width: '25px' }} title="Home" /></Link></li>
                            <li><Link to="/thinker"><img src={firends} alt="" style={{ width: '26px' }} title="Friends" /></Link></li>
                            <li><Link to="/thinker"><img src={mail} alt="" style={{ width: '25px' }} title="Mail" /></Link></li>
                            <li><Link to="/thinker"><img src={bell} alt="" style={{ width: '25px' }} title="Notification" /></Link></li>
                        </ul>
                    </div>
                    <div className="flex justify-end items-center">
                        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-primary text-white text-lg cursor-pointer" title="Logout" onClick={handleLogOut}>{ user?.charAt(0)?.toUpperCase()}</div>
                    </div>
                </div>
            </div>
        )
    }
}