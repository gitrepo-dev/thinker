import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { LOGIN_USER } from '../graphql/authUser'
import { Link } from 'react-router-dom'
import { validator } from '../comman/validator'
import { Validation_Type } from '../comman/formConstant'
import loginImg from '../assets/images/login.png'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { storeLoginCredential } from '../redux/userSlice'

export default function Login() {


    const [userCredentical, setUserCredentical] = useState({
        email: '',
        password: ""
    })

    const { loading, data } = useQuery(LOGIN_USER, {
        variables: {
            email: userCredentical.email.value,
            password: userCredentical.password.value
        },
    })

    // ASas12@#$
    const dispatch = useDispatch()
    const token = useSelector(state => state?.user?.user?.token)
    const navigate = useNavigate()
    useEffect(() => {
        if (data?.loginUser?.token || token) {
            dispatch(storeLoginCredential(data?.loginUser));
            navigate('/thinker', { replace: true })
        }
    }, [data?.loginUser])

    //  validation error
    const [errors, setErrors] = useState({})

    //  set input valuse
    const [state, setState] = useState({
        email: { value: "", validationType: Validation_Type.EMAIL },
        password: { value: "", validationType: Validation_Type.PASSWORD },
    })

    //  on change set input value
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let obj = state[name];
        obj = { ...obj, value }
        const newIntialValues = { ...state, [name]: obj }
        setState(newIntialValues);
    }

    //  if valid 
    const formIsValid = () => {
        let objError = {};
        let values = {}
        values = { ...state }
        for (const key in values) {
            let obj = values[key];
            const error = validator(obj.validationType, obj.value);
            if (error) objError = { ...objError, [key]: error }
        }
        setErrors(objError)
        return !(Object.keys(objError).length > 0);
    };

    //  on submit sent the data to api
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = state;

        if (formIsValid()) {
            setUserCredentical({
                ...userCredentical,
                email: email,
                password: password
            })
        }

    }

    //  destructuring the eror var
    const { email, password } = errors

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
    }
    else {
        return (
            <div className="flex items-center justify-center h-full mt-5 lg:mt-10">
                <div className="container px-3 md:px-5 lg:px-10">
                    <div className="grid md:grid-cols-2 gap-10 md:gap-10">
                        <div className="flex justify-center items-center">
                            <img src={loginImg} alt="" className="login-img" />
                        </div>
                        <form action="" className="flex justify-center items-center md:max-w-lg">
                            <div className="bg-gray-200 p-5 border-4 border-4 border-light-blue-500 drop-shadow-xl w-full md:p-10 max-w-3xl">
                                <div className="font-bold text-5xl text-center mb-5 text-primary heading">Thinker</div>
                                {
                                    data?.loginUser?.response?.status === 404 ?
                                        <small className="text-center block w-full mb-3 text-red-700">{data?.loginUser?.response?.message} </small>
                                        : ""}
                                <div className="my-2">
                                    <label htmlFor="email" className="mb-3 block">Email*</label>
                                    <input type="email" name="email" placeholder="Email" className="px-3 py-2 focus:outline-none focus:border-none form-control" onChange={handleInputChange} />
                                    <small className="text-red-700 block mt-2">{email}</small>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="password" className="mb-3 block">Password*</label>
                                    <input type="password" name="password" placeholder="Password" className="px-3 py-2 focus:outline-none focus:border-none form-control" onChange={handleInputChange} />
                                    <small className="text-red-700 block mt-2">{password}</small>
                                </div>
                                <button type="submit" className="mt-5 bg-primary block w-full px-3 py-2 text-white border-0 rounded-md" onClick={handleSubmit}>Login</button>
                                <p className="my-2 text-center">-or-</p>
                                <Link to="/signup" className="text-center mt-2 block">Create new Account</Link>
                            </div>
                        </form>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
}