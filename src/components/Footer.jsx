import React from 'react'
import { Link } from 'react-router-dom'
import facebook from '../assets/images/facebook.png'
import twitter from '../assets/images/twitter.png'
import instagram from '../assets/images/instagram.png'

export default function Footer() {
    return (
        <div className="fixed bottom-0 w-full border-t-2 border-gray-300">
            <div className="sm:flex items-center justify-between px-5 bg-white py-3">
                <span className="font-bold text-gray-600">All rights reserved @ 2021</span>
                <span>
                    <ul className="flex items-center justify-between block w-full">
                        <li><Link to="https://www.facebook.com/"><img src={facebook} alt="" style={{ width: '25px' }} /></Link></li>
                        <li className="mx-3"><Link to="/https://www.instagram.com/"><img src={instagram} alt="" style={{ width: '26px' }} /></Link></li>
                        <li><Link to="https://twitter.com/?lang=en"><img src={twitter} alt="" style={{ width: '25px' }} /></Link></li>
                    </ul>
                </span>
            </div>
        </div>
    )
}
