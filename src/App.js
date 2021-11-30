import React, { useEffect } from 'react'
import './App.css'
import Registration from './auth/Registration'
import Login from './auth/Login'
import { Routes, Route } from 'react-router-dom'
import AuthRouter from './auth/AuthRouter'
import Home from './pages/Home'
import SinglePage from './pages/SinglePage'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { storeLoginCredential } from './redux/userSlice'

export default function App() {

  //  GET USER CREDENTIAL FROM LOCALSTORAGE SET TO REDUX
  let userAgent;
  const info = localStorage.getItem('user-agent')
  if(info){
    userAgent = JSON.parse(info) 
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (userAgent?.token) {
      dispatch(storeLoginCredential(userAgent));
      navigate('/thinker', { replace: true })
    }
  }, [userAgent?.token])

  return (
    <Routes>
      <Route exact={true} path="/signup" element={<Registration />} />
      <Route exact={true} path="/" element={<Login />} />
      <Route exact={true} path="/thinker" name="Thinker" element={<AuthRouter userAgent={userAgent}><Home /></AuthRouter>} />
      <Route exact={true} path="/blog/:id" name="Page" element={<AuthRouter userAgent={userAgent}><SinglePage /></AuthRouter>} />
    </Routes>
  )
}
