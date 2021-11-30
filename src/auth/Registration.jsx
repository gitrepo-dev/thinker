import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../graphql/authUser'
import { validator } from '../comman/validator'
import { Validation_Type } from '../comman/formConstant'
import { Link } from 'react-router-dom'
import signUpImg from '../assets/images/signup.png'
import { useDispatch, useSelector } from 'react-redux'
import { storeRegistrationCredential } from '../redux/userSlice'
import { useNavigate } from "react-router-dom";

export default function Registration() {

    // for create new user 
    const [createUser, { loading, data }] = useMutation(CREATE_USER)
    const [errors, setErrors] = useState({})

    const [state, setState] = useState({
        username: { value: "", validationType: Validation_Type.ALPHA },
        email: { value: "", validationType: Validation_Type.EMAIL },
        password: { value: "", validationType: Validation_Type.PASSWORD },
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(state => state.user?.user?.token)

    useEffect(() => {
        if (data?.createUser?.token || token) {
            dispatch(storeRegistrationCredential(data?.createUser))
            navigate('/thinker', { replace: true })
        }
    }, [data?.createUser])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let obj = state[name];
        obj = { ...obj, value }
        const newIntialValues = { ...state, [name]: obj }
        setState(newIntialValues);
    }


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

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, email, password } = state;

        if (formIsValid()) {
            createUser({
                variables: {
                    name: username.value,
                    email: email.value,
                    password: password.value
                },
            })
        }
    }

    const { username, email, password } = errors

    if (loading) {
        return (
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

        )
    }

    else {
        return (
            <div className="flex items-center justify-center  h-full mt-5 lg:mt-10">
                <div className="container px-3 px-md-5 md:px-5 lg:px-10">
                    <div className="grid md:grid-cols-2 gap-10 md:gap-10">
                        <div className="flex justify-center items-center">
                            <img src={signUpImg} alt="" className="login-img" />
                        </div>
                        <form action="" className="bg-gray-200 p-5 border-4 border-4 border-light-blue-500 drop-shadow-xl w-full md:p-10 max-w-lg">
                            <div className="font-bold text-5xl text-center mb-5 text-primary heading">Thinker</div>
                            {
                                data?.createUser?.response?.status === 403 ?
                                    <small className="text-center block w-full mb-3 text-red-700">{data?.createUser?.response?.message} </small>
                                    : ""}
                            <div className="my-2">
                                <label htmlFor="username" className="mb-3 block">Name*</label>
                                <input type="text" name="username" placeholder="Name" className="px-3 py-2 focus:outline-none focus:border-none form-control" onChange={handleInputChange} />
                                <small className="text-red-700 block mt-2">{username}</small>
                            </div>
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
                            <button type="submit" className="mt-5  block w-full px-3 py-2 text-white border-0 rounded-md btn-primary" onClick={handleSubmit}>Sign Up</button>
                            <p className="my-2 text-center">-or-</p>
                            <Link to="/" className="text-center mt-2 block">I have already an account</Link>
                        </form>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
}