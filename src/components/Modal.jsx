import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_POST } from '../graphql/mutation'
import { updatePosts } from '../redux/postSlice'
import { validator } from '../comman/validator'
import { Validation_Type } from '../comman/formConstant'
import photo from '../assets/images/image.png'
import { useDispatch, useSelector } from 'react-redux'

export default function Model({ behave, onClick }) {

    const user = useSelector(state => state.user?.user?.name)

    // for create new post 
    const [CreatePost, { data }] = useMutation(CREATE_POST)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const [state, setState] = useState({
        title: { value: "", validationType: Validation_Type.TEXT },
        description: { value: "", validationType: Validation_Type.TEXT },
        image: { value: "", validationType: Validation_Type.TEXT },
    })


    const [file, setFile] = useState('')

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        // set file in file state
        if (files) { setFile({ ...file, file: files[0] }) }

        // set values of all state variables
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

    const [fileNotFound, setFileNotFound] = useState(false)



    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, description } = state;
        if (!file) {
            setFileNotFound(true)
        }
        if (formIsValid() && file) {
            setFileNotFound(false)
            setLoading(true)
            // for image
            const media = new FormData();
            media.append('file', file.file);
            media.append('cloud_name', 'mediaapicloud');
            media.append('upload_preset', 'thinker');
            fetch('https://api.cloudinary.com/v1_1/mediaapicloud/image/upload', {
                method: 'POST',
                body: media
            }).then(res => res.json())
                .then(json => {
                    if (json?.url) {
                        // sent all value to api
                        CreatePost({
                            variables: {
                                title: title.value,
                                description: description.value,
                                image: json.url,
                                postedby: user
                            },
                        })

                        dispatch(updatePosts({
                            title: title.value,
                            description: description.value,
                            image: json.url,
                            postedby: "jay"
                        }))
                        setLoading(false)
                        setFile('')
                        removeFileName()
                        setState({
                            ...state,
                            title: "",
                            description: "",
                            image: ""
                        })
                    }
                }).catch(e => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
            if (file) {
                setFileNotFound(false)
            }
        }
    }

    const removeFileName = () => {
        onClick()
        setFile('')
        setState({
            ...state,
            title: "",
            description: "",
            image: ""
        })
        setErrors({
            ...errors,
            title: "",
            description: "",
            image: ""
        })
        setFileNotFound(false)

    }

    const { title, description, image } = errors

    if (loading) {
        return (
            <div className="fixed w-full h-full left-0 mx-auto right-0 bg-gray-200 top-0 z-30 flex items-center">
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
            <>
                {behave ?
                    <div className="mx-auto overlay">
                        <form action="" className="bg-gray-200 p-2 border-4 border-4 border-light-blue-500 drop-shadow-xl w-full md:p-5 max-w-xl mx-auto form">
                            <div className="border-b-2 border-gray-300">
                                <input type="text" name="title" placeholder="Title*" className="px-3 py-2 focus:outline-none focus:border-none form-control" value={state?.title?.value} onChange={handleInputChange} />
                                <small className="text-red-700 block mb-2">{title}</small>
                            </div>
                            <div className="">
                                <textarea type="text" name="description" value={state?.description?.value} rows={3} placeholder="Description*" className="px-3 py-2 focus:outline-none focus:border-none form-control" onChange={handleInputChange}></textarea>
                                <small className="text-red-700 block mb-2">{description}</small>
                            </div>


                            <div className="mb-2">
                                <div className="relative">
                                    <div className="input-wrap">
                                        <input type="file" name="image" placeholder="Image" className="px-3 py-2 focus:outline-none focus:border-none real-file" onChange={handleInputChange} />
                                    </div>
                                    <div className="flex items-center">
                                        <label className="file-label" htmlFor="actual-btn"><img src={photo} alt="" className="mr-2 w-6" />  Choose Photo</label>
                                        <span id="file-chosen">{file?.file?.name || "No file chosen"}</span>
                                    </div>
                                </div>
                                {fileNotFound ? <small className="text-red-700 block mt-2">This filed is required</small> : image ? <small className="text-red-700 block mt-2">{image}</small> : ""}
                            </div>
                            <button type="submit" className="mt-5 mb-3  block w-full px-3 py-2 text-white border-0 rounded-md btn-primary" onClick={handleSubmit}>Post</button>
                            <div className="text-sm text-center text-blue-700 cursor-pointer" onClick={removeFileName}>Cancel</div>
                        </form>
                    </div> : ""
                }
            </>
        )
    }
}
