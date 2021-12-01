import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getPostbyID } from '../redux/postSlice'
import { useQuery } from '@apollo/client'
import { GET_BLOG_BY_ID } from '../graphql/getPosts'
import Title from '../assets/images/title.png'
import leftarrow from '../assets/images/left-arrow.png'
import {Link} from 'react-router-dom'

export default function SinglePage() {

    const user = useSelector(state => state.user?.user?.name)

    const { id } = useParams();
    const paramsID = window?.location?.pathname?.split('/')[2]
    const { loading, data } = useQuery(GET_BLOG_BY_ID, {
        variables: { id: id || paramsID },
    })


    const post = useSelector(state => state?.post?.posts)

    const dispatch = useDispatch();

    // fetch data by id
    useEffect(() => {
        dispatch(getPostbyID(data?.getPostById))
    }, [data])

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
            <div>
                <Link to="/thinker" className="max-w-6xl mx-auto block">
                    <img src={leftarrow} alt="left-arrow" className="pb-5 mr-auto mt-24 w-8 cursor-pointer" />
                </Link>
                <Header />
                {
                    post && post?.map((value, index) => {
                        return (
                            <div className="max-w-6xl mt-0 border-2 border-gray-300 mx-auto" key={index}>
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="mb-5 md:mb-0">
                                        <img src={value?.image} className="w-full h-auto" alt={value?.title} />
                                    </div>
                                    <div className="p-5 md:p-10">
                                        <h2 className="text-primary mb-7 font-bold flex items-center">
                                            <span className="rounded-full h-14 w-14 flex items-center justify-center bg-primary text-white text-lg mr-2">{user?.charAt(0)?.toUpperCase()}</span>
                                            <span className="ml-2">
                                                {value?.title}
                                                <span className="flex items-center max-w-lg mt-1 text-xs text-gray-500">
                                                    <span className="mr-1">Follow . </span> <img src={Title} alt={value?.title} style={{ width: '15px' }} className="mr-2" /></span>
                                            </span>
                                        </h2>
                                        <p className="ml-2 text-gray-500">{value?.description} </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <Footer />
            </div>
        )
    }
}