import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPaginationPosts } from '../redux/postSlice'
import prev from '../assets/images/prev.png'
import next from '../assets/images/next.png'

export default function Pagination({ postArry }) {

    const [pagination, setPagination] = useState({
        currentPage: 1,
        currentPost: [],
        postPerPage: 4,
    })

    // dispatch the action when change pagination props
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPaginationPosts(pagination?.currentPost))
    }, [pagination?.currentPage, postArry?.length])

    // // declare the variables....
    const indexOfLastPost = pagination?.currentPage * pagination?.postPerPage;
    const indexOfFirstPost = indexOfLastPost - pagination?.postPerPage;
    pagination.currentPost = postArry?.slice(indexOfFirstPost, indexOfLastPost);
    const totalPosts = (postArry?.length);
    const numberOfPages = Math.ceil(totalPosts / pagination?.postPerPage);

    // // created the pagination button
    const paginate = [];
    if (numberOfPages > 0) {
        for (let i = 1; i <= numberOfPages; i++) {
            paginate.push(i)
        }
    }

    // // jump to page through numbers btn
    const jumpPagination = (numbers) => {
        setPagination({
            ...pagination,
            currentPage: numbers
        })
    }

    // // goto next page through btn
    const nextPagination = () => {
        if (pagination?.currentPage !== numberOfPages) {
            setPagination({
                ...pagination,
                currentPage: pagination?.currentPage + 1
            })
        }
    }

    // // goto prev page through btn
    const prevPagination = () => {
        if (pagination?.currentPage > 1) {
            setPagination({
                ...pagination,
                currentPage: pagination?.currentPage - 1
            })
        }
    }

    return (
        <>
            {pagination?.postPerPage < postArry?.length?
                <div className="flex items-center justify-center w-full mb-10">
                    <ul className="flex items-center mb-10">
                        {pagination?.currentPage <= 1 ?
                            <li className="text-white bg-primary rounded-full h-12 w-12 flex items-center justify-center mr-1 opacity-50" ><img src={prev} alt="" style={{ width: '20px' }} /> </li>
                            : <li className="text-white bg-primary cursor-pointer rounded-full h-12 w-12 flex items-center justify-center mr-1" onClick={prevPagination}><img src={prev} alt="" style={{ width: '20px' }} /> </li>}
                        {
                            paginate?.map(numbers => {
                                return (
                                    <li className={`p-4 mx-1 h-12 w-12 rounded-full flex items-center justify-center cursor-pointer ${pagination?.currentPage === numbers ? 'bg-gray-500 text-white' : "bg-white text-primary"}`} key={numbers} onClick={() => { jumpPagination(numbers) }}>

                                        {numbers}

                                    </li>
                                )
                            })
                        }
                        { paginate?.length === pagination?.currentPage ? <li className="text-white bg-primary opacity-50 rounded-full   h-12 w-12 flex items-center justify-center ml-1" onClick={nextPagination}><img src={next} alt="" style={{ width: '20px' }} /> </li> : <li className="text-white bg-primary cursor-pointer rounded-full h-12 w-12 flex items-center justify-center ml-1" onClick={nextPagination}><img src={next} alt="" style={{ width: '20px' }} /> </li>}
                    </ul>
                </div> : ""}
        </>
    )
}
