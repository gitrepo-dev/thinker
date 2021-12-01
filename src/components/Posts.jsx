import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import like from '../assets/images/heart.png'
import { getPosts } from '../redux/postSlice'
import comment from '../assets/images/comment.png'
import share from '../assets/images/share.png'
import Title from '../assets/images/title.png'
import { GET_POSTS } from '../graphql/getPosts'
import { useQuery } from '@apollo/client'
import Pagination from './Pagination'

export default function Posts() {

    // get all post from apis
    const { loading, data, refetch } = useQuery(GET_POSTS)

    //  get and reverse the posts
    const posts = useSelector(state => state?.post?.posts)


    // pagination posts
    const currentPosts = useSelector(state => state?.post?.currentPost)

    //  dispatch action to redux toolkit to update the redux store
    const dispatch = useDispatch()
    useEffect(() => {
        refetch()
        dispatch(getPosts(data?.getAllPosts))
    }, [data, data?.getAllPosts])

    // while fetching data from  api loading true
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
                {currentPosts && currentPosts.length !== 0 ? currentPosts && currentPosts?.map((value, index) => {
                    return (
                        <div className="max-w-xl mt-5 px-0 rounded-md mx-auto mb-3 md:mb-10 bg-white" key={index}>
                            <Link to={`/blog/${value?.id}`}>
                                <div className="px-4 border-2 border-gray-300 pt-5">
                                    <h2 className="text-primary mb-3 font-bold flex items-center">
                                        <span className="rounded-full h-14 w-14 flex items-center justify-center bg-primary text-white text-lg mr-2">{value?.postedby?.charAt(0)?.toUpperCase()}</span>
                                        <span className="ml-2">
                                            {value?.title}
                                            <span className="flex items-center max-w-lg mt-1 text-xs text-gray-500">
                                                <span className="mr-1">Follow . </span> <img src={Title} alt={value?.title} style={{ width: '15px' }} className="mr-2" /></span>
                                        </span>
                                    </h2>
                                    <small className="block text-gray-700 mb-5 truncate">{value?.description}</small>
                                </div>
                                <img src={value?.image} className="w-full h-auto" alt={value?.title} />
                                <div className="flex justify-between items-center py-4 px-5 border-2 border-gray-300">
                                    <span className="flex items-center">
                                        <img src={like} alt="" style={{ width: '26px' }} /> . <small className="font-bold">{Math.floor((Math.random() * 100) + value.id + index + 1)}K </small>
                                    </span>
                                    <span className="flex items-center font-medium">
                                        <img src={comment} alt="" style={{ width: '26px' }} /> . <small className="font-bold">{Math.floor((Math.random() * 100) + value.id)}K </small>
                                    </span>
                                    <span className="flex items-center font-medium">
                                        <img src={share} alt="" style={{ width: '20px' }} /> . <small className="font-bold">{Math.floor((Math.random() * 100) + value.id + index)}K </small>
                                    </span>
                                </div>
                            </Link>
                        </div>
                    )
                }) : <div className="my-4 text-center font-medium">No post to show.</div>}

                <Pagination postArry={posts?.slice()?.reverse()} />
            </>
        )
    }
}
